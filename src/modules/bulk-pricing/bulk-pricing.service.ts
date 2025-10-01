import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateBulkPricingDto } from './dto/create-bulk-pricing.dto';
import { UpdateBulkPricingDto } from './dto/update-bulk-pricing.dto';
import { BulkPricing, Prisma } from '@prisma/client';
import { BulkPricingRepository } from './repositories/bulk-pricing.repository';
import { BulkPricingMessages } from './enums/bulk-pricing-message.enum';
import { ProductRepository } from '../product/repositories/product.repository';
import { ProductVariantRepository } from '../product/repositories/product-variant.repository';
import { BulkPricingQueryDto } from './dto/bulk-pricing-query-filter.dto';
import { OutputPagination, pagination } from '../../common/utils/pagination.utils';

@Injectable()
export class BulkPricingService {
  constructor(
    private readonly bulkPricingRepository: BulkPricingRepository,
    private readonly productRepository: ProductRepository,
    private readonly productVariantRepository: ProductVariantRepository,
  ) {}

  async create(userId: number, createBulkPricingDto: CreateBulkPricingDto): Promise<{ message: string; bulkPricing: BulkPricing }> {
    const { discount, minQty, type, isGlobal, productId, variantId } = createBulkPricingDto;

    if (productId && variantId) throw new BadRequestException(BulkPricingMessages.InvalidProductOrVariant);
    if (isGlobal && (productId || variantId)) throw new BadRequestException(BulkPricingMessages.GlobalWithProductOrVariant);
    if (!isGlobal && !variantId && !productId) throw new BadRequestException(BulkPricingMessages.GlobalRequired);

    if (productId) await this.productRepository.findOneOrThrow({ where: { id: productId } });
    if (variantId) await this.productVariantRepository.findOneOrThrow({ where: { id: variantId } });

    if (type == 'FIXED' && discount < 1000) throw new BadRequestException(BulkPricingMessages.InvalidFixedDiscount);

    if (type == 'PERCENT' && discount > 100) throw new BadRequestException(BulkPricingMessages.InvalidPercentDiscount);

    //* Check for exists bulk price with this minQty in global
    if (isGlobal) {
      const existingGlobalBulkPrice = await this.bulkPricingRepository.findOne({ where: { isGlobal: true, minQty } });
      if (existingGlobalBulkPrice) throw new ConflictException(BulkPricingMessages.GlobalBulkPriceExists);
    }

    //* Check for exists bulk price with this minQty in non global
    const existingNonGlobalBulkPrice = await this.bulkPricingRepository.findOne({ where: { minQty, isGlobal: false } });

    if (existingNonGlobalBulkPrice) throw new BadRequestException(BulkPricingMessages.MinQtyBulkPriceExists);

    const newBulkPrice = await this.bulkPricingRepository.create({ data: { userId, ...createBulkPricingDto } });

    return { message: BulkPricingMessages.CreatedBulkPricingSuccess, bulkPricing: newBulkPrice };
  }

  async findAll({ page, take, ...bulkPricingDto }: BulkPricingQueryDto): Promise<OutputPagination<BulkPricing>> {
    const paginationDto = { page, take };

    const {
      discount,
      endDate,
      includeProduct,
      includeUser,
      includeVariant,
      isGlobal,
      minQty,
      productId,
      sortBy,
      sortDirection,
      startDate,
      type,
      variantId,
    } = bulkPricingDto;

    const filters: Prisma.BulkPricingWhereInput = {};

    if (discount) filters.discount = discount;
    if (isGlobal !== undefined) filters.isGlobal = isGlobal;
    if (minQty) filters.minQty = minQty;
    if (productId) filters.productId = productId;
    if (type) filters.type = type;
    if (variantId) filters.variantId = variantId;

    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const include: Prisma.BulkPricingInclude = {
      product: includeProduct,
      variant: includeVariant,
      user: includeUser && { select: { id: true, fullName: true } },
    };

    const bulkPricing = await this.bulkPricingRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include,
    });

    return pagination(paginationDto, bulkPricing);
  }

  findOne(id: number): Promise<BulkPricing> {
    return this.bulkPricingRepository.findOneOrThrow({
      where: { id },
      include: { product: true, variant: true, user: { select: { id: true, fullName: true } } },
    });
  }

  async update(id: number, updateBulkPricingDto: UpdateBulkPricingDto): Promise<{ message: string; bulkPricing: BulkPricing }> {
    let { discount, isGlobal, minQty, productId, type, variantId } = updateBulkPricingDto;

    const bulkPrice = await this.bulkPricingRepository.findOneOrThrow({ where: { id } });

    if (isGlobal && (bulkPrice.variantId || bulkPrice.productId)) throw new BadRequestException('Global is not allowed.');
    if (productId && variantId) throw new BadRequestException(BulkPricingMessages.InvalidProductOrVariant);
    if (isGlobal && (productId || variantId)) throw new BadRequestException(BulkPricingMessages.GlobalWithProductOrVariant);

    if (productId) await this.productRepository.findOneOrThrow({ where: { id: productId } });
    if (variantId) await this.productVariantRepository.findOneOrThrow({ where: { id: variantId } });

    if (!type) type = bulkPrice.type;
    if (!discount) discount = +bulkPrice.discount;

    if (type == 'FIXED' && discount < 1000) throw new BadRequestException(BulkPricingMessages.InvalidFixedDiscount);

    if (type == 'PERCENT' && discount > 100) throw new BadRequestException(BulkPricingMessages.InvalidPercentDiscount);

    //* Check for exists bulk price with this minQty in global
    if (isGlobal && minQty) {
      const existingGlobalBulkPrice = await this.bulkPricingRepository.findOne({ where: { isGlobal: true, minQty } });
      if (existingGlobalBulkPrice) throw new ConflictException(BulkPricingMessages.GlobalBulkPriceExists);
    }

    //* Check for exists bulk price with this minQty in non global
    const existingNonGlobalBulkPrice = minQty && (await this.bulkPricingRepository.findOne({ where: { minQty, isGlobal: false } }));

    if (existingNonGlobalBulkPrice) throw new BadRequestException(BulkPricingMessages.MinQtyBulkPriceExists);

    const updatedBulkPricing = await this.bulkPricingRepository.update({ where: { id }, data: updateBulkPricingDto });

    return { message: BulkPricingMessages.CreatedBulkPricingSuccess, bulkPricing: updatedBulkPricing };
  }

  async remove(id: number): Promise<{ message: string; bulkPricing: BulkPricing }> {
    await this.bulkPricingRepository.findOneOrThrow({ where: { id } });

    const removedBulkPrice = await this.bulkPricingRepository.delete({ where: { id } });

    return { message: BulkPricingMessages.RemovedBulkPricingSuccess, bulkPricing: removedBulkPrice };
  }
}
