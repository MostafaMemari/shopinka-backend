'use server'

import { ofetch } from 'ofetch'
import { getAccessToken } from '../getToken'
import { cookies } from 'next/headers'

import { COOKIE_NAMES } from '@/libs/constants'
import { cleanObject } from '../formatters'

export const serverApiFetch = async (
  path: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    body?: any
    query?: Record<string, any>
    headers?: HeadersInit
  } = {}
) => {
  let token: string

  try {
    token = await getAccessToken()
  } catch (tokenError) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Token Error:', tokenError)
    }

    return {
      status: 401,
      data: { message: 'خطا در دریافت توکن احراز هویت' }
    }
  }

  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData
  const cleanedQuery = options.query ? cleanObject(options.query) : {}

  try {
    const data = await ofetch(path, {
      baseURL: process.env.API_BASE_URL,
      method: options.method || 'GET',
      body: isFormData ? options.body : options.body ? JSON.stringify(options.body) : undefined,
      query: cleanedQuery,
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
    let statusCode = 500
    let message = 'خطای ناشناخته'
    let errorData = {}

    if (error?.response) {
      statusCode = error.response.status || 500
      errorData = error.data || {}
      message = error.data?.message || message
    } else if (error?.request) {
      message = 'خطای شبکه یا عدم دسترسی به سرور'
    } else {
      message = error.message || message
    }

    if (statusCode === 404 && message === 'User not found') {
      const cookieStore = await cookies()

      cookieStore.delete(COOKIE_NAMES.ACCESS_TOKEN)
      cookieStore.delete(COOKIE_NAMES.REFRESH_TOKEN)
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', { error, statusCode, message, errorData })
    }

    return {
      status: statusCode,
      data: {
        message,
        ...errorData
      }
    }
  }
}
