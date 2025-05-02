const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const sendOtp = async (mobile: string) => {
  const response = await fetch(`${API_BASE_URL}/api/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile })
  })

  return response.json()
}

export const verifyOtp = async (mobile: string, otp: number) => {
  const response = await fetch('/api/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile, otp })
  })

  return response.json()
}
