import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { IGetCart } from '../cart/interfaces/cart.interface';
import { PaymentDto } from '../payment/dto/payment.dto';
import { AddressRepository } from '../address/address.repository';
import { CartItem, Order, OrderItem, OrderStatus, Prisma } from 'generated/prisma';
import { OrderRepository } from './repositories/order.repository';
import { QueryOrderDto } from './dto/query-order.dto';
import { CacheService } from '../cache/cache.service';
import { sortObject } from '../../common/utils/functions.utils';
import { CacheKeys } from '../../common/enums/cache.enum';
import { pagination } from '../../common/utils/pagination.utils';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { OrderItemRepository } from './repositories/order-item.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CartRepository } from '../cart/repositories/cart.repository';

@Injectable()
export class OrderService {
  private readonly CACHE_EXPIRE_TIME: number = 600 //* 5 minutes
  private readonly logger: Logger = new Logger(OrderService.name)

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly addressRepository: AddressRepository,
    private readonly cartRepository: CartRepository,
    private readonly cacheService: CacheService
  ) { }

  @Cron(CronExpression.EVERY_12_HOURS)
  async handleExpiredPendingOrders() {
    this.logger.log('Checking for expired pending orders...');

    const TIMEOUT_MS = 24 * 60 * 60 * 1000; //* 24 hours
    const expirationTime = new Date(Date.now() - TIMEOUT_MS);

    try {
      const expiredOrders = await this.orderRepository.findAll({
        where: {
          status: OrderStatus.PENDING,
          createdAt: { lt: expirationTime },
        },
        include: { items: true }
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

        await this.orderRepository.update({ where: { id: order.id }, data: { status: OrderStatus.CANCELED } });

        this.logger.warn(`Order ${order.id} canceled due to timeout (created at ${order.createdAt}). Items returned to cart.`);
      }

      this.logger.log(`Expired pending orders processed successfully. Count: ${expiredOrders.length}`);
    } catch (error) {
      this.logger.error(`Error processing expired pending orders: ${error.message}`, error.stack);
    }
  }


  private generateOrderNumber(): string {
    const number = Math.floor(Math.random() * 1_000_000_000).toString().padStart(9, '0');
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

  async create(userId: number, cart: IGetCart, paymentDto: PaymentDto): Promise<Order> {
    const { addressId } = paymentDto;
    const { cartItems, finalPrice } = cart;

    if (!cartItems.length) {
      throw new BadRequestException("Your cart list is empty.");
    }

    await this.addressRepository.findOneOrThrow({
      where: { userId, id: addressId },
    });

    const orderNumber = this.generateOrderNumber();
    const orderItems = this.mapCartItemsToOrderItems(cartItems);

    return await this.orderRepository.create({
      data: {
        addressId,
        orderNumber,
        totalPrice: finalPrice,
        status: OrderStatus.PENDING,
        userId,
        quantity: cartItems.length,
        items: { create: orderItems },
      },
      include: { items: true, user: true },
    });
  }

  async findAll(userId: number, { page, take, ...queryOrderDto }: QueryOrderDto): Promise<unknown> {
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
      includeTransaction
    } = queryOrderDto;

    const sortedDto = sortObject(queryOrderDto);

    const cacheKey = `${CacheKeys.Orders}_${JSON.stringify(sortedDto)}`;

    const cachedOrders = await this.cacheService.get<null | Order[]>(cacheKey);

    if (cachedOrders) return { ...pagination(paginationDto, cachedOrders) }

    const filters: Prisma.OrderWhereInput = { userId };

    if (addressId) filters.addressId = addressId
    if (quantity) filters.quantity = quantity
    if (maxPrice || minPrice) {
      filters.totalPrice = {};
      if (maxPrice) filters.totalPrice.gte = maxPrice
      if (minPrice) filters.totalPrice.lte = minPrice
    }
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const orders = await this.orderRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include: { items: includeItems, address: includeAddress, transaction: includeTransaction }
    });

    await this.cacheService.set(cacheKey, orders, this.CACHE_EXPIRE_TIME);

    return { ...pagination(paginationDto, orders) }
  }

  async findAllItems(userId: number, paginationDto: PaginationDto): Promise<unknown> {
    const orderItems = await this.orderItemRepository.findAll(
      {
        where: { order: { userId } },
        include: { order: true, product: true, productVariant: true },
        orderBy: { createdAt: 'desc' }
      })

    return pagination(paginationDto, orderItems)
  }

  findOne(userId: number, orderId: number): Promise<Order> {
    return this.orderRepository.findOneOrThrow({ where: { id: orderId, userId }, include: { items: true, address: true } })
  }
}
