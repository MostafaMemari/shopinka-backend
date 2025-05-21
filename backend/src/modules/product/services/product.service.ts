import { BadRequestException, ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductRepository } from '../repositories/product.repository';
import { OrderStatus, Prisma, Product, ProductStatus, ProductType } from 'generated/prisma';
import { CacheService } from '../../cache/cache.service';
import { GalleryItemRepository } from '../../gallery/repositories/gallery-item.repository';
import slugify from 'slugify';
import { AttributeRepository } from '../../attribute/repositories/attribute.repository';
import { QueryProductDto } from '../dto/query-product.dto';
import { sortObject } from '../../../common/utils/functions.utils';
import { CacheKeys } from '../../../common/enums/cache.enum';
import { pagination } from '../../../common/utils/pagination.utils';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { ProductMessages } from '../enums/product-messages.enum';
import { FavoriteRepository } from '../repositories/favorite.repository';
import { FavoriteMessages } from '../enums/favorite-messages.enum';
import { CategoryRepository } from '../../category/category.repository';
import { OrderItemRepository } from '../../order/repositories/order-item.repository';
import { TagRepository } from 'src/modules/tag/tag.repository';

@Injectable()
export class ProductService {
  private readonly CACHE_EXPIRE_TIME: number = 600; //* 5 minutes

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly favoriteRepository: FavoriteRepository,
    private readonly cacheService: CacheService,
    private readonly galleryItemRepository: GalleryItemRepository,
    private readonly attributeRepository: AttributeRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly tagRepository: TagRepository,
    private readonly orderItemRepository: OrderItemRepository,
  ) {}

  async create(userId: number, createProductDto: CreateProductDto): Promise<{ message: string; product: Product }> {
    const { categoryIds, galleryImageIds, mainImageId, name, slug, sku, basePrice, salePrice, attributeIds, type, tagIds } =
      createProductDto;

    if (salePrice > basePrice) throw new BadRequestException(ProductMessages.SalePriceTooHigh);

    if (slug || sku) {
      const existingProduct = await this.productRepository.findOne({ where: { OR: [{ slug }, { sku }] } });
      if (existingProduct) throw new ConflictException(ProductMessages.AlreadyExistsProduct);
    }

    if (mainImageId) await this.galleryItemRepository.findOneOrThrow({ where: { id: mainImageId } });

    const images = galleryImageIds && (await this.galleryItemRepository.findAll({ where: { id: { in: galleryImageIds } } }));
    const categories = categoryIds && (await this.categoryRepository.findAll({ where: { id: { in: categoryIds } } }));
    const attributes = attributeIds && (await this.attributeRepository.findAll({ where: { id: { in: attributeIds } } }));
    const tags = tagIds && (await this.tagRepository.findAll({ where: { id: { in: tagIds } } }));

    const uniqueSlug = slug || (await this.generateUniqueSlug(name));

    delete createProductDto.galleryImageIds;
    delete createProductDto.attributeIds;
    delete createProductDto.categoryIds;
    delete createProductDto.tagIds;

    const newProduct = await this.productRepository.create({
      data: {
        ...createProductDto,
        userId,
        slug: uniqueSlug,
        mainImageId,
        galleryImages: galleryImageIds && { connect: images.map((image) => ({ id: image.id })) },
        attributes:
          type == ProductType.VARIABLE && attributeIds ? { connect: attributes.map((attribute) => ({ id: attribute.id })) } : undefined,
        categories: categoryIds && { connect: categories.map((cat) => ({ id: cat.id })) },
        tags: tagIds && { connect: tags.map((tag) => ({ id: tag.id })) },
      },
    });

    return { message: ProductMessages.CreatedProductSuccess, product: newProduct };
  }

  async findAll({ page, take, ...queryProductDto }: QueryProductDto): Promise<unknown> {
    const paginationDto = { page, take };
    const {
      description,
      endDate,
      includeUser,
      name,
      slug,
      sortBy,
      sortDirection,
      startDate,
      type,
      height,
      includeAttributes,
      includeGalleryImages,
      includeMainImage,
      length,
      maxPrice,
      minPrice,
      quantity,
      salePrice,
      shortDescription,
      sku,
      weight,
      width,
      includeVariants,
      includeTags,
      includeSeoCategories,
      includeAttributeValues,
    } = queryProductDto;

    const sortedDto = sortObject(queryProductDto);

    const cacheKey = `${CacheKeys.Products}_${JSON.stringify(sortedDto)}`;

    const cachedProducts = await this.cacheService.get<null | Product[]>(cacheKey);

    if (cachedProducts) return { ...pagination(paginationDto, cachedProducts) };

    const filters: Prisma.ProductWhereInput = { status: ProductStatus.PUBLISHED };

    if (sku) filters.sku = { contains: sku, mode: 'insensitive' };
    if (shortDescription) filters.shortDescription = { contains: shortDescription, mode: 'insensitive' };
    if (description) filters.description = { contains: description, mode: 'insensitive' };
    if (name) filters.name = { contains: name, mode: 'insensitive' };
    if (slug) filters.slug = { contains: slug, mode: 'insensitive' };
    if (type) filters.type = type;
    if (salePrice) filters.salePrice = salePrice;
    if (height) filters.height = height;
    if (weight) filters.weight = weight;
    if (width) filters.width = width;
    if (length) filters.length = length;
    if (quantity) filters.quantity = quantity;
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

    const products = await this.productRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include: {
        categories: includeSeoCategories,
        tags: includeTags,
        attributes: includeAttributes && { include: { values: includeAttributeValues } },
        galleryImages: includeGalleryImages,
        mainImage: includeMainImage,
        user: includeUser,
        variants: includeVariants && { include: { mainImage: true, attributeValues: includeAttributeValues } },
      },
    });

    await this.cacheService.set(cacheKey, products, this.CACHE_EXPIRE_TIME);

    return { ...pagination(paginationDto, products) };
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOneOrThrow({
      where: { id, status: ProductStatus.PUBLISHED },
      include: {
        galleryImages: true,
        mainImage: true,
        user: true,
        tags: true,
        categories: true,
        attributes: { include: { values: true } },
        seoMeta: true,
      },
    });
  }

  findOneDraft(userId: number, id: number): Promise<Product> {
    return this.productRepository.findOneOrThrow({
      where: { userId, id, status: ProductStatus.DRAFT },
      include: { attributes: { include: { values: true } }, galleryImages: true, mainImage: true, user: true },
    });
  }

  async update(userId: number, productId: number, updateProductDto: UpdateProductDto): Promise<{ message: string; product: Product }> {
    const { status, categoryIds, galleryImageIds, mainImageId, slug, sku, basePrice, salePrice, attributeIds, type, tagIds } =
      updateProductDto;

    const product = await this.productRepository.findOneOrThrow({ where: { id: productId, userId }, include: { variants: true } });

    if ((salePrice && basePrice && salePrice > basePrice) || (salePrice && salePrice > product.basePrice)) {
      throw new BadRequestException(ProductMessages.SalePriceTooHigh);
    }

    if (slug || sku) {
      const existingProduct = await this.productRepository.findOne({ where: { id: { not: productId }, OR: [{ slug }, { sku }] } });
      if (existingProduct) throw new ConflictException(ProductMessages.AlreadyExistsProduct);
    }

    if (mainImageId !== null) await this.galleryItemRepository.findOneOrThrow({ where: { id: mainImageId } });

    const orderItems = await this.orderItemRepository.findAll({
      where: {
        productVariantId: { in: product['variants'].map((v) => v.id) },
      },
      include: { order: true },
    });

    const hasUndeliveredOrderItems = orderItems.some((item) => item['order'].status !== OrderStatus.DELIVERED);

    if (hasUndeliveredOrderItems && type && type === ProductType.SIMPLE) {
      throw new ForbiddenException(ProductMessages.CannotChangeToSimpleType);
    }

    if (hasUndeliveredOrderItems && status && status === ProductStatus.DRAFT) {
      throw new ForbiddenException(ProductMessages.CannotDraftProductWithPendingOrders);
    }

    const categories = categoryIds && (await this.categoryRepository.findAll({ where: { id: { in: categoryIds } } }));
    const images = galleryImageIds && (await this.galleryItemRepository.findAll({ where: { id: { in: galleryImageIds } } }));
    const attributes = attributeIds && (await this.attributeRepository.findAll({ where: { id: { in: attributeIds } } }));
    const tags = tagIds && (await this.tagRepository.findAll({ where: { id: { in: tagIds } } }));

    const isAllowedProductType = attributeIds && (product.type == ProductType.VARIABLE || (type && type == ProductType.VARIABLE));

    delete updateProductDto.attributeIds;
    delete updateProductDto.galleryImageIds;
    delete updateProductDto.categoryIds;
    delete updateProductDto.tagIds;

    const updatedProduct = await this.productRepository.update({
      where: { id: productId },
      data: {
        ...updateProductDto,
        galleryImages: images ? { set: images.map((image) => ({ id: image.id })) } : undefined,
        attributes: isAllowedProductType ? { set: attributes.map((attribute) => ({ id: attribute.id })) } : undefined,
        tags: tags && { connect: tags.map((tag) => ({ id: tag.id })) },
        categories: categoryIds && { set: categories.map((cat) => ({ id: cat.id })) },
        variants: type && type == ProductType.SIMPLE ? { deleteMany: { productId } } : undefined,
        orderItems: status && status == ProductStatus.DRAFT ? { deleteMany: { productId } } : undefined,
        cartItems: status && status == ProductStatus.DRAFT ? { deleteMany: { productId } } : undefined,
        favorites: status && status == ProductStatus.DRAFT ? { deleteMany: { productId } } : undefined,
      },
    });

    return { message: ProductMessages.UpdatedProductSuccess, product: updatedProduct };
  }

  async remove(userId: number, productId: number): Promise<{ message: string; product: Product }> {
    const product = await this.productRepository.findOneOrThrow({ where: { id: productId, userId }, include: { variants: true } });

    const orderItems = await this.orderItemRepository.findAll({
      where: {
        OR: [{ productVariantId: { in: product['variants'].map((v) => v.id) } }, { productId }],
      },
      include: { order: true },
    });

    const hasUndeliveredOrderItems = orderItems.some((item) => item['order'].status !== OrderStatus.DELIVERED);

    if (hasUndeliveredOrderItems) throw new ForbiddenException(ProductMessages.CannotRemoveProduct);

    const removedProduct = await this.productRepository.delete({ where: { id: productId } });

    return { message: ProductMessages.RemovedProductSuccess, product: removedProduct };
  }

  async findAllDrafts(userId: number, paginationDto: PaginationDto): Promise<unknown> {
    const products = await this.productRepository.findAll({
      where: { userId, status: ProductStatus.DRAFT },
      include: {
        attributes: { include: { values: true } },
        galleryImages: true,
        mainImage: true,
        user: true,
        variants: { include: { attributeValues: true } },
      },
    });
    return pagination(paginationDto, products);
  }

  async favoriteToggle(userId: number, productId: number) {
    await this.productRepository.findOneOrThrow({ where: { id: productId } });

    const existingFavorite = await this.favoriteRepository.findOne({ where: { productId, userId } });

    if (existingFavorite) {
      const removedFavorite = await this.favoriteRepository.delete({ where: { id: existingFavorite.id } });

      return { message: FavoriteMessages.RemovedFavoriteSuccess, favorite: removedFavorite };
    }

    const newFavorite = await this.favoriteRepository.create({ data: { productId, userId } });

    return { message: FavoriteMessages.CreatedFavoriteSuccess, favorite: newFavorite };
  }

  private async generateUniqueSlug(name: string): Promise<string> {
    let slug = slugify(name, { locale: 'fa', lower: true, strict: true, trim: true });
    let suffix = 0;
    let uniqueSlug = slug;

    while (await this.productRepository.findOne({ where: { slug: uniqueSlug } })) {
      suffix++;
      uniqueSlug = `${slug}-${suffix}`;
    }

    return uniqueSlug;
  }
}
