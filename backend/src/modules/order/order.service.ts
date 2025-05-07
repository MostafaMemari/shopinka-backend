import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IGetCart } from '../cart/interfaces/cart.interface';
import { PaymentDto } from '../payment/dto/payment.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AddressRepository } from '../address/address.repository';
import { OrderStatus } from 'generated/prisma';

@Injectable({ scope: Scope.REQUEST })
export class OrderService {
  constructor(
    @Inject(REQUEST) private readonly req: Request,
    private readonly prismaService: PrismaService,
    private readonly addressRepository: AddressRepository
  ) { }

  async create(cart: IGetCart, paymentDto: PaymentDto) {
    const { addressId} = paymentDto
    const { cartItems, finalPrice } = cart
    const { id: userId } = this.req.user

    await this.addressRepository.findOneOrThrow({ where: { userId, id: addressId } })

    await this.prismaService.$transaction(async tx => {
      const order = await tx.order.create({
        data: {
          addressId,
          orderNumber: `${Math.random() * 10000}`, //TODO: Generate unique
          totalPrice: finalPrice,
          status: OrderStatus.PENDING,
          userId,
          quantity: cartItems.length,
          items: {
            create: cartItems.map((item => ({
              productId: item.productId,
              productVariantId: item.productVariantId,
              price:
                item['product']?.basePrice
                  ? (item['product'].basePrice * item.quantity) - (item['product'].salePrice * item.quantity)
                  : (item['productVariant'].basePrice * item.quantity) - (item['productVariant'].salePrice * item.quantity),
              quantity: item.quantity
            })))
          }
        },
        include: { items: true }
      })

      if (!order.items.length) throw new BadRequestException("Your cart list is empty.")
    })
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
