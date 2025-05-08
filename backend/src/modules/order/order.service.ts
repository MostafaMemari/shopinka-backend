import { BadRequestException, Inject } from '@nestjs/common';
import { IGetCart } from '../cart/interfaces/cart.interface';
import { PaymentDto } from '../payment/dto/payment.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AddressRepository } from '../address/address.repository';
import { CartItem, Order, OrderStatus } from 'generated/prisma';
import { OrderRepository } from './order.repository';

export class OrderService {
  constructor(
    @Inject(REQUEST) private readonly req: Request,
    private readonly orderRepository: OrderRepository,
    private readonly addressRepository: AddressRepository
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


  findAll() {
    return `This action returns all order`;
  }

  findOne(userId: number, orderId: number): Promise<Order> {
    return this.orderRepository.findOneOrThrow({ where: { id: orderId, userId }, include: { items: true, address: true } })
  }
}
