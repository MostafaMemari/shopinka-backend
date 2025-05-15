import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductRepository } from '../repositories/product.repository';
import { Prisma, Product, ProductStatus, ProductType } from 'generated/prisma';
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

@Injectable()
export class ProductService {
  private readonly CACHE_EXPIRE_TIME: number = 600 //* 5 minutes

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly favoriteRepository: FavoriteRepository,
    private readonly cacheService: CacheService,
    private readonly galleryItemRepository: GalleryItemRepository,
    private readonly attributeRepository: AttributeRepository,
    private readonly categoryRepository: CategoryRepository,
  ) { }

  async create(userId: number, createProductDto: CreateProductDto): Promise<{ message: string, product: Product }> {
    const { categoryIds, galleryImageIds, mainImageId, name, slug, sku, basePrice, salePrice, attributeIds, type } = createProductDto

    if (salePrice > basePrice) throw new BadRequestException(ProductMessages.SalePriceTooHigh)

    if (slug || sku) {
      const existingProduct = await this.productRepository.findOne({ where: { OR: [{ slug }, { sku }] } })
      if (existingProduct) throw new ConflictException(ProductMessages.AlreadyExistsProduct)
    }

    const categories = categoryIds ? await this.categoryRepository.findAll({ where: { id: { in: categoryIds } } }) : []

    if (mainImageId) await this.galleryItemRepository.findOneOrThrow({ where: { id: mainImageId } })

    const images = await this.galleryItemRepository.findAll({ where: { id: { in: galleryImageIds } } })

    const attributes = await this.attributeRepository.findAll({ where: { id: { in: attributeIds } } })

    const uniqueSlug = slug || await this.generateUniqueSlug(name)

    delete createProductDto.galleryImageIds
    delete createProductDto.attributeIds
    categoryIds && delete createProductDto.categoryIds

    const newProduct = await this.productRepository.create({
      data: {
        ...createProductDto, userId, slug: uniqueSlug, mainImageId,
        galleryImages: { connect: images.map((image => ({ id: image.id }))) },
        attributes: type == ProductType.VARIABLE ? { connect: attributes.map(attribute => ({ id: attribute.id })) } : undefined,
        categories: { connect: categories.map(cat => ({ id: cat.id })) }
      },
      include: { mainImage: true, galleryImages: true, attributes: true, categories: true }
    })

    return { message: ProductMessages.CreatedProductSuccess, product: newProduct }
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
      includeSeoMeta,
      includeTags,
      includeSeoCategories
    } = queryProductDto

    const sortedDto = sortObject(queryProductDto);

    const cacheKey = `${CacheKeys.Products}_${JSON.stringify(sortedDto)}`;

    const cachedProducts = await this.cacheService.get<null | Product[]>(cacheKey);

    if (cachedProducts) return { ...pagination(paginationDto, cachedProducts) }

    const filters: Prisma.ProductWhereInput = { status: ProductStatus.PUBLISHED };

    if (sku) filters.sku = { contains: sku, mode: "insensitive" };
    if (shortDescription) filters.shortDescription = { contains: shortDescription, mode: "insensitive" };
    if (description) filters.description = { contains: description, mode: "insensitive" };
    if (name) filters.name = { contains: name, mode: "insensitive" };
    if (slug) filters.slug = { contains: slug, mode: "insensitive" };
    if (type) filters.type = type
    if (salePrice) filters.salePrice = salePrice
    if (height) filters.height = height
    if (weight) filters.weight = weight
    if (width) filters.width = width
    if (length) filters.length = length
    if (quantity) filters.quantity = quantity
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
        seoMeta: includeSeoMeta,
        attributes: includeAttributes,
        galleryImages: includeGalleryImages,
        mainImage: includeMainImage,
        user: includeUser,
        variants: includeVariants
      }
    });

    await this.cacheService.set(cacheKey, products, this.CACHE_EXPIRE_TIME);

    return { ...pagination(paginationDto, products) }
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOneOrThrow({
      where: { id, status: ProductStatus.PUBLISHED },
      include: { galleryImages: true, mainImage: true, user: true, variants: true, tags: true, seoMeta: true, categories: true, attributes: true }
    })
  }

  findOneDraft(userId: number, id: number): Promise<Product> {
    return this.productRepository.findOneOrThrow({ where: { userId, id, status: ProductStatus.DRAFT }, include: { galleryImages: true, mainImage: true, user: true, variants: true } })
  }

  async update(userId: number, productId: number, updateProductDto: UpdateProductDto): Promise<{ message: string, product: Product }> {
    const { categoryIds, galleryImageIds, mainImageId, slug, sku, basePrice, salePrice, attributeIds, type } = updateProductDto

    const product = await this.productRepository.findOneOrThrow({ where: { id: productId, userId } })

    if (salePrice && basePrice && salePrice > basePrice || salePrice && salePrice > product.basePrice) {
      throw new BadRequestException(ProductMessages.SalePriceTooHigh)
    }

    if (slug || sku) {
      const existingProduct = await this.productRepository.findOne({ where: { id: { not: productId }, OR: [{ slug }, { sku }] } })
      if (existingProduct) throw new ConflictException(ProductMessages.AlreadyExistsProduct)
    }

    if (mainImageId !== null) await this.galleryItemRepository.findOneOrThrow({ where: { id: mainImageId } })

    const categories = categoryIds ? await this.categoryRepository.findAll({ where: { id: { in: categoryIds } } }) : []

    const images = galleryImageIds ? await this.galleryItemRepository.findAll({ where: { id: { in: galleryImageIds } } }) : undefined

    const attributes = attributeIds ? await this.attributeRepository.findAll({ where: { id: { in: attributeIds } } }) : undefined

    const isAllowedProductType = attributeIds && (product.type == ProductType.VARIABLE || type && type == ProductType.VARIABLE)

    attributeIds && delete updateProductDto.attributeIds
    galleryImageIds && delete updateProductDto.galleryImageIds
    categoryIds && delete updateProductDto.categoryIds

    const updatedProduct = await this.productRepository.update({
      where: { id: productId },
      data: {
        ...updateProductDto,
        galleryImages: images ? { set: images.map(image => ({ id: image.id })) } : undefined,
        attributes: isAllowedProductType ? { set: attributes.map(attribute => ({ id: attribute.id })) } : undefined,
        categories: categoryIds && { set: categories.map(cat => ({ id: cat.id })) }
      },
      include: { attributes: true, galleryImages: true, mainImage: true }
    })


    return { message: ProductMessages.UpdatedProductSuccess, product: updatedProduct }
  }

  async remove(userId: number, productId: number): Promise<{ message: string, product: Product }> {
    await this.productRepository.findOneOrThrow({ where: { id: productId, userId } })

    const removedProduct = await this.productRepository.delete({ where: { id: productId } })

    return { message: ProductMessages.RemovedProductSuccess, product: removedProduct }
  }

  async findAllDrafts(userId: number, paginationDto: PaginationDto): Promise<unknown> {
    const products = await this.productRepository.findAll({ where: { userId, status: ProductStatus.DRAFT } })
    return pagination(paginationDto, products)
  }

  async favoriteToggle(userId: number, productId: number) {
    await this.productRepository.findOneOrThrow({ where: { id: productId } })

    const existingFavorite = await this.favoriteRepository.findOne({ where: { productId, userId } })

    if (existingFavorite) {
      const removedFavorite = await this.favoriteRepository.delete({ where: { id: existingFavorite.id } })

      return { message: FavoriteMessages.RemovedFavoriteSuccess, favorite: removedFavorite }
    }

    const newFavorite = await this.favoriteRepository.create({ data: { productId, userId } })

    return { message: FavoriteMessages.CreatedFavoriteSuccess, favorite: newFavorite }
  }

  private async generateUniqueSlug(name: string): Promise<string> {
    let slug = slugify(name, { locale: 'fa', lower: true, strict: true, trim: true })
    let suffix = 0
    let uniqueSlug = slug

    while (await this.productRepository.findOne({ where: { slug: uniqueSlug } })) {
      suffix++
      uniqueSlug = `${slug}-${suffix}`
    }

    return uniqueSlug
  }
}
