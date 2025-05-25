'use server';

import { ofetch } from 'ofetch';

export const shopApiFetch = async (
  path: string,
  options: {
    method?: 'GET' | 'POST';
    query?: Record<string, any>;
    body?: any;
    headers?: HeadersInit;
  } = {},
) => {
  try {
    const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;

    const data = await ofetch(path, {
      baseURL: process.env.API_BASE_URL,
      method: options.method || 'GET',
      query: options.query,
      body: isFormData ? options.body : options.body ? JSON.stringify(options.body) : undefined,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
      },
      retry: 0,
    });

    return {
      status: 200,
      data,
    };
  } catch (error: any) {
    const statusCode = error?.response?.status || 500;
    const message = error?.data?.message || error?.message || 'خطایی در ارتباط با سرور رخ داده است';

    if (process.env.NODE_ENV === 'development') {
      console.error('Shop API Error:', { error });
    }

    return {
      status: statusCode,
      data: { message },
    };
  }
};
