// lib/auth.ts
import { COOKIE_NAMES } from '@/libs/constants'
import { cookies } from 'next/headers'

export async function getAccessToken() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value || ''

  return token
}
