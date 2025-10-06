import { BadRequestException, Injectable } from '@nestjs/common';
import { IGetCart } from '../cart/interfaces/cart.interface';
import { PaymentDto } from '../payment/dto/payment.dto';
import { AddressRepository } from '../address/repositories/address.repository';
import { CartItem, Order, OrderStatus, Prisma } from '@prisma/client';
import { OrderRepository } from './repositories/order.repository';
import { QueryMyOrderDto, QueryOrderDto } from './dto/query-order.dto';
import { pagination } from '../../common/utils/pagination.utils';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { OrderItemRepository } from './repositories/order-item.repository';
import { ProductVariantRepository } from '../product/repositories/product-variant.repository';
import { ProductRepository } from '../product/repositories/product.repository';
import { CartItemRepository } from '../cart/repositories/cardItem.repository';
import { ShippingRepository } from '../shipping/repositories/shipping.repository';
import { UpdateOrderStatusDto } from './dto/update-status-order.dto';
import { QueryOrderStatus } from './enums/order-sort-by.enum';
import { AddressSnapshotRepository } from '../address/repositories/address-snapshot.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly addressRepository: AddressRepository,
    private readonly addressSnapshotRepository: AddressSnapshotRepository,
    private readonly productRepository: ProductRepository,
    private readonly productVariantRepository: ProductVariantRepository,
    private readonly cartItemRepository: CartItemRepository,
    private readonly shippingRepository: ShippingRepository,
  ) {}

  private generateOrderNumber(): string {
    const number = Math.floor(Math.random() * 1_000_000_000)
      .toString()
      .padStart(9, '0');
    return number.match(/.{1,3}/g)?.join('-') || '';
  }

  private mapCartItemsToOrderItems(cartItems: CartItem[]) {
    return cartItems.map((item) => {
      const base = item['product'] ?? item['productVariant'];

      const price = (base.salePrice || base.basePrice) * item.quantity;

      //TODO: Check for debug
      return {
        productId: item.productId,
        productVariantId: item.productVariantId,
        quantity: item.quantity,
        basePrice: price,
        unitPrice: price,
        total: price,
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

    if (!items.length) throw new BadRequestException('Your cart list is empty');

    const shipping = await this.shippingRepository.findOneOrThrow({ where: { id: shippingId } });
    payablePrice += shipping.price;

    const address = await this.addressRepository.findOneOrThrow({ where: { userId, id: addressId } });
    if (!address.isDefault) throw new BadRequestException('Please select your default address or set this address as default.');

    const addressSnapshot = await this.addressSnapshotRepository.create({
      data: {
        fullName: address.fullName,
        province: address.province,
        city: address.city,
        postalAddress: address.postalAddress,
        buildingNumber: address.buildingNumber,
        unit: address.unit,
        postalCode: address.postalCode,
      },
    });

    const orderNumber = this.generateOrderNumber();
    const orderItems = this.mapCartItemsToOrderItems(items);

    const OrderExpireMinutes = parseInt(process.env.ORDER_EXPIRE_MINUTES, 10) * 1000 * 60 || 1000 * 60 * 60;

    const newOrder = await this.orderRepository.create({
      data: {
        shippingId,
        orderNumber,
        totalPrice: payablePrice,
        status: OrderStatus.PENDING,
        userId,
        addressSnapshotId: addressSnapshot.id,
        quantity: items.length,
        expiresAt: new Date(Date.now() + OrderExpireMinutes),
        items: { create: orderItems },
      },
      include: { items: true, user: true },
    });

    await this.cartItemRepository.deleteMany({ where: { cart: { userId } } });
    await this.decreaseCartItemsStock(userId);

    return newOrder;
  }

  async findAllForAdmin({ page, take, ...queryOrderDto }: QueryOrderDto): Promise<unknown> {
    const paginationDto = { page, take };
    const {
      endDate,
      sortBy,
      sortDirection,
      startDate,
      includeItems,
      maxPrice,
      minPrice,
      quantity,
      includeTransaction,
      includeShippingInfo,
      userId,
    } = queryOrderDto;

    const filters: Prisma.OrderWhereInput = {
      // OR: [{ user: { products: { some: { userId } } } }, { user: { productVariants: { some: { userId } } } }],
    };

    if (userId) filters.userId = userId;

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
      include: { items: includeItems, transaction: includeTransaction, shippingInfo: includeShippingInfo },
    });

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

  async getOrderCounts(userId: number) {
    const [currentCount, deliveredCount, cancelledCount] = await Promise.all([
      this.orderRepository.count({
        where: {
          userId,
          status: { in: [OrderStatus.PENDING, OrderStatus.PROCESSING, OrderStatus.SHIPPED] },
        },
      }),
      this.orderRepository.count({
        where: {
          userId,
          status: OrderStatus.DELIVERED,
        },
      }),
      this.orderRepository.count({
        where: {
          userId,
          status: OrderStatus.CANCELLED,
        },
      }),
    ]);

    return {
      current: currentCount,
      delivered: deliveredCount,
      cancelled: cancelledCount,
    };
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
      include: {
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
                    mainImage: { select: { fileUrl: true, thumbnailUrl: true } },
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
        user: true,
        addressSnapshot: true,
      },
    });
  }

  findOneForUser(userId: number, orderId: number): Promise<Order> {
    return this.orderRepository.findOneOrThrow({
      where: { userId, id: orderId },
      include: {
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
        addressSnapshot: true,
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
