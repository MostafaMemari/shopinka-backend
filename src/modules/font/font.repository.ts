import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Font, Prisma } from '@prisma/client';
import { FontMessages } from './enums/font-messages.enum';

@Injectable()
export class FontRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(args: Prisma.FontCreateArgs): Promise<Font> {
    return this.prismaService.font.create(args);
  }

  findAll(args: Prisma.FontFindManyArgs = {}): Promise<Font[]> {
    return this.prismaService.font.findMany(args);
  }

  findOne(args: Prisma.FontFindFirstArgs): Promise<Font | null> {
    return this.prismaService.font.findFirst(args);
  }

  update(args: Prisma.FontUpdateArgs): Promise<Font> {
    return this.prismaService.font.update(args);
  }

  delete(args: Prisma.FontDeleteArgs): Promise<Font> {
    return this.prismaService.font.delete(args);
  }

  async findOneOrThrow(args: Prisma.FontFindFirstArgs): Promise<Font | never> {
    const font = await this.findOne(args);

    if (!font) throw new NotFoundException(FontMessages.NotFoundFont);

    return font;
  }
}
