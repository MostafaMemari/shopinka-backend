import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Category, Prisma } from "generated/prisma";
import { CategoryMessages } from "./enums/category-messages.enum";

@Injectable()
export class CategoryRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(args: Prisma.CategoryCreateArgs): Promise<Category> {
        return this.prismaService.category.create(args);
    }

    findAll(args: Prisma.CategoryFindManyArgs = {}): Promise<Category[]> {
        return this.prismaService.category.findMany(args)
    }

    findOne(args: Prisma.CategoryFindFirstArgs): Promise<Category | null> {
        return this.prismaService.category.findFirst(args)
    }

    update(args: Prisma.CategoryUpdateArgs): Promise<Category> {
        return this.prismaService.category.update(args)
    }

    delete(args: Prisma.CategoryDeleteArgs): Promise<Category> {
        return this.prismaService.category.delete(args)
    }

    async findOneOrThrow(args: Prisma.CategoryFindFirstArgs): Promise<Category | never> {
        const category = await this.findOne(args)

        if (!category) throw new NotFoundException(CategoryMessages.NotFoundCategory)

        return category
    }
}