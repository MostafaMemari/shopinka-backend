import { Attribute, Prisma } from "generated/prisma";
import { PrismaService } from "../../prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class AttributeRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(args: Prisma.AttributeCreateArgs): Promise<Attribute> {
        return this.prismaService.attribute.create(args);
    }

    findAll(args: Prisma.AttributeFindManyArgs = {}): Promise<Attribute[]> {
        return this.prismaService.attribute.findMany(args)
    }

    findOne(args: Prisma.AttributeFindFirstArgs): Promise<Attribute | null> {
        return this.prismaService.attribute.findFirst(args)
    }

    update(args: Prisma.AttributeUpdateArgs): Promise<Attribute> {
        return this.prismaService.attribute.update(args)
    }

    delete(args: Prisma.AttributeDeleteArgs): Promise<Attribute> {
        return this.prismaService.attribute.delete(args)
    }

    async findOneOrThrow(args: Prisma.AttributeFindFirstArgs): Promise<Attribute | never> {
        const Attribute = await this.findOne(args)

        if (!Attribute) throw new NotFoundException("Not found attribute.")

        return Attribute
    }
}