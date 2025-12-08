import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMaterialStickerDto } from './dto/create-material-sticker.dto';
import { UpdateMaterialStickerDto } from './dto/update-material-sticker.dto';
import { MaterialStickerRepository } from './material-sticker.repository';
import { MaterialSticker, Prisma } from '@prisma/client';
import { MaterialStickerMessages } from './enums/material-sticker-messages.enum';
import { MaterialStickerQueryFilterDto } from './dto/material-sticker-query-filter.dto';
import { OutputPagination, pagination } from 'src/common/utils/pagination.utils';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MaterialStickerService {
  constructor(
    private readonly materialStickerRepository: MaterialStickerRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async create(createMaterialStickerDto: CreateMaterialStickerDto): Promise<{ message: string; materialSticker: MaterialSticker }> {
    const { name } = createMaterialStickerDto;

    const existingMaterial = await this.materialStickerRepository.findOne({ where: { name } });

    if (existingMaterial) throw new ConflictException(MaterialStickerMessages.ALreadyExistsMaterial);

    const newMaterial = await this.materialStickerRepository.create({ data: { ...createMaterialStickerDto } });

    return { message: MaterialStickerMessages.CreatedMaterialSuccess, materialSticker: newMaterial };
  }

  async findAll({ page, take, ...materialQueryDto }: MaterialStickerQueryFilterDto): Promise<OutputPagination<MaterialSticker>> {
    const paginationDto = { page, take };

    const { endDate, sortBy, sortDirection, startDate, name, backgroundFrom, backgroundTo, colorCode, pricePerCM, profitPercent, surface } =
      materialQueryDto;

    const filters: Prisma.MaterialStickerWhereInput = {};

    if (name) filters.name = { contains: name };
    if (backgroundFrom) filters.backgroundFrom = backgroundFrom;
    if (backgroundTo) filters.backgroundTo = backgroundTo;
    if (colorCode) filters.colorCode = colorCode;
    if (pricePerCM) filters.pricePerCM = pricePerCM;
    if (profitPercent) filters.profitPercent = profitPercent;
    if (surface) filters.surface = surface;

    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const materials = await this.materialStickerRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
    });

    return pagination(paginationDto, materials);
  }

  findOne(id: number): Promise<MaterialSticker> {
    return this.materialStickerRepository.findOneOrThrow({ where: { id } });
  }

  async update(
    id: number,
    updateMaterialStickerDto: UpdateMaterialStickerDto,
  ): Promise<{ message: string; materialSticker: MaterialSticker }> {
    const { name } = updateMaterialStickerDto;

    await this.materialStickerRepository.findOneOrThrow({ where: { id } });

    if (name) {
      const existingMaterial = await this.materialStickerRepository.findOne({ where: { name, id: { not: id } } });

      if (existingMaterial) throw new ConflictException(MaterialStickerMessages.ALreadyExistsMaterial);
    }

    const updatedMaterial = await this.materialStickerRepository.update({ where: { id }, data: { ...updateMaterialStickerDto } });

    return { message: MaterialStickerMessages.UpdatedMaterialSuccess, materialSticker: updatedMaterial };
  }

  async setDefault(id: number): Promise<{ message: string }> {
    const materialToSetDefault = await this.materialStickerRepository.findOneOrThrow({ where: { id } });
    if (materialToSetDefault.isDefault) return { message: MaterialStickerMessages.SetDefaultMaterialSuccess };

    const currentDefaultMaterial = await this.materialStickerRepository.findOne({ where: { isDefault: true } });

    await this.prismaService.$transaction(async (tx) => {
      if (currentDefaultMaterial) {
        await tx.materialSticker.update({
          where: { id: currentDefaultMaterial.id },
          data: { isDefault: false },
        });
      }
      await tx.materialSticker.update({
        where: { id: materialToSetDefault.id },
        data: { isDefault: true },
      });
    });
    return { message: MaterialStickerMessages.SetDefaultMaterialSuccess };
  }

  async reorder(fonts: { id: number; displayOrder: number }[]): Promise<{ message: string }> {
    if (!fonts || fonts.length === 0) return { message: MaterialStickerMessages.ReorderedMaterialsSuccess };

    await this.prismaService.$transaction(
      fonts.map((font) =>
        this.prismaService.materialSticker.update({
          where: { id: font.id },
          data: { displayOrder: font.displayOrder },
        }),
      ),
    );

    return { message: MaterialStickerMessages.ReorderedMaterialsSuccess };
  }

  async remove(id: number): Promise<{ message: string; materialSticker: MaterialSticker }> {
    await this.materialStickerRepository.findOneOrThrow({ where: { id } });

    const removedMaterialSticker = await this.materialStickerRepository.delete({ where: { id } });

    return { message: MaterialStickerMessages.RemovedMaterialSuccess, materialSticker: removedMaterialSticker };
  }
}
