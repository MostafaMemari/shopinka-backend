import type { AttributeValueFormValues } from '@/types/productAttributes'
import { serverApiFetch } from '@/utils/api'

export const removeAttributeValues = async (id: string): Promise<{ status: number; data: { message: string; attribute: AttributeValueFormValues } | null }> => {
  try {
    const res = await serverApiFetch(`/attribute-value/${id}`, { method: 'DELETE' })

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

export const updateAttributeValues = async (id: string, data: Partial<AttributeValueFormValues>): Promise<{ status: number; data: AttributeValueFormValues | null }> => {
  try {
    const res = await serverApiFetch(`/attribute-value/${id}`, {
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

export const createAttributeValues = async (data: Omit<AttributeValueFormValues, 'id'>): Promise<{ status: number; data: AttributeValueFormValues | null }> => {
  try {
    const res = await serverApiFetch('/attribute-value', {
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
