import { AttributeValueForm, AttributeValue } from '@/types/app/productAttributes.type'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const removeAttributeValue = async (id: string): Promise<{ status: number; data: { message: string; attribute: AttributeValue } | null }> => {
  const res = await serverApiFetch(`/attribute-value/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}

export const updateAttributeValues = async (id: string, data: Partial<AttributeValueForm>): Promise<{ status: number; data: AttributeValue | null }> => {
  const res = await serverApiFetch(`/attribute-value/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const createAttributeValues = async (data: Omit<AttributeValueForm, 'id'>): Promise<{ status: number; data: AttributeValue | null }> => {
  const res = await serverApiFetch('/attribute-value', {
    method: 'POST',
    body: { ...data }
  })

  return {
    ...res
  }
}
