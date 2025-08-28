import { Injectable, NotFoundException } from '@nestjs/common';
import { BulkPricing, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { BulkPricingMessages } from '../enums/bulk-pricing-message.enum';

@Injectable()
export class BulkPricingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(args: Prisma.BulkPricingCreateArgs): Promise<BulkPricing> {
    return this.prismaService.bulkPricing.create(args);
  }

  findAll(args: Prisma.BulkPricingFindManyArgs = {}): Promise<BulkPricing[]> {
    return this.prismaService.bulkPricing.findMany(args);
  }

  findOne(args: Prisma.BulkPricingFindFirstArgs): Promise<BulkPricing | null> {
    return this.prismaService.bulkPricing.findFirst(args);
  }

  update(args: Prisma.BulkPricingUpdateArgs): Promise<BulkPricing> {
    return this.prismaService.bulkPricing.update(args);
  }

  delete(args: Prisma.BulkPricingDeleteArgs): Promise<BulkPricing> {
    return this.prismaService.bulkPricing.delete(args);
  }

  async findOneOrThrow(args: Prisma.BulkPricingFindFirstArgs): Promise<BulkPricing | never> {
    const bulkPrice = await this.findOne(args);

    if (!bulkPrice) throw new NotFoundException(BulkPricingMessages.NotFoundBulkPricing);

    return bulkPrice;
  }
}
