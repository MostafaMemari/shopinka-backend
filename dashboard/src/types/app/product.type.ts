import { Category } from './category.type'
import { GalleryItem } from './gallery'
import { Attribute } from './productAttributes.type'
import { ProductVariants } from './productVariant.type'
import { Seo } from './seo'

export enum ProductStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED'
}
export enum ProductType {
  SIMPLE = 'SIMPLE',
  VARIABLE = 'VARIABLE'
}

export type Product = {
  id: number
  sku: string
  name: string
  slug: string
  description: string | null
  shortDescription: string | null
  quantity: number | null
  basePrice: number | null
  salePrice: number | null
  status: ProductStatus | null
  type: ProductType | null
  mainImageId: number | null
  galleryImageIds: number[] | []
  categoryIds: number[] | []
  attributeIds: number[] | []
  width: number | null
  height: number | null
  length: number | null
  weight: number | null

  seoMeta: Seo | undefined
  mainImage: GalleryItem | undefined
  galleryImages: GalleryItem[] | undefined
  attributes: Attribute[] | undefined
  categories: Category[] | undefined
  variants: ProductVariants[] | undefined
}
