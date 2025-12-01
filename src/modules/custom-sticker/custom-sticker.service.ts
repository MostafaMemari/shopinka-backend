import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomStickerDto } from './dto/create-custom-sticker.dto';
import { UpdateCustomStickerDto } from './dto/update-custom-sticker.dto';
import { CustomStickerRepository } from './custom-sticker.repository';
import { CustomSticker, Prisma } from '@prisma/client';
import { FontRepository } from '../font/font.repository';
import { MaterialStickerRepository } from '../material-sticker/material-sticker.repository';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';
import { CustomStickerMessages } from './enums/custom-sticker-messages.enum';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { OutputPagination, pagination } from '../../common/utils/pagination.utils';
import { CustomStickerQueryDto } from './dto/custom-sticker-query-filter.dto';
import { allowedImageFormats } from '../../common/pipes/file-validator.pipe';

@Injectable()
export class CustomStickerService {
  private totalPrice: number = 100_000;

  constructor(
    private readonly customStickerRepository: CustomStickerRepository,
    private readonly fontRepository: FontRepository,
    private readonly materialStickerRepository: MaterialStickerRepository,
    private readonly galleryItemRepository: GalleryItemRepository,
  ) {}

  async create(userId: number, createCustomStickerDto: CreateCustomStickerDto): Promise<{ message: string; customSticker: CustomSticker }> {
    const { fontId, materialId, previewImageId } = createCustomStickerDto;

    if (previewImageId) {
      const image = await this.galleryItemRepository.findOneOrThrow({ where: { id: previewImageId } });

      if (!allowedImageFormats.includes(image.mimetype))
        throw new BadRequestException(CustomStickerMessages.PreviewImageNotAImage.replaceAll('${formats}', allowedImageFormats.join(',')));
    }
    await this.materialStickerRepository.findOneOrThrow({ where: { id: materialId } });
    await this.fontRepository.findOneOrThrow({ where: { id: fontId } });

    const customSticker = await this.customStickerRepository.create({
      data: { userId, ...createCustomStickerDto, finalPrice: this.totalPrice },
    });

    return { message: CustomStickerMessages.CreatedCustomStickerSuccess, customSticker };
  }

  async findAllByAdmin({ page, take, ...customStickerQueryDto }: CustomStickerQueryDto): Promise<OutputPagination<CustomSticker>> {
    const paginationDto = { page, take };

    const {
      endDate,
      sortBy,
      sortDirection,
      startDate,
      size,
      height,
      text,
      width,
      fontId,
      includeFont,
      includePreviewImage,
      includeUser,
      letterSpacing,
      lineHeight,
      materialId,
      style,
      textAlign,
      weight,
    } = customStickerQueryDto;

    const filters: Prisma.CustomStickerWhereInput = {};

    if (size) filters.size = size;
    if (height) filters.height = height;
    if (text) filters.text = { contains: text };
    if (width) filters.width = width;
    if (fontId) filters.fontId = fontId;
    if (letterSpacing) filters.letterSpacing = letterSpacing;
    if (lineHeight) filters.lineHeight = lineHeight;
    if (materialId) filters.materialId = materialId;
    if (style) filters.style = style;
    if (textAlign) filters.textAlign = textAlign;
    if (weight) filters.weight = weight;

    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const include: Prisma.CustomStickerInclude = { user: includeUser, font: includeFont, previewImage: includePreviewImage };

    const customStickers = await this.customStickerRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include,
    });

    return pagination(paginationDto, customStickers);
  }

  async findAll(userId: number, paginationDto: PaginationDto): Promise<OutputPagination<CustomSticker>> {
    const customStickers = await this.customStickerRepository.findAll({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { font: true, material: true, previewImage: true },
    });

    return pagination(paginationDto, customStickers);
  }

  async findOne(userId: number, id: number): Promise<CustomSticker> {
    return this.customStickerRepository.findOneOrThrow({
      where: { userId, id },
      include: { font: true, material: true, previewImage: true },
    });
  }

  async findOneByAdmin(id: number): Promise<CustomSticker> {
    return this.customStickerRepository.findOneOrThrow({ where: { id }, include: { font: true, material: true, previewImage: true } });
  }

  async updateByAdmin(
    id: number,
    updateCustomStickerDto: UpdateCustomStickerDto,
  ): Promise<{ message: string; customSticker: CustomSticker }> {
    const { fontId, previewImageId, materialId } = updateCustomStickerDto;

    await this.customStickerRepository.findOneOrThrow({ where: { id } });

    if (previewImageId) {
      const image = await this.galleryItemRepository.findOneOrThrow({ where: { id: previewImageId } });

      if (!allowedImageFormats.includes(image.mimetype))
        throw new BadRequestException(CustomStickerMessages.PreviewImageNotAImage.replaceAll('${formats}', allowedImageFormats.join(',')));
    }
    if (materialId) await this.materialStickerRepository.findOneOrThrow({ where: { id: materialId } });
    if (fontId) await this.fontRepository.findOneOrThrow({ where: { id: fontId } });

    const updatedCustomSticker = await this.customStickerRepository.update({ where: { id }, data: { ...updateCustomStickerDto } });

    return { message: CustomStickerMessages.UpdatedCustomStickerSuccess, customSticker: updatedCustomSticker };
  }

  async update(
    userId: number,
    id: number,
    updateCustomStickerDto: UpdateCustomStickerDto,
  ): Promise<{ message: string; customSticker: CustomSticker }> {
    const { fontId, previewImageId, materialId } = updateCustomStickerDto;

    const customSticker = await this.customStickerRepository.findOneOrThrow({ where: { id, userId } });

    if (customSticker.status != 'PENDING') throw new BadRequestException(CustomStickerMessages.NotPendingCustomSticker);

    if (previewImageId) {
      const image = await this.galleryItemRepository.findOneOrThrow({ where: { id: previewImageId } });

      if (!allowedImageFormats.includes(image.mimetype))
        throw new BadRequestException(CustomStickerMessages.PreviewImageNotAImage.replaceAll('${formats}', allowedImageFormats.join(',')));
    }

    if (materialId) await this.materialStickerRepository.findOneOrThrow({ where: { id: materialId } });
    if (fontId) await this.fontRepository.findOneOrThrow({ where: { id: fontId } });

    const updatedCustomSticker = await this.customStickerRepository.update({ where: { id }, data: { ...updateCustomStickerDto } });

    return { message: CustomStickerMessages.UpdatedCustomStickerSuccess, customSticker: updatedCustomSticker };
  }

  async remove(userId: number, id: number): Promise<{ message: string; customSticker: CustomSticker }> {
    await this.customStickerRepository.findOneOrThrow({ where: { userId, id } });

    const removedCustomSticker = await this.customStickerRepository.delete({ where: { userId, id } });

    return { message: CustomStickerMessages.RemovedCustomStickerSuccess, customSticker: removedCustomSticker };
  }

  async removeByAdmin(id: number): Promise<{ message: string; customSticker: CustomSticker }> {
    await this.customStickerRepository.findOneOrThrow({ where: { id } });

    const removedCustomSticker = await this.customStickerRepository.delete({ where: { id } });

    return { message: CustomStickerMessages.RemovedCustomStickerSuccess, customSticker: removedCustomSticker };
  }
}
