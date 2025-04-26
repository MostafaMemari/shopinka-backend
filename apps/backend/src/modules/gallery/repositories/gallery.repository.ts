import { Gallery, Prisma } from "generated/prisma";
import { PrismaService } from "../../prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GalleryRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(args: Prisma.GalleryCreateArgs): Promise<Gallery> {
        return this.prismaService.gallery.create(args)
    }

    findOne(args: Prisma.GalleryFindFirstArgs): Promise<Gallery | never> {
        return this.prismaService.gallery.findFirst(args)
    }
}