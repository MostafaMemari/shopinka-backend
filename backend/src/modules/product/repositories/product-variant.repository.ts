import { ProductVariant, Prisma } from 'generated/prisma';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductVariantMessages } from '../enums/product-variant-messages.enum';

@Injectable()
export class ProductVariantRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(args: Prisma.ProductVariantCreateArgs): Promise<ProductVariant> {
    return this.prismaService.productVariant.create(args);
  }

  findAll(args: Prisma.ProductVariantFindManyArgs = {}): Promise<ProductVariant[]> {
    return this.prismaService.productVariant.findMany(args);
  }

  findOne(args: Prisma.ProductVariantFindFirstArgs): Promise<ProductVariant | null> {
    return this.prismaService.productVariant.findFirst(args);
  }

  update(args: Prisma.ProductVariantUpdateArgs): Promise<ProductVariant> {
    return this.prismaService.productVariant.update(args);
  }

  delete(args: Prisma.ProductVariantDeleteArgs): Promise<ProductVariant> {
    return this.prismaService.productVariant.delete(args);
  }

  async findOneOrThrow(args: Prisma.ProductVariantFindFirstArgs): Promise<ProductVariant | never> {
    const ProductVariant = await this.findOne(args);

    if (!ProductVariant) throw new NotFoundException(ProductVariantMessages.NotFoundProductVariant);

    return ProductVariant;
  }
}
