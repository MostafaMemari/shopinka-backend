'use server';

import 'server-only';
import { ofetch } from 'ofetch';
import { cookies } from 'next/headers';
import { COOKIE_NAMES } from '@/shared/types/constants';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  query?: Record<string, any>;
  body?: any;
  headers?: HeadersInit;
}

interface ApiResponse<T = any> {
  status: number;
  data: T;
}

// تابع کمکی برای ارسال درخواست refresh token
async function refreshAccessToken(): Promise<ApiResponse> {
  try {
    const response = await ofetch('/auth/refresh-token', {
      baseURL: process.env.API_BASE_URL,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      retry: 0,
    });

    const { accessToken, refreshToken } = response;
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

    return { status: 200, data: { message: 'Token refreshed' } };
  } catch (error: any) {
    const statusCode = error?.response?.status || 401;
    const message = error?.data?.message || 'Failed to refresh token';
    return { status: statusCode, data: { message } };
  }
}

export const shopApiFetch = async (path: string, options: FetchOptions = {}): Promise<ApiResponse> => {
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;

  try {
    const data = await ofetch(path, {
      baseURL: process.env.API_BASE_URL,
      method: options.method || 'GET',
      query: options.query,
      body: isFormData ? options.body : options.body ? JSON.stringify(options.body) : undefined,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
      },
      credentials: 'include', // ارسال کوکی‌ها با درخواست
      retry: 0,
    });

    return { status: 200, data };
  } catch (error: any) {
    const statusCode = error?.response?.status || 500;
    const message = error?.data?.message || error?.message || 'خطایی در ارتباط با سرور رخ داده است';

    if (statusCode === 401) {
      const refreshResult = await refreshAccessToken();
      if (refreshResult.status === 200) {
        // تلاش مجدد برای درخواست اصلی
        try {
          const retryData = await ofetch(path, {
            baseURL: process.env.API_BASE_URL,
            method: options.method || 'GET',
            query: options.query,
            body: isFormData ? options.body : options.body ? JSON.stringify(options.body) : undefined,
            headers: {
              ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
              ...options.headers,
            },
            credentials: 'include',
            retry: 0,
          });
          return { status: 200, data: retryData };
        } catch (retryError: any) {
          const retryStatus = retryError?.response?.status || 500;
          const retryMessage = retryError?.data?.message || retryError?.message || 'خطا در تلاش مجدد';
          return { status: retryStatus, data: { message: retryMessage } };
        }
      } else {
        // اگر refresh token ناموفق بود
        return { status: refreshResult.status, data: { message: refreshResult.data.message } };
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('Shop API Error:', { path, error });
    }

    return { status: statusCode, data: { message } };
  }
};
