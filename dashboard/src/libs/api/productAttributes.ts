import { Attribute } from '@/types/productAttributes'
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
