import { shopApiFetch } from '@/service/api';
import { Category, CategoryParams } from '../types/categoryType';
import { unstable_cache } from 'next/cache';
import { ofetch } from 'ofetch';
import { Pager } from '@/types/pagerType';

export async function getCategories(params?: CategoryParams) {
  const response = await shopApiFetch('/category', {
    query: { ...params },
  });

  return response.data;
}

export const getCategoryBySlug = unstable_cache(
  async (slug: string): Promise<Category | never> => {
    const response = await ofetch(`/category/by-slug/${slug}`, {
      baseURL: process.env.API_BASE_URL,
      method: 'GET',
    });

    return response as Category;
  },
  ['slug'],
  { tags: ['categories'] },
);

export const getCategoriesCatch = unstable_cache(
  async (params?: CategoryParams): Promise<{ items: Category[]; pager: Pager }> => {
    const response = await ofetch(`/category`, {
      baseURL: process.env.API_BASE_URL,
      method: 'GET',
      query: { ...params },
    });

    return {
      items: response.items,
      pager: response.pager,
    };
  },
  ['categories'],
  { tags: ['categories'] },
);
