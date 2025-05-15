import { BadRequestException, Injectable } from '@nestjs/common';
import { SeoMetaRepository } from './seo-meta.repository';
import { SeoMetaDto } from './dto/seo-meta.dto';
import { SeoMeta } from 'generated/prisma';
import { SeoMetaMessages } from './enums/seo-meta-messages.enum';
import { BlogRepository } from '../blog/blog.repository';
import { ProductRepository } from '../product/repositories/product.repository';
import { TagRepository } from '../tag/tag.repository';
import { CategoryRepository } from '../category/category.repository';
import { RobotsMetaTag } from './enums/seo-meta.enum';
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
    ) { }

    async upsertSeoMeta(userId: number, seoMetaDto: SeoMetaDto): Promise<{ message: string, seoMeta: SeoMeta }> {
        const { blogId, productId, tagId, categoryId, robotsTag, ogImageId } = seoMetaDto

        const values = [blogId, productId, tagId, categoryId]

        const definedCount = values.filter(v => v !== undefined && v !== null).length

        if (definedCount !== 1) throw new BadRequestException(SeoMetaMessages.OnlyOneTargetAllowed)

        if (ogImageId !== null) await this.galleryItemRepository.findOneOrThrow({ where: { id: ogImageId } })
        if (productId) await this.productRepository.findOneOrThrow({ where: { id: productId } })
        if (blogId) await this.blogRepository.findOneOrThrow({ where: { id: blogId } })
        if (tagId) await this.tagRepository.findOneOrThrow({ where: { id: tagId } })
        if (categoryId) await this.categoryRepository.findOneOrThrow({ where: { id: categoryId } })

        const existingSeo = await this.seoMetaRepository.findOne({
            where: {
                OR: [
                    { productId, product: { userId } },
                    { blogId, blog: { userId } },
                    { tagId, tag: { userId } },
                    { categoryId, category: { userId } }
                ]
            }
        })

        if (existingSeo) {
            const updatedSeo = await this.seoMetaRepository.update({ where: { id: existingSeo.id }, data: seoMetaDto })
            return { message: SeoMetaMessages.UpdatedSeoMetaSuccess, seoMeta: updatedSeo }
        }

        const seoMeta = await this.seoMetaRepository.create({ data: { ...seoMetaDto, productId, robotsTag: robotsTag ?? RobotsMetaTag.IndexFollow } })

        return { message: SeoMetaMessages.CreatedSeoMetaSuccess, seoMeta }
    }
}
