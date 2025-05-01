import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductRepository } from '../repositories/product.repository';
import { Product, ProductType } from 'generated/prisma';
import { CacheService } from '../../cache/cache.service';
import { GalleryItemRepository } from '../../gallery/repositories/gallery-item.repository';
import slugify from 'slugify';
import { AttributeRepository } from '../../attribute/repositories/attribute.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cacheService: CacheService,
    private readonly galleryItemRepository: GalleryItemRepository,
    private readonly attributeRepository: AttributeRepository
  ) { }

  async create(userId: number, createProductDto: CreateProductDto): Promise<{ message: string, product: Product }> {
    const { galleryImageIds, mainImageId, name, slug, sku, basePrice, salePrice, attributeIds, type } = createProductDto

    if (salePrice > basePrice) throw new BadRequestException("SalePrice cannot be higher than basePrice.")

    if (type == ProductType.VARIABLE && !attributeIds?.length)
      throw new BadRequestException("Attribute ids is required.")

    if (slug || sku) {
      const existingProduct = await this.productRepository.findOne({ where: { OR: [{ slug }, { sku }] } })
      if (existingProduct) throw new ConflictException("Product with this slug or sku already exists.")
    }

    await this.galleryItemRepository.findOneOrThrow({ where: { id: mainImageId } })

    const images = await this.galleryItemRepository.findAll({ where: { id: { in: galleryImageIds } } })

    const attributes = await this.attributeRepository.findAll({ where: { id: { in: attributeIds } } })

    const uniqueSlug = slug || await this.generateUniqueSlug(name)

    delete createProductDto.galleryImageIds
    delete createProductDto.attributeIds

    const newProduct = await this.productRepository.create({
      data: {
        ...createProductDto, userId, slug: uniqueSlug, mainImageId,
        galleryImages: { connect: images.map((image => ({ id: image.id }))) },
        attributes: type == ProductType.VARIABLE ? { connect: attributes.map(attribute => ({ id: attribute.id })) } : undefined
      },
      include: { mainImage: true, galleryImages: true, attributes: true }
    })

    return { message: "Created product successfully", product: newProduct }
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOneOrThrow({ where: { id }, include: { galleryImages: true, mainImage: true, user: true } })
  }

  async update(userId: number, productId: number, updateProductDto: UpdateProductDto): Promise<{ message: string, product: Product }> {
    const { galleryImageIds, mainImageId, slug, sku, basePrice, salePrice, attributeIds, type } = updateProductDto

    const product = await this.productRepository.findOneOrThrow({ where: { id: productId, userId } })

    if (type && type == ProductType.VARIABLE && !attributeIds?.length)
      throw new BadRequestException("Attribute ids is required.")

    if (salePrice && basePrice && salePrice > basePrice || salePrice && salePrice > product.basePrice) {
      throw new BadRequestException("SalePrice cannot be higher than basePrice.")
    }

    if (slug || sku) {
      const existingProduct = await this.productRepository.findOne({ where: { id: { not: productId }, OR: [{ slug }, { sku }] } })
      if (existingProduct) throw new ConflictException("Product with this slug or sku already exists.")
    }

    if (mainImageId) await this.galleryItemRepository.findOneOrThrow({ where: { id: mainImageId } })

    const images = galleryImageIds ? await this.galleryItemRepository.findAll({ where: { id: { in: galleryImageIds } } }) : undefined

    const attributes = attributeIds ? await this.attributeRepository.findAll({ where: { id: { in: attributeIds } } }) : undefined

    const isAllowedProductType = attributeIds && product.type == ProductType.VARIABLE || type && type == ProductType.VARIABLE

    attributeIds && delete updateProductDto.attributeIds
    galleryImageIds && delete updateProductDto.galleryImageIds

    const updatedProduct = await this.productRepository.update({
      where: { id: productId },
      data: {
        ...updateProductDto,
        galleryImages: images ? { set: images.map(image => ({ id: image.id })) } : undefined,
        attributes: isAllowedProductType ? { set: attributes.map(attribute => ({ id: attribute.id })) } : undefined
      },
      include: { attributes: true, galleryImages: true, mainImage: true }
    })


    return { message: "Updated product successfully.", product: updatedProduct }
  }

  async remove(userId: number, productId: number): Promise<{ message: string, product: Product }> {
    await this.productRepository.findOneOrThrow({ where: { id: productId, userId } })

    const removedProduct = await this.productRepository.delete({ where: { id: productId } })

    return { message: "Product removed successfully.", product: removedProduct }
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
