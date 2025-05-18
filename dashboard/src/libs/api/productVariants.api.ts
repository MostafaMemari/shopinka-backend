import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'
import { ProductVariantForm, ProductVariant } from '@/types/app/productVariant.type'

export const getProductVariants = async (params?: Record<string, string>): Promise<Response<ProductVariant[]>> => {
  const res = await serverApiFetch('/product-variant', {
    method: 'GET',
    query: { ...params }
  })

  return { ...res }
}

export const getProductVariantById = async (id: number): Promise<{ status: number; data: ProductVariant | null }> => {
  const res = await serverApiFetch(`/product-variant/${id}`, {
    method: 'GET'
  })

  return { ...res }
}

export const updateProductVariant = async (id: number, data: Partial<ProductVariantForm>): Promise<{ status: number; data: ProductVariant | null }> => {
  const res = await serverApiFetch(`/product-variant/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return { ...res }
}

export const createProductVariant = async (productId: number, data: ProductVariantForm): Promise<{ status: number; data: { product: ProductVariant | null } }> => {
  const res = await serverApiFetch('/product-variant', {
    method: 'POST',
    body: { ...data, productId }
  })

  return { ...res }
}

export const removeProductVariant = async (id: string): Promise<{ status: number; data: { message: string; product: ProductVariant } | null }> => {
  const res = await serverApiFetch(`/product-variant/${id}`, { method: 'DELETE' })

  return { ...res }
}
