'use server';

import { shopApiFetch } from '@/server/api';
import { User } from '../types/userType';
import { cookies } from 'next/headers';
import { COOKIE_NAMES } from '@/types/constants';
import { FavoriteResponse } from '@/types/favoriteType';

export const getMe = async (): Promise<{ status: number; data: User | null }> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  if (!accessToken) return { status: 401, data: null };

  const res = await shopApiFetch('/user/me', { method: 'GET' });

  return {
    ...res,
  };
};

export const getFavorites = async (params: { page: number; take: number }): Promise<FavoriteResponse> => {
  const res = await shopApiFetch('/user/favorites', { method: 'GET', query: { ...params } });

  return res.data;
};
