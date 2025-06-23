import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Cart, Prisma } from '@prisma/client';
import { CartMessages } from '../enums/cart-messages.enum';

@Injectable()
export class CartRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(args: Prisma.CartCreateArgs): Promise<Cart> {
    return this.prismaService.cart.create(args);
  }

  findOne(args: Prisma.CartFindFirstArgs): Promise<Cart | null> {
    return this.prismaService.cart.findFirst(args);
  }

  update(args: Prisma.CartUpdateArgs): Promise<Cart> {
    return this.prismaService.cart.update(args);
  }

  findFirst(args: Prisma.CartFindFirstArgs): Promise<Cart | null> {
    return this.prismaService.cart.findFirst(args);
  }

  async findOneOrThrow(args: Prisma.CartFindFirstArgs): Promise<Cart | never> {
    const cart = await this.findOne(args);

    if (!cart) throw new NotFoundException(CartMessages.NotFoundCart);

    return cart;
  }
}
