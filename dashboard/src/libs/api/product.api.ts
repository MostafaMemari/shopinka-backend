import { Product } from '@/types/app/product'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getProducts = async (params?: Record<string, string>): Promise<Response<Product[]>> => {
  try {
    const res = await serverApiFetch('/product', {
      method: 'GET',
      query: { ...params }
    })

    return {
      ...res
    }
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: {
        items: [],
        pager: {
          totalCount: 0,
          totalPages: 0,
          currentPage: 0,
          hasNextPage: false,
          hasPreviousPage: false
        }
      }
    }
  }
}

export const updateProduct = async (id: string, data: Partial<Product>): Promise<{ status: number; data: Product | null }> => {
  try {
    const res = await serverApiFetch(`/product/${id}`, {
      method: 'PATCH',
      body: { ...data }
    })

    return {
      ...res
    }
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: null
    }
  }
}

export const createProduct = async (data: Product): Promise<{ status: number; data: { product: (Product & { id: number }) | null } }> => {
  try {
    const res = await serverApiFetch('/product', {
      method: 'POST',
      body: { ...data }
    })

    return {
      ...res
    }
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: { product: null }
    }
  }
}

export const removeProduct = async (id: string): Promise<{ status: number; data: { message: string; product: Product } | null }> => {
  try {
    const res = await serverApiFetch(`/product/${id}`, { method: 'DELETE' })

    return {
      ...res
    }
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: error.message
    }
  }
}
