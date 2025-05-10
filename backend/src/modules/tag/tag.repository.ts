import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Tag, Prisma } from "generated/prisma";
import { TagMessages } from "./enums/tag-messages.enum";

@Injectable()
export class TagRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(args: Prisma.TagCreateArgs): Promise<Tag> {
        return this.prismaService.tag.create(args);
    }

    findAll(args: Prisma.TagFindManyArgs = {}): Promise<Tag[]> {
        return this.prismaService.tag.findMany(args)
    }

    findOne(args: Prisma.TagFindFirstArgs): Promise<Tag | null> {
        return this.prismaService.tag.findFirst(args)
    }

    update(args: Prisma.TagUpdateArgs): Promise<Tag> {
        return this.prismaService.tag.update(args)
    }

    delete(args: Prisma.TagDeleteArgs): Promise<Tag> {
        return this.prismaService.tag.delete(args)
    }

    async findOneOrThrow(args: Prisma.TagFindFirstArgs): Promise<Tag | never> {
        const tag = await this.findOne(args)

        if (!tag) throw new NotFoundException(TagMessages.NotFoundTag)

        return tag
    }
}