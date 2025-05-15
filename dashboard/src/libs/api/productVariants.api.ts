import { ProductVariants } from '@/types/app/productVariant.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getProductVariants = async (params?: Record<string, string>): Promise<Response<ProductVariants[]>> => {
  const res = await serverApiFetch('/product', {
    method: 'GET',
    query: { ...params }
  })

  return { ...res }
}

export const getProductVariantsById = async (id: number): Promise<{ status: number; data: ProductVariants | null }> => {
  const res = await serverApiFetch(`/product-variant${id}`, {
    method: 'GET'
  })

  return { ...res }
}

export const updateProductVariants = async (id: number, data: Partial<ProductVariants>): Promise<{ status: number; data: ProductVariants | null }> => {
  console.log(data)

  const res = await serverApiFetch(`/product-variant${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return { ...res }
}

export const createProductVariants = async (data: ProductVariants): Promise<{ status: number; data: { product: (ProductVariants & { id: number }) | null } }> => {
  console.log(data)

  const res = await serverApiFetch('/product-variant', {
    method: 'POST',
    body: { ...data }
  })

  console.log(res)

  return { ...res }
}

export const removeProductVariants = async (id: string): Promise<{ status: number; data: { message: string; product: ProductVariants } | null }> => {
  const res = await serverApiFetch(`/product-variant${id}`, { method: 'DELETE' })

  return { ...res }
}
