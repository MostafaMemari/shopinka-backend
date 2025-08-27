import { PartialType } from '@nestjs/swagger';
import { CreateBulkPricingDto } from './create-bulk-pricing.dto';

export class UpdateBulkPricingDto extends PartialType(CreateBulkPricingDto) {}
