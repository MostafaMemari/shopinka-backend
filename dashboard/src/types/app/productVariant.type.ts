import { type InferType } from 'yup'
import { productVariantSchema } from '@/libs/validators/productVariant.schema'
import { GalleryItem } from './gallery.type'
import { AttributeValue } from './productAttributes.type'

export type ProductVariant = {
  id?: number
  sku?: string
  mainImageId?: number | null
  shortDescription?: string | null
  quantity?: number | null
  basePrice?: number | null
  salePrice?: number | null
  width?: number | null
  height?: number | null
  length?: number | null
  weight?: number | null
  createdAt?: string
  updatedAt?: string

  userId?: number
  productId?: number
  mainImage: GalleryItem | undefined
  attributeValueIds?: number[] | null
  attributeValues?: AttributeValue[] | null
}

export type ProductVariantForm = InferType<typeof productVariantSchema>
