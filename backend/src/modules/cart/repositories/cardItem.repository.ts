import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CartItem, Prisma } from '@prisma/client';
import { CartItemMessages } from '../enums/cart-item-messages.enum';

@Injectable()
export class CartItemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(args: Prisma.CartItemCreateArgs): Promise<CartItem> {
    return this.prismaService.cartItem.create(args);
  }

  findAll(args: Prisma.CartItemFindManyArgs = {}): Promise<CartItem[]> {
    return this.prismaService.cartItem.findMany(args);
  }

  findOne(args: Prisma.CartItemFindFirstArgs): Promise<CartItem | null> {
    return this.prismaService.cartItem.findFirst(args);
  }

  update(args: Prisma.CartItemUpdateArgs): Promise<CartItem> {
    return this.prismaService.cartItem.update(args);
  }

  delete(args: Prisma.CartItemDeleteArgs): Promise<CartItem> {
    return this.prismaService.cartItem.delete(args);
  }

  deleteMany(args: Prisma.CartItemDeleteManyArgs): Promise<{ count: number }> {
    return this.prismaService.cartItem.deleteMany(args);
  }

  async findOneOrThrow(args: Prisma.CartItemFindFirstArgs): Promise<CartItem | never> {
    const cartItem = await this.findOne(args);

    if (!cartItem) throw new NotFoundException(CartItemMessages.NotFoundCartItem);

    return cartItem;
  }
}
