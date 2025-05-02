import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { CreateProductVariantDto } from "../dto/create-product-variant.dto";
import { ProductVariantRepository } from "../repositories/product-variant.repository";
import { ProductVariantMessages } from "../enums/product-variant-messages.enum";
import { ProductVariant } from "generated/prisma";
import { ProductRepository } from "../repositories/product.repository";
import { GalleryItemRepository } from "../../gallery/repositories/gallery-item.repository";
import { AttributeRepository } from "../../attribute/repositories/attribute.repository";
import { UpdateProductVariantDto } from "../dto/update-product-variant.dto";

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

    async update(userId: number, productVariantId: number, updateProductVariantDto: UpdateProductVariantDto): Promise<{ message: string, productVariant: ProductVariant }> {
        const { attributeIds, salePrice, basePrice, sku, mainImageId, productId } = updateProductVariantDto

        if (productId) await this.productRepository.findOneOrThrow({ where: { id: productId } })

        const productVariant = await this.productVariantRepository.findOneOrThrow({ where: { id: productVariantId, userId } })

        if (salePrice && basePrice && salePrice > basePrice || salePrice && salePrice > productVariant.basePrice) {
            throw new BadRequestException(ProductVariantMessages.SalePriceTooHigh)
        }

        if (sku) {
            const existingProductVariant = await this.productVariantRepository.findOne({ where: { id: { not: productVariantId }, sku } })
            if (existingProductVariant) throw new ConflictException(ProductVariantMessages.AlreadyExistsProductVariant)
        }

        if (mainImageId) await this.galleryItemRepository.findOneOrThrow({ where: { id: mainImageId } })

        const attributes = attributeIds ? await this.attributeRepository.findAll({ where: { id: { in: attributeIds } } }) : undefined

        attributeIds && delete updateProductVariantDto.attributeIds

        const updatedProductVariant = await this.productVariantRepository.update({
            where: { id: productVariantId },
            data: {
                ...updateProductVariantDto,
                attributes: attributes ? { set: attributes.map(attribute => ({ id: attribute.id })) } : undefined
            },
            include: { attributes: true, mainImage: true, product: true }
        })


        return { message: ProductVariantMessages.UpdatedProductVariantSuccess, productVariant: updatedProductVariant }
    }
}