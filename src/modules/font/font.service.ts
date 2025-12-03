import { ConflictException, Injectable } from '@nestjs/common';
import { CreateFontDto } from './dto/create-font.dto';
import { UpdateFontDto } from './dto/update-font.dto';
import { FontRepository } from './font.repository';
import { Font, Prisma } from '@prisma/client';
import { FontMessages } from './enums/font-messages.enum';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';
import { OutputPagination, pagination } from '../../common/utils/pagination.utils';
import { FontQueryDto } from './dto/font-query-filter.dto';

@Injectable()
export class FontService {
  constructor(
    private readonly fontRepository: FontRepository,
    private readonly galleryItemRepository: GalleryItemRepository,
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

  async remove(id: number): Promise<Font> {
    await this.fontRepository.findOneOrThrow({ where: { id } });

    return this.fontRepository.delete({ where: { id } });
  }
}
