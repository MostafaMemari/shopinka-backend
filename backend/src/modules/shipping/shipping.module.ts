import { Module } from '@nestjs/common';
import { ShippingService } from './services/shipping.service';
import { ShippingController } from './controllers/shipping.controller';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { ShippingRepository } from './repositories/shipping.repository';
import { ShippingInfoRepository } from './repositories/shipping-info.repository';
import { OrderRepository } from '../order/repositories/order.repository';
import { ShippingInfoController } from './controllers/shipping-info.controller';
import { ShippingInfoService } from './services/shipping-info.service';
import { CacheService } from '../cache/cache.service';
import { ProductRepository } from '../product/repositories/product.repository';
import { ProductVariantRepository } from '../product/repositories/product-variant.repository';

@Module({
  controllers: [ShippingController, ShippingInfoController],
  providers: [
    ShippingService,
    AuthService,
    UserRepository,
    ShippingRepository,
    ShippingInfoRepository,
    OrderRepository,
    ShippingInfoService,
    CacheService,
    ProductRepository,
    ProductVariantRepository,
  ],
})
export class ShippingModule {}
