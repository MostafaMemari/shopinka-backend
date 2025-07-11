import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Banner, Prisma } from '@prisma/client';
import { BannerMessages } from './enums/banner-messages.enum';

@Injectable()
export class BannerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(args: Prisma.BannerCreateArgs): Promise<Banner> {
    return this.prismaService.banner.create(args);
  }

  findAll(args: Prisma.BannerFindManyArgs = {}): Promise<Banner[]> {
    return this.prismaService.banner.findMany(args);
  }

  findOne(args: Prisma.BannerFindFirstArgs): Promise<Banner | null> {
    return this.prismaService.banner.findFirst(args);
  }

  update(args: Prisma.BannerUpdateArgs): Promise<Banner> {
    return this.prismaService.banner.update(args);
  }

  delete(args: Prisma.BannerDeleteArgs): Promise<Banner> {
    return this.prismaService.banner.delete(args);
  }

  async findOneOrThrow(args: Prisma.BannerFindFirstArgs): Promise<Banner | never> {
    const banner = await this.findOne(args);

    if (!banner) throw new NotFoundException(BannerMessages.NotFoundBanner);

    return banner;
  }
}
