'use server';

import 'server-only';
import { cookies } from 'next/headers';
import { shopApiFetch } from '@/server/api';
import { COOKIE_NAMES } from '@/types/constants';

export const refreshToken = async (): Promise<{ status: number; data: any }> => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

  if (!refreshToken) {
    return { status: 401, data: { message: 'No refresh token' } };
  }

  const res = await shopApiFetch('/auth/refresh-token', {
    method: 'POST',
    body: { refreshToken },
  });

  if (res.status === 200 || res.status === 201) {
    const { accessToken, refreshToken: newRefreshToken } = res.data;
    cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      path: '/',
      expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRE_TIME) * 1000),
    });
    if (newRefreshToken) {
      cookieStore.set(COOKIE_NAMES.REFRESH_TOKEN, newRefreshToken, {
        httpOnly: true,
        path: '/',
        expires: new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRE_TIME) * 1000),
      });
    }
  }

  return { ...res };
};
