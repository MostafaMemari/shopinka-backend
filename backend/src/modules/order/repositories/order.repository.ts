import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Order, Prisma } from 'generated/prisma';

@Injectable()
export class OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(args: Prisma.OrderCreateArgs): Promise<Order> {
    return this.prismaService.order.create(args);
  }

  findAll(args: Prisma.OrderFindManyArgs = {}): Promise<Order[]> {
    return this.prismaService.order.findMany(args);
  }

  findOne(args: Prisma.OrderFindFirstArgs): Promise<Order | null> {
    return this.prismaService.order.findFirst(args);
  }

  update(args: Prisma.OrderUpdateArgs): Promise<Order> {
    return this.prismaService.order.update(args);
  }

  delete(args: Prisma.OrderDeleteArgs): Promise<Order> {
    return this.prismaService.order.delete(args);
  }

  async findOneOrThrow(args: Prisma.OrderFindFirstArgs): Promise<Order | never> {
    const order = await this.findOne(args);

    if (!order) throw new NotFoundException('Order not found.');

    return order;
  }
}
