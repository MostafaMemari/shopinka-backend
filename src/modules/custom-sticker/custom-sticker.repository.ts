import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CustomSticker, Prisma } from '@prisma/client';
import { CustomStickerMessages } from './enums/custom-sticker-messages.enum';

@Injectable()
export class CustomStickerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(args: Prisma.CustomStickerCreateArgs): Promise<CustomSticker> {
    return this.prismaService.customSticker.create(args);
  }

  findAll(args: Prisma.CustomStickerFindManyArgs = {}): Promise<CustomSticker[]> {
    return this.prismaService.customSticker.findMany(args);
  }

  findOne(args: Prisma.CustomStickerFindFirstArgs): Promise<CustomSticker | null> {
    return this.prismaService.customSticker.findFirst(args);
  }

  update(args: Prisma.CustomStickerUpdateArgs): Promise<CustomSticker> {
    return this.prismaService.customSticker.update(args);
  }

  delete(args: Prisma.CustomStickerDeleteArgs): Promise<CustomSticker> {
    return this.prismaService.customSticker.delete(args);
  }

  async findOneOrThrow(args: Prisma.CustomStickerFindFirstArgs): Promise<CustomSticker | never> {
    const customSticker = await this.findOne(args);

    if (!customSticker) throw new NotFoundException(CustomStickerMessages.NotFoundCustomSticker);

    return customSticker;
  }
}
