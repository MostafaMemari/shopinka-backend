import { Attribute, AttributeFormType, AttributeValueForm } from '@/types/app/productAttributes.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getAttributes = async (params?: Record<string, string>): Promise<Response<Attribute[]>> => {
  const res = await serverApiFetch('/attribute?includeValues=true', { method: 'GET', query: { ...params } })

  return {
    ...res
  }
}

export const getAttribute = async (id: number): Promise<{ status: number; data: Attribute | null }> => {
  const res = await serverApiFetch(`/attribute/${id}}`, { method: 'GET' })

  return {
    ...res
  }
}

export const removeAttribute = async (id: string): Promise<{ status: number; data: { message: string; attribute: Attribute } | null }> => {
  const res = await serverApiFetch(`/attribute/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}

export const updateAttribute = async (id: string, data: Partial<AttributeFormType>): Promise<{ status: number; data: Attribute | null }> => {
  const res = await serverApiFetch(`/attribute/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const createAttribute = async (data: AttributeFormType): Promise<{ status: number; data: Attribute | null }> => {
  const res = await serverApiFetch('/attribute', {
    method: 'POST',
    body: { ...data }
  })

  return {
    ...res
  }
}
