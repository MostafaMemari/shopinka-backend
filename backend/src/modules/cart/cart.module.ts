import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UserRepository } from '../user/user.repository';
import { AuthService } from '../auth/auth.service';
import { CartRepository } from './repositories/cart.repository';
import { CartItemRepository } from './repositories/cardItem.repository';
import { ProductRepository } from '../product/repositories/product.repository';
import { ProductVariantRepository } from '../product/repositories/product-variant.repository';
import { ShippingRepository } from '../shipping/repositories/shipping.repository';

@Module({
  controllers: [CartController],
  providers: [
    CartService,
    UserRepository,
    AuthService,
    CartRepository,
    CartItemRepository,
    ProductRepository,
    ProductVariantRepository,
    ShippingRepository
  ],
})
export class CartModule { }
