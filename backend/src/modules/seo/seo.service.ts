import { BadRequestException, Injectable } from '@nestjs/common';
import { SeoMetaRepository } from './seo-meta.repository';
import { SeoMetaDto } from './dto/seo-meta.dto';
import { SeoMeta } from 'generated/prisma';
import { SeoMetaMessages } from './enums/seo-meta-messages.enum';
import { BlogRepository } from '../blog/blog.repository';
import { ProductRepository } from '../product/repositories/product.repository';

@Injectable()
export class SeoService {
    constructor(
        private readonly seoMetaRepository: SeoMetaRepository,
        private readonly productRepository: ProductRepository,
        private readonly blogRepository: BlogRepository,
    ) { }

    async upsertSeoMeta(userId: number, seoMetaDto: SeoMetaDto): Promise<{ message: string, seoMeta: SeoMeta }> {
        const { blogId, productId, tagId } = seoMetaDto

        const values = [blogId, productId, tagId]

        const definedCount = values.filter(v => v !== undefined && v !== null).length

        if (definedCount !== 1) throw new BadRequestException(SeoMetaMessages.OnlyOneTargetAllowed)

        if (productId) await this.productRepository.findOneOrThrow({ where: { id: productId } })
        if (blogId) await this.blogRepository.findOneOrThrow({ where: { id: blogId } })
        //TODO: Add check tag id

        const existingSeo = await this.seoMetaRepository.findOne({
            where: { OR: [{ productId, product: { userId } }, { blogId, blog: { userId } }, { tagId, tag: { userId } }] }
        })

        if (existingSeo) {
            const updatedSeo = await this.seoMetaRepository.update({ where: { id: existingSeo.id }, data: seoMetaDto })
            return { message: SeoMetaMessages.UpdatedSeoMetaSuccess, seoMeta: updatedSeo }
        }

        const seoMeta = await this.seoMetaRepository.create({ data: { ...seoMetaDto, productId } })

        return { message: SeoMetaMessages.CreatedSeoMetaSuccess, seoMeta }
    }
}
