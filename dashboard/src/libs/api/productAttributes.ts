import { Attribute, AttributeFormValues } from '@/types/productAttributes'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api'

export const getAttributes = async (): Promise<Response<Attribute[]>> => {
  try {
    const res = await serverApiFetch('/attribute', { method: 'GET' })

    return {
      ...res
    }
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: { items: [], pager: { totalCount: 0, totalPages: 0, currentPage: 0, hasNextPage: false, hasPreviousPage: false } }
    }
  }
}

export const getAttribute = async (id: number): Promise<{ status: number; data: Attribute | null }> => {
  try {
    const res = await serverApiFetch(`/attribute/${id}}`, { method: 'REMOVE' })

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

export const removeAttribute = async (id: string): Promise<{ status: number; data: { message: string; attribute: Attribute } | null }> => {
  try {
    const res = await serverApiFetch(`/attribute/${id}`, { method: 'DELETE' })

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

export const updateAttribute = async (id: string, data: Partial<AttributeFormValues>): Promise<{ status: number; data: Attribute | null }> => {
  try {
    const res = await serverApiFetch(`/attribute/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
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

export const createAttribute = async (data: Omit<Attribute, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<{ status: number; data: Attribute | null }> => {
  try {
    const res = await serverApiFetch('/attribute', {
      method: 'POST',
      body: JSON.stringify(data)
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
