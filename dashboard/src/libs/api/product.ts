import { Product, ProductForm } from '@/types/app/product'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getCategories = async (params?: Record<string, string>): Promise<Response<Product[]>> => {
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

export const updateProduct = async (id: string, data: Partial<ProductForm>): Promise<{ status: number; data: Product | null }> => {
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

export const createProduct = async (data: ProductForm): Promise<{ status: number; data: Product | null }> => {
  try {
    console.log(data)

    const res = await serverApiFetch('/product', {
      method: 'POST',
      body: { ...data }
    })

    console.log(res)

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

export const removeProduct = async (id: string): Promise<{ status: number; data: { message: string; product: ProductForm } | null }> => {
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
