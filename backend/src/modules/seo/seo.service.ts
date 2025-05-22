import { BadRequestException, Injectable } from '@nestjs/common';
import { SeoMetaRepository } from './seo-meta.repository';
import { SeoMetaDto } from './dto/seo-meta.dto';
import { SeoMeta } from '@prisma/client';
import { SeoMetaMessages } from './enums/seo-meta-messages.enum';
import { BlogRepository } from '../blog/blog.repository';
import { ProductRepository } from '../product/repositories/product.repository';
import { TagRepository } from '../tag/tag.repository';
import { CategoryRepository } from '../category/category.repository';
import { EntityType, RobotsMetaTag } from './enums/seo-meta.enum';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';

@Injectable()
export class SeoService {
  constructor(
    private readonly seoMetaRepository: SeoMetaRepository,
    private readonly productRepository: ProductRepository,
    private readonly blogRepository: BlogRepository,
    private readonly tagRepository: TagRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly galleryItemRepository: GalleryItemRepository,
  ) {}

  async upsertSeoMeta(userId: number, seoMetaDto: SeoMetaDto): Promise<{ message: string; seoMeta: SeoMeta }> {
    const { blogId, productId, tagId, categoryId, ogImageId, entityType } = seoMetaDto;

    const values = [blogId, productId, tagId, categoryId];
    const definedCount = values.filter((v) => v !== undefined && v !== null).length;
    if (definedCount !== 1) {
      throw new BadRequestException(SeoMetaMessages.OnlyOneTargetAllowed);
    }

    if (ogImageId) {
      await this.galleryItemRepository.findOneOrThrow({ where: { id: ogImageId } });
    }
    if (productId && entityType === EntityType.PRODUCT) {
      await this.productRepository.findOneOrThrow({ where: { id: productId } });
    }
    if (blogId && entityType === EntityType.BLOG) {
      await this.blogRepository.findOneOrThrow({ where: { id: blogId } });
    }
    if (tagId && entityType === EntityType.TAG) {
      await this.tagRepository.findOneOrThrow({ where: { id: tagId } });
    }
    if (categoryId && entityType === EntityType.CATEGORY) {
      await this.categoryRepository.findOneOrThrow({ where: { id: categoryId } });
    }

    const existingSeo = await this.seoMetaRepository.findOne({
      where: {
        userId,
        entityType,
        OR: [
          { productId: entityType === EntityType.PRODUCT ? productId : undefined },
          { blogId: entityType === EntityType.BLOG ? blogId : undefined },
          { tagId: entityType === EntityType.TAG ? tagId : undefined },
          { categoryId: entityType === EntityType.CATEGORY ? categoryId : undefined },
        ],
      },
    });

    if (existingSeo) {
      const updatedSeo = await this.seoMetaRepository.update({
        where: { id: existingSeo.id, userId },
        data: { ...seoMetaDto, entityType },
      });
      return { message: SeoMetaMessages.UpdatedSeoMetaSuccess, seoMeta: updatedSeo };
    }

    // ایجاد سئوی جدید
    const seoMeta = await this.seoMetaRepository.create({
      data: {
        userId,
        ...seoMetaDto,
        entityType,
        robotsTag: seoMetaDto.robotsTag ?? RobotsMetaTag.IndexFollow,
      },
    });

    return { message: SeoMetaMessages.CreatedSeoMetaSuccess, seoMeta };
  }
}
