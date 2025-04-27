import { Injectable } from "@nestjs/common";
import { GalleryItem, Prisma } from "generated/prisma";
import { PrismaService } from "../../../modules/prisma/prisma.service";

@Injectable()
export class GalleryItemRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(args: Prisma.GalleryItemCreateArgs): Promise<GalleryItem> {
        return this.prismaService.galleryItem.create(args)
    }
}