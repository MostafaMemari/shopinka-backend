import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { IGetCart } from '../cart/interfaces/cart.interface';
import { PaymentDto } from '../payment/dto/payment.dto';
import { AddressRepository } from '../address/address.repository';
import { CartItem, Order, OrderItem, OrderStatus, Prisma } from '@prisma/client';
import { OrderRepository } from './repositories/order.repository';
import { QueryMyOrderDto, QueryOrderDto } from './dto/query-order.dto';
import { CacheService } from '../cache/cache.service';
import { sortObject } from '../../common/utils/functions.utils';
import { CacheKeys } from '../../common/enums/cache.enum';
import { pagination } from '../../common/utils/pagination.utils';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { OrderItemRepository } from './repositories/order-item.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CartRepository } from '../cart/repositories/cart.repository';
import { ProductVariantRepository } from '../product/repositories/product-variant.repository';
import { ProductRepository } from '../product/repositories/product.repository';
import { CartItemRepository } from '../cart/repositories/cardItem.repository';
import { ShippingRepository } from '../shipping/repositories/shipping.repository';
import { UpdateOrderStatusDto } from './dto/update-status-order.dto';
import { QueryOrderStatus } from './enums/order-sort-by.enum';

@Injectable()
export class OrderService {
  private readonly CACHE_EXPIRE_TIME: number = 600; //* 5 minutes
  private readonly logger: Logger = new Logger(OrderService.name);

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly addressRepository: AddressRepository,
    private readonly cartRepository: CartRepository,
    private readonly productRepository: ProductRepository,
    private readonly productVariantRepository: ProductVariantRepository,
    private readonly cartItemRepository: CartItemRepository,
    private readonly shippingRepository: ShippingRepository,
    private readonly cacheService: CacheService,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleExpiredPendingOrders() {
    this.logger.log('Checking for expired pending orders...');

    const TIMEOUT_MS = 60 * 60 * 1000; //* 1 hours
    const expirationTime = new Date(Date.now() - TIMEOUT_MS);

    try {
      const expiredOrders = await this.orderRepository.findAll({
        where: {
          status: OrderStatus.PENDING,
          createdAt: { lt: expirationTime },
        },
        include: { items: true },
      });

      for (const order of expiredOrders) {
        await this.cartRepository.update({
          where: { userId: order.userId },
          data: {
            items: {
              connect: order['items'].map((item: OrderItem) => ({ ...item })),
            },
          },
        });

        await this.orderRepository.update({ where: { id: order.id }, data: { status: OrderStatus.CANCELLED } });

        this.logger.warn(`Order ${order.id} canceled due to timeout (created at ${order.createdAt}). Items returned to cart.`);
      }

      this.logger.log(`Expired pending orders processed successfully. Count: ${expiredOrders.length}`);
    } catch (error) {
      this.logger.error(`Error processing expired pending orders: ${error.message}`, error.stack);
    }
  }

  private generateOrderNumber(): string {
    const number = Math.floor(Math.random() * 1_000_000_000)
      .toString()
      .padStart(9, '0');
    return number.match(/.{1,3}/g)?.join('-') || '';
  }

  private mapCartItemsToOrderItems(cartItems: CartItem[]) {
    return cartItems.map((item) => {
      const base = item['product'] ?? item['productVariant'];
      const price = (base.basePrice - base.salePrice) * item.quantity;

      return {
        productId: item.productId,
        productVariantId: item.productVariantId,
        quantity: item.quantity,
        price,
      };
    });
  }

  private async decreaseCartItemsStock(userId: number) {
    const cartItems = await this.cartItemRepository.findAll({
      where: { cart: { userId } },
      include: { product: true, productVariant: true },
    });

    for (const item of cartItems) {
      if (item.productId) {
        await this.productRepository.update({
          where: { id: item.productId },
          data: { quantity: { decrement: item.quantity } },
        });
      }
      if (item.productVariantId) {
        await this.productVariantRepository.update({
          where: { id: item.productVariantId },
          data: { quantity: { decrement: item.quantity } },
        });
      }
    }
  }

  async create(userId: number, cart: IGetCart, paymentDto: PaymentDto): Promise<Order> {
    const { addressId, shippingId } = paymentDto;
    let { items, payablePrice } = cart;

    if (!items.length) {
      throw new BadRequestException('Your cart list is empty.');
    }

    const shipping = await this.shippingRepository.findOneOrThrow({ where: { id: shippingId } });
    payablePrice += shipping.price;

    await this.addressRepository.findOneOrThrow({ where: { userId, id: addressId } });

    const orderNumber = this.generateOrderNumber();
    const orderItems = this.mapCartItemsToOrderItems(items);

    const newOrder = await this.orderRepository.create({
      data: {
        addressId,
        shippingId,
        orderNumber,
        totalPrice: payablePrice,
        status: OrderStatus.PENDING,
        userId,
        quantity: items.length,
        items: { create: orderItems },
      },
      include: { items: true, user: true },
    });

    await this.cartItemRepository.deleteMany({ where: { cart: { userId } } });

    await this.decreaseCartItemsStock(userId);

    return newOrder;
  }

  async findAllForAdmin(userId: number, { page, take, ...queryOrderDto }: QueryOrderDto): Promise<unknown> {
    const paginationDto = { page, take };
    const {
      endDate,
      sortBy,
      sortDirection,
      startDate,
      includeItems,
      addressId,
      includeAddress,
      maxPrice,
      minPrice,
      quantity,
      includeTransaction,
      includeShippingInfo,
    } = queryOrderDto;

    const sortedDto = sortObject(queryOrderDto);

    const cacheKey = `${CacheKeys.Orders}_${JSON.stringify(sortedDto)}`;

    const cachedOrders = await this.cacheService.get<null | Order[]>(cacheKey);

    if (cachedOrders) return { ...pagination(paginationDto, cachedOrders) };

    const filters: Prisma.OrderWhereInput = {
      // OR: [{ user: { products: { some: { userId } } } }, { user: { productVariants: { some: { userId } } } }],
    };

    if (addressId) filters.addressId = addressId;
    if (quantity) filters.quantity = quantity;
    if (maxPrice || minPrice) {
      filters.totalPrice = {};
      if (maxPrice) filters.totalPrice.gte = maxPrice;
      if (minPrice) filters.totalPrice.lte = minPrice;
    }
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const orders = await this.orderRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include: { items: includeItems, address: includeAddress, transaction: includeTransaction, shippingInfo: includeShippingInfo },
    });

    await this.cacheService.set(cacheKey, orders, this.CACHE_EXPIRE_TIME);

    return { ...pagination(paginationDto, orders) };
  }

  async findAllForUser(userId: number, queryMyOrderDto: QueryMyOrderDto): Promise<unknown> {
    const { page = 1, take = 10, status } = queryMyOrderDto;

    const orderStatusFilter = status
      ? status === QueryOrderStatus.CURRENT
        ? { in: [OrderStatus.PENDING, OrderStatus.PROCESSING, OrderStatus.SHIPPED] }
        : status === QueryOrderStatus.DELIVERED
          ? OrderStatus.DELIVERED
          : status === QueryOrderStatus.CANCELLED
            ? OrderStatus.CANCELLED
            : undefined
      : undefined;

    const whereCondition: any = { userId };
    if (orderStatusFilter) {
      whereCondition.status = orderStatusFilter;
    }
    const orders = await this.orderRepository.findAll({
      where: whereCondition,
      orderBy: { createdAt: 'desc' },
      include: {
        address: true,
        transaction: true,
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                type: true,
                salePrice: true,
                basePrice: true,
                mainImage: { select: { fileUrl: true } },
              },
            },
            productVariant: {
              select: {
                id: true,
                salePrice: true,
                basePrice: true,
                product: {
                  select: {
                    name: true,
                    type: true,
                    slug: true,
                    mainImage: { select: { fileUrl: true } },
                  },
                },
                attributeValues: {
                  select: { name: true, colorCode: true, buttonLabel: true },
                },
              },
            },
          },
        },
        shippingInfo: true,
        shipping: true,
      },
    });

    return pagination({ page, take }, orders);
  }

  async findAllItemsForUser(userId: number, paginationDto: PaginationDto): Promise<unknown> {
    const orderItems = await this.orderItemRepository.findAll({
      where: { order: { userId } },
      include: { order: true, product: true, productVariant: true },
      orderBy: { createdAt: 'desc' },
    });

    return pagination(paginationDto, orderItems);
  }

  async findAllItemsForAdmin(userId: number, paginationDto: PaginationDto): Promise<unknown> {
    const orderItems = await this.orderItemRepository.findAll({
      where: { order: { OR: [{ items: { some: { product: { userId } } } }, { items: { some: { productVariant: { userId } } } }] } },
      include: { order: true, product: true, productVariant: true },
      orderBy: { createdAt: 'desc' },
    });

    return pagination(paginationDto, orderItems);
  }

  findOneForAdmin(userId: number, orderId: number): Promise<Order> {
    return this.orderRepository.findOneOrThrow({
      where: { id: orderId, OR: [{ items: { some: { product: { userId } } } }, { items: { some: { productVariant: { userId } } } }] },
      include: { items: true, address: true, shipping: true, shippingInfo: true, transaction: true, user: true },
    });
  }

  findOneForUser(userId: number, orderId: number): Promise<Order> {
    return this.orderRepository.findOneOrThrow({
      where: { userId, id: orderId },
      include: {
        address: true,
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                type: true,
                salePrice: true,
                basePrice: true,
                mainImage: { select: { fileUrl: true } },
              },
            },
            productVariant: {
              select: {
                id: true,
                salePrice: true,
                basePrice: true,
                product: {
                  select: {
                    name: true,
                    type: true,
                    slug: true,
                    mainImage: { select: { fileUrl: true } },
                  },
                },
                attributeValues: {
                  select: { name: true, colorCode: true, buttonLabel: true },
                },
              },
            },
          },
        },
        shipping: true,
        shippingInfo: true,
        transaction: true,
      },
    });
  }

  async updateStatus(userId: number, orderId: number, { status }: UpdateOrderStatusDto): Promise<{ message: string; order: Order }> {
    await this.orderRepository.findOneOrThrow({
      where: {
        id: orderId,
        OR: [{ items: { some: { product: { userId } } } }, { items: { some: { productVariant: { userId } } } }],
      },
    });

    const updatedOrder = await this.orderRepository.update({ where: { id: orderId }, data: { status } });

    return { message: 'Updated order status successfully.', order: updatedOrder };
  }
}
