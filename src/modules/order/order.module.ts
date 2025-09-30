import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { PrismaService } from '../prisma/prisma.service';
import { AddressRepository } from '../address/repositories/address.repository';
import { OrderRepository } from './repositories/order.repository';
import { OrderController } from './order.controller';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { OrderItemRepository } from './repositories/order-item.repository';
import { CartRepository } from '../cart/repositories/cart.repository';
import { ProductRepository } from '../product/repositories/product.repository';
import { ProductVariantRepository } from '../product/repositories/product-variant.repository';
import { CartItemRepository } from '../cart/repositories/cardItem.repository';
import { ShippingRepository } from '../shipping/repositories/shipping.repository';
import { CartService } from '../cart/cart.service';
import { AddressSnapshotRepository } from '../address/repositories/address-snapshot.repository';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    PrismaService,
    AddressRepository,
    AddressSnapshotRepository,
    OrderRepository,
    AuthService,
    UserRepository,
    OrderItemRepository,
    CartRepository,
    ProductRepository,
    ProductVariantRepository,
    CartItemRepository,
    ShippingRepository,
    CartService,
  ],
})
export class OrderModule {}
