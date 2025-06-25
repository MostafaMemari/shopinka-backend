import { ShippingInfo, ShippingInfoForm } from '@/types/app/shippingInfo.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getShippings = async (params?: { page?: number; take?: number }): Promise<Response<ShippingInfo[]>> => {
  const res = await serverApiFetch('/shipping-info', { method: 'GET', query: { ...params } })

  return {
    ...res
  }
}

export const updateShippingInfo = async (id: string, data: Partial<ShippingInfoForm>): Promise<{ status: number; data: ShippingInfo | null }> => {
  const res = await serverApiFetch(`/shipping-info/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const addShippingInfo = async (data: ShippingInfoForm): Promise<{ status: number; data: ShippingInfo | null }> => {
  const res = await serverApiFetch('/shipping-info', {
    method: 'POST',
    body: { ...data, sentAt: new Date() }
  })

  return {
    ...res
  }
}
