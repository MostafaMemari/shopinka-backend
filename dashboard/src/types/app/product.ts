export enum ProductStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED'
}
export enum ProductType {
  SIMPLE = 'SIMPLE',
  VARIABLE = 'VARIABLE'
}

export type Product = {
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
}

export type ProductForm = {
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
  galleryImageIds: number[] | [] | null
  categoryIds: number[] | [] | null
  attributeIds: number[] | [] | null
  width: number | null
  height: number | null
  length: number | null
  weight: number | null
}
