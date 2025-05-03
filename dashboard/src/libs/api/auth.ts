'use server'

import 'server-only'

interface ApiResponse {
  message: string
  statusCode: number
  error: string
  data?: any
}

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

export const verifyOtp = async (mobile: string, otp: number): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/verify-authenticate-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile, otp })
  })

  return await response.json()
}
