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

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
