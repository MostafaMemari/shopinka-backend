import { Injectable, NotFoundException } from '@nestjs/common';
import { GalleryItem, Prisma } from '@prisma/client';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { GalleryItemMessages } from '../enums/gallery-item-messages.enum';

@Injectable()
export class GalleryItemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(args: Prisma.GalleryItemCreateArgs): Promise<GalleryItem> {
    return this.prismaService.galleryItem.create(args);
  }

  createMany(args: Prisma.GalleryItemCreateManyArgs): Promise<Prisma.BatchPayload> {
    return this.prismaService.galleryItem.createMany(args);
  }

  findOne(args: Prisma.GalleryItemFindFirstArgs): Promise<null | GalleryItem> {
    return this.prismaService.galleryItem.findFirst(args);
  }

  findAll(args: Prisma.GalleryItemFindManyArgs): Promise<GalleryItem[]> {
    return this.prismaService.galleryItem.findMany(args);
  }

  update(args: Prisma.GalleryItemUpdateArgs): Promise<GalleryItem> {
    return this.prismaService.galleryItem.update(args);
  }

  updateMany(args: Prisma.GalleryItemUpdateManyArgs): Promise<Prisma.BatchPayload> {
    return this.prismaService.galleryItem.updateMany(args);
  }

  delete(args: Prisma.GalleryItemDeleteArgs): Promise<GalleryItem> {
    return this.prismaService.galleryItem.delete(args);
  }

  deleteMany(args: Prisma.GalleryItemDeleteManyArgs): Promise<{ count: number }> {
    return this.prismaService.galleryItem.deleteMany(args);
  }

  async findOneOrThrow(args: Prisma.GalleryItemFindFirstArgs): Promise<never | GalleryItem> {
    const galleryItem = await this.findOne(args);

    if (!galleryItem) throw new NotFoundException(GalleryItemMessages.NotFoundGalleryItem);

    return galleryItem;
  }
}
