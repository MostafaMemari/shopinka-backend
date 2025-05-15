import { AttributeValues } from './productAttributes.type'

export type ProductVariants = {
  id?: number
  sku?: string
  mainImageId?: number | null
  productId?: number
  orderId?: number | null
  userId?: number
  description?: string | null
  quantity?: number | null
  basePrice?: number | null
  salePrice?: number | null
  width?: number | null
  height?: number | null
  length?: number | null
  weight?: number | null
  createdAt?: string
  updatedAt?: string

  attributeValueIds?: number[] | null
  attributeValues?: AttributeValues[] | null
}
