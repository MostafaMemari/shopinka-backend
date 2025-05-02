interface ApiResponse {
  success: boolean
  message: string
  data?: any
}

interface ApiError extends Error {
  message: string
  status?: number
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com'

export const sendOtp = async (mobile: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/authenticate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile })
    })

    const data = await response.json()

    if (!response.ok) {
      const error: ApiError = new Error(data.message || 'ارسال کد تأیید ناموفق بود')
      error.status = response.status
      throw error
    }

    return data
  } catch (error: any) {
    const apiError: ApiError = new Error(error.message || 'خطایی در ارتباط با سرور رخ داد')
    apiError.status = error.status || 500
    throw apiError
  }
}

export const verifyOtp = async (mobile: string, otp: number): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-authenticate-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile, otp })
    })

    const data = await response.json()

    if (!response.ok) {
      const error: ApiError = new Error(data.message || 'تأیید کد ناموفق بود')
      error.status = response.status
      throw error
    }

    return data
  } catch (error: any) {
    const apiError: ApiError = new Error(error.message || 'خطایی در ارتباط با سرور رخ داد')
    apiError.status = error.status || 500
    throw apiError
  }
}
