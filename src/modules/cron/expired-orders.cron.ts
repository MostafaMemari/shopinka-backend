import { Injectable, Logger } from '@nestjs/common';
import { OrderRepository } from '../order/repositories/order.repository';
import { CartService } from '../cart/cart.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Order, OrderItem, OrderStatus } from '@prisma/client';

@Injectable()
export class ExpiredOrdersCron {
  private readonly logger = new Logger(ExpiredOrdersCron.name);

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly cartService: CartService,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleExpiredPendingOrders() {
    this.logger.log('Checking for expired pending orders...');

    const now = new Date();

    const expiredOrders = (await this.orderRepository.findAll({
      where: {
        status: OrderStatus.PENDING,
        expiresAt: { lt: now },
      },
      include: { items: true },
    })) as (Order & { items: OrderItem[] })[];

    for (const order of expiredOrders) {
      if (!order.userId) continue;

      try {
        await this.cartService.addItems(
          order.userId,
          order.items.map((item) => ({
            productId: item.productId ?? null,
            productVariantId: item.productVariantId ?? null,
            customStickerId: item.customStickerId ?? null,
            quantity: item.quantity,
          })),
          { systemMode: true },
        );

        await this.orderRepository.update({
          where: { id: order.id },
          data: { status: OrderStatus.CANCELLED },
        });

        this.logger.warn(`Order ${order.id} expired and canceled. Items attempted to return to cart.`);
      } catch (error) {
        this.logger.error(`Failed processing expired order ${order.id}: ${error.message}`, error.stack);
      }
    }

    this.logger.log(`Expired orders processed. Count: ${expiredOrders.length}`);
  }
}
