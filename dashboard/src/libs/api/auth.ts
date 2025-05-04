'use server'

import 'server-only'
import { cookies } from 'next/headers'
import { COOKIE_NAMES } from '../constants'
import { serverApiFetch } from '@/utils/api'

export const sendOtp = async (mobile: string): Promise<{ status: number; data: any }> => {
  try {
    const res = await serverApiFetch('/auth/authenticate', {
      method: 'POST',
      body: JSON.stringify({ mobile })
    })

    return {
      ...res
    }
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: { message: error.message || 'Failed to send OTP' }
    }
  }
}

interface VerifyOtpResponse {
  accessToken: string
  refreshToken: string
}

export const verifyOtp = async (mobile: string, otp: string): Promise<{ status: number; data: VerifyOtpResponse | { message: string } }> => {
  try {
    const res = await serverApiFetch('/auth/verify-authenticate-otp', {
      method: 'POST',
      body: JSON.stringify({ mobile, otp })
    })

    if (res?.status === 201 && res?.data?.accessToken && res?.data?.refreshToken) {
      const { accessToken, refreshToken }: VerifyOtpResponse = res.data

      const cookieStore = await cookies()

      cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
        httpOnly: true,
        path: '/',
        expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRE_TIME) * 1000)
      })

      cookieStore.set(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
        path: '/',
        expires: new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRE_TIME) * 1000)
      })

      return {
        ...res
      }
    } else {
      throw new Error('Missing accessToken or refreshToken in API response')
    }
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: { message: error.message || 'Failed to verify OTP' }
    }
  }
}

export const logout = async (): Promise<{ status: number; data: any }> => {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value

    const data = await serverApiFetch('/auth/signout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken })
    })

    cookieStore.delete(COOKIE_NAMES.ACCESS_TOKEN)
    cookieStore.delete(COOKIE_NAMES.REFRESH_TOKEN)

    return {
      ...data
    }
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: { message: error.message || 'Logout failed' }
    }
  }
}
