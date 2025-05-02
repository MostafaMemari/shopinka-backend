import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { CreateProductVariantDto } from "../dto/create-product-variant.dto";
import { ProductVariantRepository } from "../repositories/product-variant.repository";
import { ProductVariantMessages } from "../enums/product-variant-messages.enum";
import { ProductVariant } from "generated/prisma";
import { ProductRepository } from "../repositories/product.repository";
import { GalleryItemRepository } from "../../gallery/repositories/gallery-item.repository";
import { AttributeRepository } from "../../attribute/repositories/attribute.repository";

@Injectable()
export class ProductVariantService {
    constructor(
        private readonly productVariantRepository: ProductVariantRepository,
        private readonly productRepository: ProductRepository,
        private readonly galleryItemRepository: GalleryItemRepository,
        private readonly attributeRepository: AttributeRepository,
    ) { }

    async create(userId: number, createProductVariantDto: CreateProductVariantDto): Promise<{ message: string, productVariant: ProductVariant }> {
        const { sku, mainImageId, productId, salePrice, basePrice, attributeIds } = createProductVariantDto

        if (salePrice > basePrice)
            throw new BadRequestException(ProductVariantMessages.SalePriceTooHigh)

        await this.galleryItemRepository.findOneOrThrow({ where: { id: mainImageId } })
        await this.productRepository.findOneOrThrow({ where: { id: productId } })

        const existingProductVariant = await this.productVariantRepository.findOne({ where: { sku } })

        if (existingProductVariant) throw new ConflictException(ProductVariantMessages.AlreadyExistsProductVariant)

        const attributes = attributeIds ? await this.attributeRepository.findAll({ where: { id: { in: attributeIds } } }) : []

        attributeIds && delete createProductVariantDto.attributeIds

        const newProductVariant = await this.productVariantRepository.create({
            data: {
                ...createProductVariantDto, userId,
                attributes: { connect: attributes.map(attribute => ({ id: attribute.id })) }
            },
            include: { mainImage: true, product: true, attributes: true }
        })

        return { message: ProductVariantMessages.CreatedProductVariantSuccess, productVariant: newProductVariant }
    }

    findOne(id: number): Promise<ProductVariant> {
        return this.productVariantRepository.findOneOrThrow({ where: { id }, include: { mainImage: true, user: true, attributes: true, product: true } })
    }
}