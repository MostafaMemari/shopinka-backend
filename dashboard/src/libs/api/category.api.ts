import { Category, CategoryForm } from '@/types/app/category.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getCategories = async (params?: Record<string, string>): Promise<Response<Category[]>> => {
  const res = await serverApiFetch('/category', {
    method: 'GET',
    query: { ...params }
  })

  return {
    ...res
  }
}

export const updateCategory = async (id: string, data: Partial<CategoryForm>): Promise<{ status: number; data: Category | null }> => {
  const res = await serverApiFetch(`/category/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const createCategory = async (data: CategoryForm): Promise<{ status: number; data: Category | null }> => {
  const res = await serverApiFetch('/category', {
    method: 'POST',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const removeCategory = async (id: string): Promise<{ status: number; data: { message: string; category: CategoryForm } | null }> => {
  const res = await serverApiFetch(`/category/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}
