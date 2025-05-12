import { AttributeValueForm, AttributeValues } from '@/types/productAttributes'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const removeAttributeValue = async (id: string): Promise<{ status: number; data: { message: string; attribute: AttributeValues } | null }> => {
  const res = await serverApiFetch(`/attribute-value/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}

export const updateAttributeValues = async (id: string, data: Partial<AttributeValueForm>): Promise<{ status: number; data: AttributeValues | null }> => {
  const res = await serverApiFetch(`/attribute-value/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const createAttributeValues = async (data: Omit<AttributeValueForm, 'id'>): Promise<{ status: number; data: AttributeValues | null }> => {
  const res = await serverApiFetch('/attribute-value', {
    method: 'POST',
    body: { ...data }
  })

  return {
    ...res
  }
}
