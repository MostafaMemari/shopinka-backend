import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE_NAMES } from './types/constants';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;
  const pathname = request.nextUrl.pathname;

  if (pathname === '/login') {
    if (accessToken && refreshToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith('/profile')) {
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  if (pathname === '/checkout/shipping') {
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL('/login?backUrl=/checkout/shipping', request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/profile/:path*'],
};
