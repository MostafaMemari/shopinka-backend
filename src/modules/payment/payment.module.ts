import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { PaymentRepository } from './payment.repository';
import { ScheduleModule } from '@nestjs/schedule';
import { CartService } from '../cart/cart.service';
import { OrderService } from '../order/order.service';
import { CartRepository } from '../cart/repositories/cart.repository';
import { CartItemRepository } from '../cart/repositories/cardItem.repository';
import { ProductRepository } from '../product/repositories/product.repository';
import { ProductVariantRepository } from '../product/repositories/product-variant.repository';
import { AddressRepository } from '../address/repositories/address.repository';
import { OrderRepository } from '../order/repositories/order.repository';
import { OrderItemRepository } from '../order/repositories/order-item.repository';
import { ShippingRepository } from '../shipping/repositories/shipping.repository';
import { AddressSnapshotRepository } from '../address/repositories/address-snapshot.repository';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [ScheduleModule.forRoot(), ProductModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    AuthService,
    UserRepository,
    PaymentRepository,
    CartService,
    OrderService,
    CartRepository,
    CartItemRepository,
    ProductRepository,
    ProductVariantRepository,
    AddressRepository,
    AddressSnapshotRepository,
    OrderRepository,
    OrderItemRepository,
    ShippingRepository,
  ],
})
export class PaymentModule {}
