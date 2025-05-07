'use server'

import { cookies } from 'next/headers'
import { COOKIE_NAMES } from '@/libs/constants'
import { ofetch } from 'ofetch'

export const serverApiFetch = async (
  path: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    body?: any
    query?: Record<string, any>
    headers?: HeadersInit
  } = {}
) => {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value || ''

  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData

  try {
    const data = await ofetch(path, {
      baseURL: process.env.API_BASE_URL,
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
      data: error?.data || { message: 'خطای ناشناخته' }
    }
  }
}
