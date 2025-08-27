import { Module } from '@nestjs/common';
import { BulkPricingService } from './bulk-pricing.service';
import { BulkPricingController } from './bulk-pricing.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [BulkPricingController],
  providers: [BulkPricingService],
})
export class BulkPricingModule {}
