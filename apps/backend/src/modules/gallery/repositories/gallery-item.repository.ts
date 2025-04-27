import { Injectable, NotFoundException } from "@nestjs/common";
import { GalleryItem, Prisma } from "generated/prisma";
import { PrismaService } from "../../../modules/prisma/prisma.service";

@Injectable()
export class GalleryItemRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(args: Prisma.GalleryItemCreateArgs): Promise<GalleryItem> {
        return this.prismaService.galleryItem.create(args)
    }

    createMany(args: Prisma.GalleryItemCreateManyAndReturnArgs): Promise<GalleryItem[]> {
        return this.prismaService.galleryItem.createManyAndReturn(args)
    }

    findOne(args: Prisma.GalleryItemFindFirstArgs): Promise<null | GalleryItem> {
        return this.prismaService.galleryItem.findFirst(args)
    }

    findAll(args: Prisma.GalleryItemFindManyArgs): Promise<GalleryItem[]> {
        return this.prismaService.galleryItem.findMany(args)
    }

    update(args: Prisma.GalleryItemUpdateArgs): Promise<GalleryItem> {
        return this.prismaService.galleryItem.update(args)
    }

    delete(args: Prisma.GalleryItemDeleteArgs): Promise<GalleryItem> {
        return this.prismaService.galleryItem.delete(args)
    }

    async findOneOrThrow(args: Prisma.GalleryItemFindFirstArgs): Promise<never | GalleryItem> {
        const galleryItem = await this.findOne(args)

        if (!galleryItem) throw new NotFoundException("Gallery item not found")

        return galleryItem
    }
}