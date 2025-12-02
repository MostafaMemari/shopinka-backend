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
    private readonly cartRepository: CartRepository,
    private readonly cartService: CartService,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleExpiredPendingOrders() {
    this.logger.log('Checking for expired pending orders...');

    try {
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

        let cart = await this.cartRepository.findFirst({
          where: { userId: order.userId },
        });

        if (!cart) {
          cart = await this.cartRepository.create({
            data: { userId: order.userId },
          });
        }

        await this.cartService.addItems(
          order.userId,
          order.items.map((item) => ({
            productId: item.productId,
            productVariantId: item.productVariantId,
            customStickerId: item.customStickerId,
            quantity: item.quantity,
          })),
        );

        await this.orderRepository.update({
          where: { id: order.id },
          data: { status: OrderStatus.CANCELLED },
        });

        this.logger.warn(`Order ${order.id} expired and canceled. Items returned to cart.`);
      }

      this.logger.log(`Expired orders processed. Count: ${expiredOrders.length}`);
    } catch (error) {
      this.logger.error(`Failed to process expired orders: ${error.message}`, error.stack);
    }
  }
}
