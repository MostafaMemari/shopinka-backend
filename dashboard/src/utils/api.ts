'use server'

import { COOKIE_NAMES } from '@/libs/constants'
import { cookies } from 'next/headers'

export const serverApiFetch = async (path: string, options: RequestInit = {}) => {
  const cookieStore = await cookies()

  const token = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value || ''

  const res = await fetch(`${process.env.API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  })

  const data = await res.json()

  if (!res.ok) {
    // if (res.status === 401) {
    //   console.error('توکن نامعتبر است')
    // }
  }

  return {
    status: res.status,
    data
  }
}
