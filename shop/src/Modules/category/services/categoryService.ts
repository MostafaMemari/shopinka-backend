import { shopApiFetch } from '@/server/api';
import { CategoryParams } from '../types/categoryType';

export async function getCategories(params?: CategoryParams) {
  const response = await shopApiFetch('/category', {
    query: { ...params },
  });

  return response.data;
}
