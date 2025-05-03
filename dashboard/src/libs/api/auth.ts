'use server'

import 'server-only'
import { cookies } from 'next/headers'
import { COOKIE_NAMES } from '../constants'

const API_BASE_URL = process.env.API_BASE_URL

export const sendOtp = async (mobile: string): Promise<{ status: number; data: any }> => {
  const response = await fetch(`${API_BASE_URL}/auth/authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile })
  })

  const data = await response.json()

  return {
    status: response.status,
    data
  }
}

export const verifyOtp = async (mobile: string, otp: string): Promise<{ status: number; data: any }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-authenticate-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile, otp })
    })

    const data = await response.json()

    console.log('API Response:', data)

    if (response.status === 200 || response.status === 201) {
      const { accessToken, refreshToken } = data

      if (!accessToken || !refreshToken) throw new Error('Missing tokens in API response')

      const cookieStore = await cookies()

      cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, accessToken, { httpOnly: true, path: '/', expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRE_TIME) * 1000) })
      cookieStore.set(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, { httpOnly: true, path: '/', expires: new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRE_TIME) * 1000) })
    }

    return {
      status: response.status,
      data
    }
  } catch (error: any) {
    console.error('Verify OTP Error:', error.message)
    throw new Error(error.message || 'Failed to verify OTP')
  }
}
