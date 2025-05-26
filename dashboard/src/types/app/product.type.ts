import { Category } from './category.type'
import { GalleryItem } from './gallery.type'
import { Attribute } from './productAttributes.type'
import { Seo } from './seo.type'
import { Tag } from './tag.type'
import * as yup from 'yup'
import { productFormSchema } from '@/libs/validators/product.schema'

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
  name: string
  sku: string | null
  slug: string | null
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
  tagIds: number[] | []
  width: number | null
  height: number | null
  length: number | null
  weight: number | null
  defaultVariantId: number | null

  seoMeta: Seo | undefined
  mainImage: GalleryItem | undefined
  galleryImages: GalleryItem[] | undefined
  attributes: Attribute[] | undefined
  categories: Category[] | undefined
  tags: Tag[] | undefined
}
export type ProductForm = yup.InferType<typeof productFormSchema> & {
  defaultVariantId: number | null
}
