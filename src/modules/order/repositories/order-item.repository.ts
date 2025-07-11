import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OrderItem, Prisma } from '@prisma/client';

@Injectable()
export class OrderItemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(args: Prisma.OrderItemFindManyArgs = {}): Promise<OrderItem[]> {
    return this.prismaService.orderItem.findMany(args);
  }
}
