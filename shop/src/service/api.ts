'use server';

import 'server-only';
import { ofetch } from 'ofetch';
import { cookies } from 'next/headers';
import { COOKIE_NAMES } from '@/types/constants';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  query?: Record<string, any>;
  body?: any;
  headers?: HeadersInit;
}

interface ApiResponse<T = any> {
  status: number;
  data: T;
}

async function setAuthCookies(accessToken: string, refreshToken?: string) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    path: '/',
    expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRE_TIME) * 1000),
  });

  if (refreshToken) {
    cookieStore.set(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      path: '/',
      expires: new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRE_TIME) * 1000),
    });
  }
}

async function refreshAccessToken(): Promise<ApiResponse> {
  try {
    const response = await ofetch('/auth/refresh-token', {
      baseURL: process.env.API_BASE_URL,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      retry: 0,
    });

    const { accessToken, refreshToken } = response;
    await setAuthCookies(accessToken, refreshToken);

    return { status: 200, data: { message: 'Token refreshed' } };
  } catch (error: any) {
    return {
      status: error?.response?.status ?? 401,
      data: { message: error?.data?.message ?? 'Failed to refresh token' },
    };
  }
}

async function doFetch(path: string, options: FetchOptions, token?: string): Promise<any> {
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;

  return ofetch(path, {
    baseURL: process.env.API_BASE_URL,
    method: options.method ?? 'GET',
    query: options.query,
    body: isFormData ? options.body : options.body ? JSON.stringify(options.body) : undefined,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    retry: 0,
  });
}

export const shopApiFetch = async (path: string, options: FetchOptions = {}): Promise<ApiResponse> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  try {
    const data = await doFetch(path, options, accessToken);
    return { status: 200, data };
  } catch (error: any) {
    const status = error?.response?.status ?? 500;
    const message = error?.data?.message ?? error?.message ?? 'خطایی در ارتباط با سرور رخ داده است';

    if (status !== 401) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Shop API Error:', { path, error });
      }
      return { status, data: { message } };
    }

    const refreshResult = await refreshAccessToken();
    if (refreshResult.status !== 200) {
      return refreshResult;
    }

    // Retry with new token
    const cookieStore = await cookies();
    const newAccessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
    try {
      const retryData = await doFetch(path, options, newAccessToken);
      return { status: 200, data: retryData };
    } catch (retryError: any) {
      return {
        status: retryError?.response?.status ?? 500,
        data: {
          message: retryError?.data?.message ?? retryError?.message ?? 'خطا در تلاش مجدد',
        },
      };
    }
  }
};
