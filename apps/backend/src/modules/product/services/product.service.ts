import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductRepository } from '../repositories/product.repository';
import { Product } from 'generated/prisma';
import { CacheService } from 'src/modules/cache/cache.service';
import { GalleryItemRepository } from 'src/modules/gallery/repositories/gallery-item.repository';
import slugify from 'slugify';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cacheService: CacheService,
    private readonly galleryItemRepository: GalleryItemRepository
  ) { }

  async create(userId: number, createProductDto: CreateProductDto): Promise<{ message: string, product: Product }> {
    const { galleryImageIds, mainImageId, name, slug, sku } = createProductDto

    if (slug || sku) {
      const existingProduct = await this.productRepository.findOne({ where: { OR: [{ slug }, { sku }] } })
      if (existingProduct) throw new ConflictException("Product with this slug or sku already exists.")
    }

    await this.galleryItemRepository.findOneOrThrow({ where: { id: mainImageId } })

    const images = await this.galleryItemRepository.findAll({ where: { id: { in: galleryImageIds } } })

    const uniqueSlug = slug || await this.generateUniqueSlug(name)

    delete createProductDto.galleryImageIds

    const newProduct = await this.productRepository.create({
      data: {
        ...createProductDto, userId, slug: uniqueSlug, mainImageId,
        galleryImages: { connect: images.map((image => ({ id: image.id }))) }
      },
      include: { mainImage: true, galleryImages: true }
    })

    return { message: "Created product successfully", product: newProduct }
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
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
