import { Injectable } from '@nestjs/common';
import { CreateBulkPricingDto } from './dto/create-bulk-pricing.dto';
import { UpdateBulkPricingDto } from './dto/update-bulk-pricing.dto';

@Injectable()
export class BulkPricingService {
  create(createBulkPricingDto: CreateBulkPricingDto) {
    return 'This action adds a new bulkPricing';
  }

  findAll() {
    return `This action returns all bulkPricing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bulkPricing`;
  }

  update(id: number, updateBulkPricingDto: UpdateBulkPricingDto) {
    return `This action updates a #${id} bulkPricing`;
  }

  remove(id: number) {
    return `This action removes a #${id} bulkPricing`;
  }
}
