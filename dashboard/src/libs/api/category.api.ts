import { Category, CategoryForm } from '@/types/app/category'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getCategories = async (params?: Record<string, string>): Promise<Response<Category[]>> => {
  try {
    const res = await serverApiFetch('/category', {
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

export const updateCategory = async (id: string, data: Partial<CategoryForm>): Promise<{ status: number; data: Category | null }> => {
  try {
    const res = await serverApiFetch(`/category/${id}`, {
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

export const createCategory = async (data: CategoryForm): Promise<{ status: number; data: Category | null }> => {
  try {
    const res = await serverApiFetch('/category', {
      method: 'POST',
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

export const removeCategory = async (id: string): Promise<{ status: number; data: { message: string; category: CategoryForm } | null }> => {
  try {
    const res = await serverApiFetch(`/category/${id}`, { method: 'DELETE' })

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
