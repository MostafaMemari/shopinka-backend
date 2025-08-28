import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateBulkPricingDto } from './dto/create-bulk-pricing.dto';
import { UpdateBulkPricingDto } from './dto/update-bulk-pricing.dto';
import { BulkPricing } from '@prisma/client';
import { BulkPricingRepository } from './repositories/bulk-pricing.repository';
import { BulkPricingMessages } from './enums/bulk-pricing-message.enum';
import { ProductRepository } from '../product/repositories/product.repository';
import { ProductVariantRepository } from '../product/repositories/product-variant.repository';

@Injectable()
export class BulkPricingService {
  constructor(
    private readonly bulkPricingRepository: BulkPricingRepository,
    private readonly productRepository: ProductRepository,
    private readonly productVariantRepository: ProductVariantRepository,
  ) { }

  async create(userId: number, createBulkPricingDto: CreateBulkPricingDto): Promise<{ message: string; bulkPricing: BulkPricing }> {
    const { discount, minQty, type, isGlobal, productId, variantId } = createBulkPricingDto;

    if (productId && variantId) throw new BadRequestException(BulkPricingMessages.InvalidProductOrVariant);
    if (isGlobal && (productId || variantId)) throw new BadRequestException(BulkPricingMessages.GlobalWithProductOrVariant);
    if (!isGlobal && !variantId && !productId) throw new BadRequestException(BulkPricingMessages.GlobalRequired);

    if (productId) await this.productRepository.findOneOrThrow({ where: { id: productId } });
    if (variantId) await this.productVariantRepository.findOneOrThrow({ where: { id: variantId } });

    if (type == 'FIXED' && discount < 1000) throw new BadRequestException(BulkPricingMessages.InvalidFixedDiscount);

    if (type == 'PERCENT' && discount > 100) throw new BadRequestException(BulkPricingMessages.InvalidPercentDiscount);

    if (isGlobal) {
      const existingGlobalBulkPrice = await this.bulkPricingRepository.findOne({ where: { isGlobal: true, minQty } });
      if (existingGlobalBulkPrice) throw new ConflictException(BulkPricingMessages.GlobalBulkPriceExists);
    }

    const existingNonGlobalBulkPrice = await this.bulkPricingRepository.findOne({ where: { minQty, isGlobal: false } });

    if (existingNonGlobalBulkPrice) throw new BadRequestException(BulkPricingMessages.MinQtyBulkPriceExists);

    const newBulkPrice = await this.bulkPricingRepository.create({ data: { userId, ...createBulkPricingDto } });

    return { message: BulkPricingMessages.CreatedBulkPricingSuccess, bulkPricing: newBulkPrice };
  }

  findAll() {
    return `This action returns all bulkPricing`;
  }

  findOne(id: number): Promise<BulkPricing> {
    return this.bulkPricingRepository.findOneOrThrow({ where: { id }, include: { product: true, variant: true, user: { select: { id: true, fullName: true } } } })
  }

  update(id: number, updateBulkPricingDto: UpdateBulkPricingDto) {
    return `This action updates a #${id} bulkPricing`;
  }

  remove(id: number) {
    return `This action removes a #${id} bulkPricing`;
  }
}
