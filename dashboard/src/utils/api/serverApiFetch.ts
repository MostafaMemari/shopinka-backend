'use server'

import 'server-only'
import { ofetch } from 'ofetch'
import { cookies } from 'next/headers'
import { COOKIE_NAMES } from '@/libs/constants'

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  query?: Record<string, any>
  body?: any
  headers?: HeadersInit
}

interface ApiResponse<T = any> {
  status: number
  data: T
}

async function refreshAccessToken(): Promise<ApiResponse> {
  const cookieStore = await cookies()

  try {
    const response = await ofetch('/auth/refresh-token', {
      baseURL: process.env.API_BASE_URL,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        refreshToken: cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value
      },
      retry: 0
    })

    const { accessToken, refreshToken } = response

    cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      path: '/',
      expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRE_TIME) * 1000)
    })

    if (refreshToken) {
      cookieStore.set(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
        path: '/',
        expires: new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRE_TIME) * 1000)
      })
    }

    return { status: 200, data: { message: 'Token refreshed' } }
  } catch (error: any) {
    const statusCode = error?.response?.status || 401
    const message = error?.data?.message || 'Failed to refresh token'

    return { status: statusCode, data: { message } }
  }
}

export const serverApiFetch = async (path: string, options: FetchOptions = {}): Promise<ApiResponse> => {
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value

  const defaultHeaders: HeadersInit = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...options.headers
  }

  try {
    const data = await ofetch(path, {
      baseURL: process.env.API_BASE_URL,
      method: options.method || 'GET',
      query: options.query,
      body: isFormData ? options.body : options.body ? JSON.stringify(options.body) : undefined,
      headers: defaultHeaders,
      retry: 0
    })

    return { status: 200, data }
  } catch (error: any) {
    const statusCode = error?.response?.status || 500
    const message = error?.data?.message || error?.message || 'خطایی در ارتباط با سرور رخ داده است'

    if (statusCode === 401) {
      const refreshResult = await refreshAccessToken()

      if (refreshResult.status === 200) {
        const cookieStore = await cookies()
        const newAccessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value

        try {
          const retryData = await ofetch(path, {
            baseURL: process.env.API_BASE_URL,
            method: options.method || 'GET',
            query: options.query,
            body: isFormData ? options.body : options.body ? JSON.stringify(options.body) : undefined,
            headers: {
              ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
              ...(newAccessToken ? { Authorization: `Bearer ${newAccessToken}` } : {}),
              ...options.headers
            },
            retry: 0
          })

          return { status: 200, data: retryData }
        } catch (retryError: any) {
          const retryStatus = retryError?.response?.status || 500
          const retryMessage = retryError?.data?.message || retryError?.message || 'خطا در تلاش مجدد'

          return { status: retryStatus, data: { message: retryMessage } }
        }
      } else {
        return { status: refreshResult.status, data: { message: refreshResult.data.message } }
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('Shop API Error:', { path, error })
    }

    return { status: statusCode, data: { message } }
  }
}
