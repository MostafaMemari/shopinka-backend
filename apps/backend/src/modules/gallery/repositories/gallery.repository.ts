import { Gallery, Prisma } from "generated/prisma";
import { PrismaService } from "../../prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GalleryRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(args: Prisma.GalleryCreateArgs): Promise<Gallery> {
        return this.prismaService.gallery.create(args)
    }

    findOne(args: Prisma.GalleryFindFirstArgs): Promise<Gallery | never> {
        return this.prismaService.gallery.findFirst(args)
    }

    update(args: Prisma.GalleryUpdateArgs): Promise<Gallery> {
        return this.prismaService.gallery.update(args)
    }

    delete(args: Prisma.GalleryDeleteArgs): Promise<Gallery> {
        return this.prismaService.gallery.delete(args)
    }

    async findOneOrThrow(args: Prisma.GalleryFindFirstArgs): Promise<never | Gallery> {
        const gallery = await this.findOne(args)

        if (!gallery) throw new NotFoundException("Gallery not found")

        return gallery
    }
}