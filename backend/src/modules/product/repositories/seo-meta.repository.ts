import { Injectable } from "@nestjs/common";
import { Prisma, SeoMeta } from "generated/prisma";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class SeoMetaRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(args: Prisma.SeoMetaCreateArgs): Promise<SeoMeta> {
        return this.prismaService.seoMeta.create(args)
    }

    findOne(args: Prisma.SeoMetaFindFirstArgs): Promise<SeoMeta> {
        return this.prismaService.seoMeta.findFirst(args)
    }

    update(args: Prisma.SeoMetaUpdateArgs): Promise<SeoMeta> {
        return this.prismaService.seoMeta.update(args)
    }
}