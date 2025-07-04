import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE_NAMES } from './types/constants';
import { getMe } from './service/userService';

async function isAuthenticated() {
  const res = await getMe();
  return res.status === 200;
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;
  const pathname = request.nextUrl.pathname;

  const isLoggedIn = !!accessToken && !!refreshToken;

  if (pathname.startsWith('/login')) {
    if (isLoggedIn && (await isAuthenticated())) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/profile') || pathname === '/checkout/shipping') {
    if (!isLoggedIn || !(await isAuthenticated())) {
      const redirectTo = pathname === '/checkout/shipping' ? `/login?backUrl=${encodeURIComponent(pathname)}` : '/';
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/profile/:path*'],
};
