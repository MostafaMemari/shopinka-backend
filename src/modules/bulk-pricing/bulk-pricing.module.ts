import { Module } from '@nestjs/common';
import { BulkPricingService } from './bulk-pricing.service';
import { BulkPricingController } from './bulk-pricing.controller';
import { AuthModule } from '../auth/auth.module';
import { BulkPricingRepository } from './repositories/bulk-pricing.repository';
import { ProductVariantRepository } from '../product/repositories/product-variant.repository';
import { ProductRepository } from '../product/repositories/product.repository';

@Module({
  imports: [AuthModule],
  controllers: [BulkPricingController],
  providers: [BulkPricingService, BulkPricingRepository, ProductVariantRepository, ProductRepository],
})
export class BulkPricingModule {}
