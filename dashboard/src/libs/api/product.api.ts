import { Product } from '@/types/app/product.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getProducts = async (params?: Record<string, string>): Promise<Response<Product[]>> => {
  const res = await serverApiFetch('/product', {
    method: 'GET',
    query: { ...params }
  })

  return {
    ...res
  }
}

export const getProductById = async (id: number): Promise<{ status: number; data: Product | null }> => {
  const res = await serverApiFetch(`/product/${id}`, {
    method: 'GET'
  })

  return {
    ...res
  }
}

export const updateProduct = async (id: number, data: Partial<Product>): Promise<{ status: number; data: Product | null }> => {
  console.log(data)

  const res = await serverApiFetch(`/product/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const createProduct = async (data: Product): Promise<{ status: number; data: { product: (Product & { id: number }) | null } }> => {
  const res = await serverApiFetch('/product', {
    method: 'POST',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const removeProduct = async (id: string): Promise<{ status: number; data: { message: string; product: Product } | null }> => {
  const res = await serverApiFetch(`/product/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}
