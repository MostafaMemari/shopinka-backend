import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MaterialSticker, Prisma } from '@prisma/client';
import { MaterialStickerMessages } from './enums/material-sticker-messages.enum';

@Injectable()
export class MaterialStickerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(args: Prisma.MaterialStickerCreateArgs): Promise<MaterialSticker> {
    return this.prismaService.materialSticker.create(args);
  }

  findAll(args: Prisma.MaterialStickerFindManyArgs = {}): Promise<MaterialSticker[]> {
    return this.prismaService.materialSticker.findMany(args);
  }

  findOne(args: Prisma.MaterialStickerFindFirstArgs): Promise<MaterialSticker | null> {
    return this.prismaService.materialSticker.findFirst(args);
  }

  update(args: Prisma.MaterialStickerUpdateArgs): Promise<MaterialSticker> {
    return this.prismaService.materialSticker.update(args);
  }

  delete(args: Prisma.MaterialStickerDeleteArgs): Promise<MaterialSticker> {
    return this.prismaService.materialSticker.delete(args);
  }

  async findOneOrThrow(args: Prisma.MaterialStickerFindFirstArgs): Promise<MaterialSticker | never> {
    const materialSticker = await this.findOne(args);

    if (!materialSticker) throw new NotFoundException(MaterialStickerMessages.NotFoundMaterialSticker);

    return materialSticker;
  }
}
