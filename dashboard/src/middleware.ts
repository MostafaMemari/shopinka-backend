import { COOKIE_NAMES } from '@/libs/constants'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value
  const refreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value
  const pathname = request.nextUrl.pathname

  if (pathname === '/login') {
    if (accessToken && refreshToken) {
      return NextResponse.redirect(new URL('/home', request.url))
    }

    return NextResponse.next()
  }

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
