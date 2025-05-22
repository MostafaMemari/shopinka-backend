import { BadRequestException, ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateProductVariantDto } from '../dto/create-product-variant.dto';
import { ProductVariantRepository } from '../repositories/product-variant.repository';
import { ProductVariantMessages } from '../enums/product-variant-messages.enum';
import { OrderStatus, Prisma, ProductVariant } from '@prisma/client';
import { ProductRepository } from '../repositories/product.repository';
import { GalleryItemRepository } from '../../gallery/repositories/gallery-item.repository';
import { UpdateProductVariantDto } from '../dto/update-product-variant.dto';
import { QueryProductVariantDto } from '../dto/query-product-variant.dto';
import { sortObject } from '../../../common/utils/functions.utils';
import { CacheKeys } from '../../../common/enums/cache.enum';
import { CacheService } from '../../../modules/cache/cache.service';
import { pagination } from '../../../common/utils/pagination.utils';
import { AttributeValueRepository } from '../../attribute/repositories/attribute-value.repository';
import { OrderItemRepository } from '../../order/repositories/order-item.repository';

@Injectable()
export class ProductVariantService {
  private readonly CACHE_EXPIRE_TIME: number = 600; //* 5 minutes

  constructor(
    private readonly productVariantRepository: ProductVariantRepository,
    private readonly productRepository: ProductRepository,
    private readonly galleryItemRepository: GalleryItemRepository,
    private readonly attributeValueRepository: AttributeValueRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly cacheService: CacheService,
  ) {}

  async create(
    userId: number,
    createProductVariantDto: CreateProductVariantDto,
  ): Promise<{ message: string; productVariant: ProductVariant }> {
    const { sku, mainImageId, productId, salePrice, basePrice, attributeValueIds } = createProductVariantDto;

    if (salePrice > basePrice) throw new BadRequestException(ProductVariantMessages.SalePriceTooHigh);

    await this.galleryItemRepository.findOneOrThrow({ where: { id: mainImageId } });
    await this.productRepository.findOneOrThrow({ where: { id: productId } });

    // const existingProductVariant = await this.productVariantRepository.findOne({ where: { sku } })
    // if (existingProductVariant) throw new ConflictException(ProductVariantMessages.AlreadyExistsProductVariant)

    const attributeValues =
      attributeValueIds && (await this.attributeValueRepository.findAll({ where: { id: { in: attributeValueIds } } }));

    if (!attributeValues?.length) throw new BadRequestException(ProductVariantMessages.MinOneAttributeValueRequired);

    delete createProductVariantDto.attributeValueIds;

    const newProductVariant = await this.productVariantRepository.create({
      data: {
        ...createProductVariantDto,
        userId,
        attributeValues: attributeValueIds && { connect: attributeValues.map((attribute) => ({ id: attribute.id })) },
      },
      include: { mainImage: true, product: true, attributeValues: true },
    });

    return { message: ProductVariantMessages.CreatedProductVariantSuccess, productVariant: newProductVariant };
  }

  async findAll({ page, take, ...queryProductVariantDto }: QueryProductVariantDto): Promise<unknown> {
    const paginationDto = { page, take };
    const {
      shortDescription,
      endDate,
      includeUser,
      sortBy,
      sortDirection,
      startDate,
      height,
      includeMainImage,
      length,
      maxPrice,
      minPrice,
      quantity,
      salePrice,
      sku,
      weight,
      width,
      includeProduct,
      includeAttributeValues,
      productId,
    } = queryProductVariantDto;

    const sortedDto = sortObject(queryProductVariantDto);

    const cacheKey = `${CacheKeys.ProductVariants}_${JSON.stringify(sortedDto)}`;

    const cachedProductVariants = await this.cacheService.get<null | ProductVariant[]>(cacheKey);

    if (cachedProductVariants) return { ...pagination(paginationDto, cachedProductVariants) };

    const filters: Prisma.ProductVariantWhereInput = {};

    if (sku) filters.sku = { contains: sku, mode: 'insensitive' };
    if (shortDescription) filters.shortDescription = { contains: shortDescription, mode: 'insensitive' };
    if (salePrice) filters.salePrice = salePrice;
    if (height) filters.height = height;
    if (weight) filters.weight = weight;
    if (width) filters.width = width;
    if (length) filters.length = length;
    if (quantity) filters.quantity = quantity;
    if (productId) filters.productId = productId;
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }
    if (maxPrice || minPrice) {
      filters.basePrice = {};
      if (maxPrice) filters.basePrice.gte = maxPrice;
      if (minPrice) filters.basePrice.lte = minPrice;
    }

    const productVariants = await this.productVariantRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include: {
        attributeValues: includeAttributeValues,
        mainImage: includeMainImage,
        product: includeProduct,
        user: includeUser && { select: { id: true, fullName: true } },
      },
    });

    await this.cacheService.set(cacheKey, productVariants, this.CACHE_EXPIRE_TIME);

    return { ...pagination(paginationDto, productVariants) };
  }

  findOne(id: number): Promise<ProductVariant> {
    return this.productVariantRepository.findOneOrThrow({
      where: { id },
      include: { mainImage: true, user: { select: { id: true, fullName: true } }, attributeValues: true, product: true },
    });
  }

  async update(
    userId: number,
    productVariantId: number,
    updateProductVariantDto: UpdateProductVariantDto,
  ): Promise<{ message: string; productVariant: ProductVariant }> {
    const { attributeValueIds, salePrice, basePrice, sku, mainImageId, productId } = updateProductVariantDto;

    if (productId) await this.productRepository.findOneOrThrow({ where: { id: productId } });

    const productVariant = await this.productVariantRepository.findOneOrThrow({ where: { id: productVariantId, userId } });

    if ((salePrice && basePrice && salePrice > basePrice) || (salePrice && salePrice > productVariant.basePrice)) {
      throw new BadRequestException(ProductVariantMessages.SalePriceTooHigh);
    }

    if (sku) {
      const existingProductVariant = await this.productVariantRepository.findOne({ where: { id: { not: productVariantId }, sku } });
      if (existingProductVariant) throw new ConflictException(ProductVariantMessages.AlreadyExistsProductVariant);
    }

    if (mainImageId !== null) await this.galleryItemRepository.findOneOrThrow({ where: { id: mainImageId } });

    const attributeValues = attributeValueIds
      ? await this.attributeValueRepository.findAll({ where: { id: { in: attributeValueIds } } })
      : undefined;

    attributeValueIds && delete updateProductVariantDto.attributeValueIds;

    const updatedProductVariant = await this.productVariantRepository.update({
      where: { id: productVariantId },
      data: {
        ...updateProductVariantDto,
        attributeValues: attributeValueIds && { connect: attributeValues.map((attribute) => ({ id: attribute.id })) },
      },
      include: { attributeValues: true, mainImage: true, product: true },
    });

    return { message: ProductVariantMessages.UpdatedProductVariantSuccess, productVariant: updatedProductVariant };
  }

  async remove(userId: number, productVariantId: number): Promise<{ message: string; productVariant: ProductVariant }> {
    await this.productVariantRepository.findOneOrThrow({ where: { id: productVariantId, userId } });

    const orderItems = await this.orderItemRepository.findAll({ where: { productVariantId }, include: { order: true } });

    const hasUndeliveredOrderItems = orderItems.some((item) => item['order'].status !== OrderStatus.DELIVERED);

    if (hasUndeliveredOrderItems) throw new ForbiddenException(ProductVariantMessages.CannotRemoveProductVariant);

    const removedProductVariant = await this.productVariantRepository.delete({ where: { id: productVariantId } });

    return { message: ProductVariantMessages.RemovedProductVariantSuccess, productVariant: removedProductVariant };
  }
}
