'use server'

import { ofetch } from 'ofetch'
import { getAccessToken } from '../getToken'

export const serverApiFetch = async (
  path: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    body?: any
    query?: Record<string, any>
    headers?: HeadersInit
  } = {}
) => {
  const token = await getAccessToken()
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData

  try {
    const data = await ofetch(path, {
      baseURL: process.env.API_BASE_URL,
      method: options.method || 'GET',
      body: isFormData ? options.body : JSON.stringify(options.body),
      query: options.query,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers
      },
      retry: 0
    })

    return {
      status: 200,
      data
    }
  } catch (error: any) {
    const statusCode = error?.response?.status || error?.status || 500
    const message = error?.data?.message || 'خطای ناشناخته'

    // if (process.env.NODE_ENV === 'development') {
    //   console.error('API Error:', { statusCode, message, error })
    // }

    return {
      status: statusCode,
      data: {
        message,
        ...(error?.data || {})
      }
    }
  }
}
