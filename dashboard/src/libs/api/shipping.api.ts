import { Shipping, ShippingForm } from '@/types/app/shipping.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getShippings = async (params?: Record<string, string>): Promise<Response<Shipping[]>> => {
  const res = await serverApiFetch('/shipping', { method: 'GET', query: { ...params } })

  return {
    ...res
  }
}

export const getShipping = async (id: number): Promise<{ status: number; data: ShippingForm | null }> => {
  const res = await serverApiFetch(`/shipping/${id}}`, { method: 'DELETE' })

  return {
    ...res
  }
}

export const removeShipping = async (id: string): Promise<{ status: number; data: { message: string; attribute: ShippingForm } | null }> => {
  const res = await serverApiFetch(`/shipping/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}

export const updateShipping = async (id: string, data: Partial<ShippingForm>): Promise<{ status: number; data: ShippingForm | null }> => {
  const res = await serverApiFetch(`/shipping/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const createShipping = async (data: Omit<ShippingForm, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<{ status: number; data: ShippingForm | null }> => {
  const res = await serverApiFetch('/shipping', {
    method: 'POST',
    body: { ...data }
  })

  return {
    ...res
  }
}
