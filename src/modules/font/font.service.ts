import { ConflictException, Injectable } from '@nestjs/common';
import { CreateFontDto } from './dto/create-font.dto';
import { UpdateFontDto } from './dto/update-font.dto';
import { FontRepository } from './font.repository';
import { Font, Prisma } from '@prisma/client';
import { FontMessages } from './enums/font-messages.enum';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';
import { OutputPagination, pagination } from '../../common/utils/pagination.utils';
import { FontQueryDto } from './dto/font-query-filter.dto';
import { PrismaService } from '../prisma/prisma.service';
import { buildCacheKey, parseTTL } from 'src/common/utils/functions.utils';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class FontService {
  constructor(
    private readonly fontRepository: FontRepository,
    private readonly prismaService: PrismaService,
    private readonly galleryItemRepository: GalleryItemRepository,
    private readonly cacheService: CacheService,
  ) {}

  async create(createFontDto: CreateFontDto): Promise<{ message: string; font: Font }> {
    const { fileId, thumbnailId } = createFontDto;

    const existingFont = await this.fontRepository.findOne({ where: { name: createFontDto.name } });

    if (existingFont) throw new ConflictException(FontMessages.AlreadyExistsFont);

    await this.galleryItemRepository.findOneOrThrow({ where: { id: fileId } });
    if (thumbnailId) await this.galleryItemRepository.findOneOrThrow({ where: { id: thumbnailId } });

    const font = await this.fontRepository.create({ data: { ...createFontDto } });

    return { message: FontMessages.CreatedFontSuccess, font };
  }

  async findAll({ page, take, ...fontQueryDto }: FontQueryDto): Promise<OutputPagination<Font>> {
    const paginationDto = { page, take };

    const cacheKey = buildCacheKey(Prisma.ModelName.Font, fontQueryDto, page, take);
    const cachedFonts = await this.cacheService.get<Font[] | null>(cacheKey);
    if (cachedFonts) return pagination(paginationDto, cachedFonts);

    const {
      endDate,
      sortBy,
      sortDirection,
      startDate,
      difficultyRatio,
      displayName,
      includeFile,
      includeThumbnail,
      isPersian,
      lineHeight,
      name,
      size,
    } = fontQueryDto;

    const filters: Prisma.FontWhereInput = {};

    if (name) filters.name = { contains: name };
    if (displayName) filters.displayName = { contains: displayName };
    if (isPersian !== undefined) filters.isPersian = isPersian;
    if (size) filters.size = size;
    if (lineHeight) filters.lineHeight = lineHeight;
    if (difficultyRatio) filters.difficultyRatio = difficultyRatio;

    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const include: Prisma.FontInclude = { file: includeFile, thumbnail: includeThumbnail };

    const fonts = await this.fontRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include,
    });

    const cacheTtl = parseTTL(process.env.CACHE_TTL);
    await this.cacheService.set(cacheKey, fonts, cacheTtl);

    return pagination(paginationDto, fonts);
  }

  findOne(id: number): Promise<Font> {
    return this.fontRepository.findOneOrThrow({ where: { id }, include: { file: true, thumbnail: true } });
  }

  async update(id: number, updateFontDto: UpdateFontDto): Promise<{ message: string; font: Font }> {
    const { fileId, thumbnailId } = updateFontDto;

    await this.fontRepository.findOneOrThrow({ where: { id } });

    if (updateFontDto.name) {
      const existingFont = await this.fontRepository.findOne({ where: { name: updateFontDto.name, id: { not: id } } });

      if (existingFont) throw new ConflictException(FontMessages.AlreadyExistsFont);
    }

    if (fileId) await this.galleryItemRepository.findOneOrThrow({ where: { id: fileId } });
    if (thumbnailId) await this.galleryItemRepository.findOneOrThrow({ where: { id: thumbnailId } });

    const updatedFont = await this.fontRepository.update({ where: { id }, data: updateFontDto });

    return { message: FontMessages.UpdatedFontSuccess, font: updatedFont };
  }

  async setDefault(id: number): Promise<{ message: string }> {
    const fontToSetDefault = await this.fontRepository.findOneOrThrow({ where: { id } });
    if (fontToSetDefault.isDefault) return { message: FontMessages.SetDefaultFontSuccess };

    const currentDefaultFont = await this.fontRepository.findOne({ where: { isDefault: true } });

    await this.prismaService.$transaction(async (tx) => {
      if (currentDefaultFont) {
        await tx.font.update({
          where: { id: currentDefaultFont.id },
          data: { isDefault: false },
        });
      }
      await tx.font.update({
        where: { id: fontToSetDefault.id },
        data: { isDefault: true },
      });
    });
    return { message: FontMessages.SetDefaultFontSuccess };
  }

  async reorder(fonts: { id: number; displayOrder: number }[]): Promise<{ message: string }> {
    if (!fonts || fonts.length === 0) return { message: FontMessages.ReorderedFontsSuccess };

    await this.prismaService.$transaction(
      fonts.map((font) =>
        this.prismaService.font.update({
          where: { id: font.id },
          data: { displayOrder: font.displayOrder },
        }),
      ),
    );

    return { message: FontMessages.ReorderedFontsSuccess };
  }

  async remove(id: number): Promise<{ message: string; font: Font }> {
    await this.fontRepository.findOneOrThrow({ where: { id } });

    const removedFont = await this.fontRepository.delete({ where: { id } });

    return { message: FontMessages.RemovedFontSuccess, font: removedFont };
  }
}
