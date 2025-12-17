import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomStickerDto } from './dto/create-custom-sticker.dto';
import { UpdateCustomStickerDto } from './dto/update-custom-sticker.dto';
import { CustomStickerRepository } from './custom-sticker.repository';
import { CustomSticker, OrderItem, Prisma } from '@prisma/client';
import { FontRepository } from '../font/font.repository';
import { MaterialStickerRepository } from '../material-sticker/material-sticker.repository';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';
import { CustomStickerMessages } from './enums/custom-sticker-messages.enum';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { OutputPagination, pagination } from '../../common/utils/pagination.utils';
import { CustomStickerQueryDto } from './dto/custom-sticker-query-filter.dto';
import { allowedImageFormats } from '../../common/pipes/file-validator.pipe';
import { calculateStickerPrice, calculateStickerTotalPrice } from '../../common/utils/functions.utils';
import { CalculateStickerPriceDto } from './dto/calculate-sticker-price.dto';

@Injectable()
export class CustomStickerService {
  constructor(
    private readonly customStickerRepository: CustomStickerRepository,
    private readonly fontRepository: FontRepository,
    private readonly materialStickerRepository: MaterialStickerRepository,
    private readonly galleryItemRepository: GalleryItemRepository,
  ) {}

  async create(userId: number, createCustomStickerDto: CreateCustomStickerDto): Promise<{ message: string; customSticker: CustomSticker }> {
    const { fontId, materialId, previewImageId, lines } = createCustomStickerDto;

    if (previewImageId) {
      const image = await this.galleryItemRepository.findOneOrThrow({ where: { id: previewImageId } });

      if (!allowedImageFormats.includes(image.mimetype))
        throw new BadRequestException(CustomStickerMessages.PreviewImageNotAImage.replaceAll('${formats}', allowedImageFormats.join(',')));
    }
    const material = await this.materialStickerRepository.findOneOrThrow({ where: { id: materialId } });
    const font = await this.fontRepository.findOneOrThrow({ where: { id: fontId } });

    const finalPrice = calculateStickerTotalPrice({
      font,
      material,
      lines: lines.map((line) => ({ width: line.width, height: line.height })),
    });

    const customSticker = await this.customStickerRepository.create({
      data: {
        userId,
        ...createCustomStickerDto,
        lines: lines.map((line) => ({
          text: line.text,
          width: line.width,
          height: line.height,
          lineNumber: line.lineNumber,
          ratio: line.ratio,
        })),
        finalPrice,
      },
    });

    return { message: CustomStickerMessages.CreatedCustomStickerSuccess, customSticker };
  }

  async calculateStickerPrice(calculateStickerPriceDto: CalculateStickerPriceDto): Promise<{ message: string; pricing: number }> {
    const { lines, fontId, materialId } = calculateStickerPriceDto;

    const material = await this.materialStickerRepository.findOneOrThrow({ where: { id: materialId } });
    const font = await this.fontRepository.findOneOrThrow({ where: { id: fontId } });

    const pricing = calculateStickerTotalPrice({ font, material, lines });

    return { message: CustomStickerMessages.CalculatedStickerPriceSuccess, pricing };
  }

  async findAllByAdmin({ page, take, ...customStickerQueryDto }: CustomStickerQueryDto): Promise<OutputPagination<CustomSticker>> {
    const paginationDto = { page, take };

    const {
      endDate,
      sortBy,
      sortDirection,
      startDate,
      fontId,
      includeFont,
      includePreviewImage,
      includeUser,
      letterSpacing,
      materialId,
      style,
      weight,
    } = customStickerQueryDto;

    const filters: Prisma.CustomStickerWhereInput = {};

    if (fontId) filters.fontId = fontId;
    if (letterSpacing) filters.letterSpacing = letterSpacing;
    if (materialId) filters.materialId = materialId;
    if (style) filters.style = style;
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
    const { fontId, previewImageId, materialId, lines } = updateCustomStickerDto;

    const customSticker = await this.customStickerRepository.findOneOrThrow({ where: { id }, include: { font: true, material: true } });
    let font = customSticker['font'];
    let material = customSticker['material'];

    if (previewImageId) {
      const image = await this.galleryItemRepository.findOneOrThrow({ where: { id: previewImageId } });

      if (!allowedImageFormats.includes(image.mimetype))
        throw new BadRequestException(CustomStickerMessages.PreviewImageNotAImage.replaceAll('${formats}', allowedImageFormats.join(',')));
    }
    if (materialId) material = await this.materialStickerRepository.findOneOrThrow({ where: { id: materialId } });
    if (fontId) font = await this.fontRepository.findOneOrThrow({ where: { id: fontId } });

    const finalPrice = calculateStickerTotalPrice({
      font,
      material,
      lines: lines ? lines.map((line) => ({ width: line.width, height: line.height })) : undefined,
    });

    const updatedCustomSticker = await this.customStickerRepository.update({
      where: { id },
      data: {
        ...updateCustomStickerDto,
        finalPrice,
        lines: lines
          ? lines.map((line) => ({
              text: line.text,
              width: line.width,
              height: line.height,
              lineNumber: line.lineNumber,
              ratio: line.ratio,
            }))
          : undefined,
      },
    });

    return { message: CustomStickerMessages.UpdatedCustomStickerSuccess, customSticker: updatedCustomSticker };
  }

  async update(
    userId: number,
    id: number,
    updateCustomStickerDto: UpdateCustomStickerDto,
  ): Promise<{ message: string; customSticker: CustomSticker }> {
    const { fontId, previewImageId, materialId, lines } = updateCustomStickerDto;

    const customSticker = await this.customStickerRepository.findOneOrThrow({
      where: { id, userId },
      include: { font: true, material: true },
    });
    let font = customSticker['font'];
    let material = customSticker['material'];

    if (customSticker.status != 'PENDING') throw new BadRequestException(CustomStickerMessages.NotPendingCustomSticker);

    if (previewImageId) {
      const image = await this.galleryItemRepository.findOneOrThrow({ where: { id: previewImageId } });

      if (!allowedImageFormats.includes(image.mimetype))
        throw new BadRequestException(CustomStickerMessages.PreviewImageNotAImage.replaceAll('${formats}', allowedImageFormats.join(',')));
    }

    if (materialId) material = await this.materialStickerRepository.findOneOrThrow({ where: { id: materialId } });
    if (fontId) font = await this.fontRepository.findOneOrThrow({ where: { id: fontId } });

    const finalPrice = calculateStickerTotalPrice({
      font,
      material,
      lines: lines ? lines.map((line) => ({ width: line.width, height: line.height })) : undefined,
    });

    const updatedCustomSticker = await this.customStickerRepository.update({
      where: { id },
      data: {
        ...updateCustomStickerDto,
        finalPrice,
        lines: lines
          ? lines.map((line) => ({
              text: line.text,
              width: line.width,
              height: line.height,
              lineNumber: line.lineNumber,
              ratio: line.ratio,
            }))
          : undefined,
      },
    });

    return { message: CustomStickerMessages.UpdatedCustomStickerSuccess, customSticker: updatedCustomSticker };
  }

  async remove(userId: number, id: number): Promise<{ message: string; customSticker: CustomSticker }> {
    const customSticker = await this.customStickerRepository.findOneOrThrow({ where: { userId, id }, include: { orderItems: true } });

    const orderItem = customSticker['orderItems'] as OrderItem[];

    if (orderItem.find((item) => item.customStickerId === id))
      throw new BadRequestException(CustomStickerMessages.CannotRemoveCustomSticker);

    const removedCustomSticker = await this.customStickerRepository.delete({ where: { userId, id } });

    return { message: CustomStickerMessages.RemovedCustomStickerSuccess, customSticker: removedCustomSticker };
  }

  async removeByAdmin(id: number): Promise<{ message: string; customSticker: CustomSticker }> {
    await this.customStickerRepository.findOneOrThrow({ where: { id } });

    const removedCustomSticker = await this.customStickerRepository.delete({ where: { id } });

    return { message: CustomStickerMessages.RemovedCustomStickerSuccess, customSticker: removedCustomSticker };
  }
}
