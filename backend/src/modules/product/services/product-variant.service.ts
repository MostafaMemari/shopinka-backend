import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { CreateProductVariantDto } from "../dto/create-product-variant.dto";
import { ProductVariantRepository } from "../repositories/product-variant.repository";
import { ProductVariantMessages } from "../enums/product-variant-messages.enum";
import { ProductVariant } from "generated/prisma";
import { ProductRepository } from "../repositories/product.repository";
import { GalleryItemRepository } from "../../gallery/repositories/gallery-item.repository";

@Injectable()
export class ProductVariantService {
    constructor(
        private readonly productVariantRepository: ProductVariantRepository,
        private readonly productRepository: ProductRepository,
        private readonly galleryItemRepository: GalleryItemRepository,
    ) { }

    async create(userId: number, createProductVariantDto: CreateProductVariantDto): Promise<{ message: string, productVariant: ProductVariant }> {
        const { sku, mainImageId, productId, salePrice, basePrice } = createProductVariantDto

        if (salePrice > basePrice)
            throw new BadRequestException(ProductVariantMessages.SalePriceTooHigh)

        await this.galleryItemRepository.findOneOrThrow({ where: { id: mainImageId } })
        await this.productRepository.findOneOrThrow({ where: { id: productId } })

        const existingProductVariant = await this.productVariantRepository.findOne({ where: { sku } })

        if (existingProductVariant) throw new ConflictException(ProductVariantMessages.AlreadyExistsProductVariant)

        const newProductVariant = await this.productVariantRepository.create({
            data: { ...createProductVariantDto, userId },
            include: { mainImage: true, product: true }
        })

        return { message: ProductVariantMessages.CreatedProductVariantSuccess, productVariant: newProductVariant }
    }
}