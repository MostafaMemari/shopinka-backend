import { ofetch } from 'ofetch'
import Cookies from 'js-cookie'
import { COOKIE_NAMES } from '@/libs/constants'

export const clientApiFetch = async (
  path: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    body?: any
    query?: Record<string, any>
    headers?: HeadersInit
  } = {}
) => {
  const token = Cookies.get(COOKIE_NAMES.ACCESS_TOKEN) || ''

  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData

  try {
    const data = await ofetch(path, {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      method: options.method || 'GET',
      body: isFormData ? options.body : options.body,
      query: options.query,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers
      }
    })

    return { status: 200, data }
  } catch (error: any) {
    return {
      status: error?.response?.status || 500,
      data: error?.data || { message: 'خطای ناشناخته در کلاینت' }
    }
  }
}
