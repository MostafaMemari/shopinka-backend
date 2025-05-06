import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartRepository } from './cart.repository';
import { Cart } from 'generated/prisma';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) { }

  async me(userId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { userId }, include: { items: true } })

    if (cart) return cart

    return this.cartRepository.create({ data: { userId }, include: { items: true } })
  }

  async clear(userId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOneOrThrow({ where: { userId } })

    return this.cartRepository.update({
      where: { userId },
      data: { items: { deleteMany: { cartId: cart.id } } },
      include: { items: true }
    })
  }
}
