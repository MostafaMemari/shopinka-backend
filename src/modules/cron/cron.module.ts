import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from '../prisma/prisma.module';
import { ExpiredOrdersCron } from './expired-orders.cron';
import { OtpCleanupCron } from './otp-cleanup.cron';
import { CartService } from '../cart/cart.service';
import { OrderService } from '../order/order.service';
import { OrderRepository } from '../order/repositories/order.repository';
import { CartRepository } from '../cart/repositories/cart.repository';
import { CartItemRepository } from '../cart/repositories/cardItem.repository';
import { ProductRepository } from '../product/repositories/product.repository';
import { ProductVariantRepository } from '../product/repositories/product-variant.repository';
import { OrderItemRepository } from '../order/repositories/order-item.repository';
import { AddressRepository } from '../address/repositories/address.repository';
import { ShippingRepository } from '../shipping/repositories/shipping.repository';
import { AddressSnapshotRepository } from '../address/repositories/address-snapshot.repository';
import { CronService } from './cron.service';
import { BackupModule } from '../backup/backup.module';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule, BackupModule],
  providers: [
    OtpCleanupCron,
    ExpiredOrdersCron,
    CartService,
    OrderService,
    OrderRepository,
    CartRepository,
    CartItemRepository,
    ProductRepository,
    ProductVariantRepository,
    OrderItemRepository,
    AddressRepository,
    AddressSnapshotRepository,
    ShippingRepository,
    CronService,
  ],
})
export class CronModule {}
