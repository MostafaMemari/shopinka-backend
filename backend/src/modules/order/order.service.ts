import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IGetCart } from '../cart/interfaces/cart.interface';
import { PaymentDto } from '../payment/dto/payment.dto';
import { AddressRepository } from '../address/address.repository';
import { CartItem, Order, OrderStatus, Prisma } from 'generated/prisma';
import { OrderRepository } from './order.repository';
import { QueryOrderDto } from './dto/query-order.dto';
import { CacheService } from '../cache/cache.service';
import { sortObject } from '../../common/utils/functions.utils';
import { CacheKeys } from '../../common/enums/cache.enum';
import { pagination } from '../../common/utils/pagination.utils';

@Injectable()
export class OrderService {
  private readonly CACHE_EXPIRE_TIME: number = 600 //* 5 minutes

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly addressRepository: AddressRepository,
    private readonly cacheService: CacheService
  ) { }
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

  findOne(userId: number, orderId: number): Promise<Order> {
    return this.orderRepository.findOneOrThrow({ where: { id: orderId, userId }, include: { items: true, address: true } })
  }
}
