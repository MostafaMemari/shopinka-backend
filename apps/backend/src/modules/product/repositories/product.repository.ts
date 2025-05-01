import { Product, Prisma } from "generated/prisma";
import { PrismaService } from "../../prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ProductRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(args: Prisma.ProductCreateArgs): Promise<Product> {
        return this.prismaService.product.create(args);
    }

    findAll(args: Prisma.ProductFindManyArgs = {}): Promise<Product[]> {
        return this.prismaService.product.findMany(args)
    }

    findOne(args: Prisma.ProductFindFirstArgs): Promise<Product | null> {
        return this.prismaService.product.findFirst(args)
    }

    update(args: Prisma.ProductUpdateArgs): Promise<Product> {
        return this.prismaService.product.update(args)
    }

    delete(args: Prisma.ProductDeleteArgs): Promise<Product> {
        return this.prismaService.product.delete(args)
    }

    async findOneOrThrow(args: Prisma.ProductFindFirstArgs): Promise<Product | never> {
        const Product = await this.findOne(args)

        if (!Product) throw new NotFoundException("Not found product.")

        return Product
    }
}