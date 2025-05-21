import { BadRequestException, Injectable } from '@nestjs/common';
import { SeoMetaDto } from './dto/seo-meta.dto';
import { RobotsMetaTag, SeoMetaTargetType } from './enums/seo-meta.enum';
import { PrismaService } from '../prisma/prisma.service';
import { SeoMetaMessages } from './enums/seo-meta-messages.enum';

@Injectable()
export class SeoService {
  constructor(private readonly prisma: PrismaService) {}

  async upsertSeoMeta(userId: number, seoMetaDto: SeoMetaDto) {
    const { targetId, targetType, ogImageId, robotsTag } = seoMetaDto;

    if (!targetId || !targetType) {
      throw new BadRequestException('Target ID and type are required');
    }

    await this.validateTargetExistence(targetId, targetType);

    if (ogImageId) {
      await this.prisma.galleryItem.findUniqueOrThrow({ where: { id: ogImageId } });
    }

    const existingSeo = await this.prisma.seoMeta.findFirst({
      where: {
        targetId,
        targetType,
      },
    });

    if (existingSeo) {
      const updatedSeo = await this.prisma.seoMeta.update({
        where: { id: existingSeo.id },
        data: {
          ...seoMetaDto,
        },
      });

      return { message: SeoMetaMessages.UpdatedSeoMetaSuccess, seoMeta: updatedSeo };
    }

    const newSeo = await this.prisma.seoMeta.create({
      data: {
        userId,
        ...seoMetaDto,
        robotsTag: robotsTag ?? RobotsMetaTag.IndexFollow,
      },
    });

    return { message: SeoMetaMessages.CreatedSeoMetaSuccess, seoMeta: newSeo };
  }

  private async validateTargetExistence(targetId: number, targetType: SeoMetaTargetType) {
    switch (targetType) {
      case SeoMetaTargetType.product:
        await this.prisma.product.findUniqueOrThrow({ where: { id: targetId } });
        break;
      case SeoMetaTargetType.blog:
        await this.prisma.blog.findUniqueOrThrow({ where: { id: targetId } });
        break;
      case SeoMetaTargetType.category:
        await this.prisma.category.findUniqueOrThrow({ where: { id: targetId } });
        break;
      case SeoMetaTargetType.tag:
        await this.prisma.tag.findUniqueOrThrow({ where: { id: targetId } });
        break;
      default:
        throw new BadRequestException('Invalid target type');
    }
  }
}
