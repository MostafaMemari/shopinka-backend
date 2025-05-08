import { AttributeValueForm, AttributeValues } from '@/types/productAttributes'
import { serverApiFetch } from '@/utils/api'

export const removeAttributeValue = async (id: string): Promise<{ status: number; data: { message: string; attribute: AttributeValues } | null }> => {
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

export const updateAttributeValues = async (id: string, data: Partial<AttributeValueForm>): Promise<{ status: number; data: AttributeValues | null }> => {
  try {
    const res = await serverApiFetch(`/attribute-value/${id}`, {
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

export const createAttributeValues = async (data: Omit<AttributeValueForm, 'id'>): Promise<{ status: number; data: AttributeValues | null }> => {
  try {
    const res = await serverApiFetch('/attribute-value', {
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
