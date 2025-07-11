import { Injectable, Logger } from '@nestjs/common';
import { OrderRepository } from '../order/repositories/order.repository';
import { CartService } from '../cart/cart.service';
import { CartRepository } from '../cart/repositories/cart.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Order, OrderItem, OrderStatus } from '@prisma/client';

@Injectable()
export class ExpiredOrdersCron {
  private readonly logger = new Logger(ExpiredOrdersCron.name);

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly cartService: CartService,
    private readonly cartRepository: CartRepository,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleExpiredPendingOrders() {
    this.logger.log('Checking for expired pending orders...');

    // const TIMEOUT_MS = 60 * 60 * 1000; // 1 hour
    const TIMEOUT_MS = 1 * 60 * 1000; // 1 minute
    const expirationTime = new Date(Date.now() - TIMEOUT_MS);

    try {
      const expiredOrders = (await this.orderRepository.findAll({
        where: {
          status: OrderStatus.PENDING,
          createdAt: { lt: expirationTime },
        },
        include: { items: true },
      })) as (Order & { items: OrderItem[] })[];

      for (const order of expiredOrders) {
        if (!order.userId) continue;

        let userCart = await this.cartRepository.findFirst({ where: { userId: order.userId } });

        if (!userCart) {
          userCart = await this.cartRepository.create({
            data: { userId: order.userId },
          });
        }

        await this.cartService.addItems(
          order.userId,
          order.items.map((item) => ({
            productId: item?.productId || null,
            productVariantId: item?.productVariantId || null,
            quantity: item.quantity,
          })),
        );

        await this.orderRepository.update({
          where: { id: order.id },
          data: { status: OrderStatus.CANCELLED },
        });

        this.logger.warn(`Order ${order.id} canceled due to timeout (created at ${order.createdAt}). Items returned to cart.`);
      }

      this.logger.log(`Expired pending orders processed successfully. Count: ${expiredOrders.length}`);
    } catch (error) {
      this.logger.error(`Error processing expired pending orders: ${error.message}`, error.stack);
    }
  }
}
