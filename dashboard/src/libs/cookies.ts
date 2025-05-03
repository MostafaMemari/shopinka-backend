'use server'

import 'server-only'

import { cookies } from 'next/headers'

export const setCookie = async (name: string, value: string, options: any = {}) => {
  const cookieStore = await cookies()

  const defaultOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    ...options
  }

  cookieStore.set(name, value, defaultOptions)
}
