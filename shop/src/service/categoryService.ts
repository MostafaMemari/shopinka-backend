import { shopApiFetch } from '@/service/api';
import { Category, CategoryParams } from '../types/categoryType';
import { unstable_cache } from 'next/cache';
import { ofetch } from 'ofetch';
import { Pager } from '@/types/pagerType';

export async function getCategories(params?: CategoryParams) {
  const response = await shopApiFetch('/category', {
    query: { ...params },
  });

  console.log(response);

  return response.data;
}

// export async function getCategoriesCatch(params?: CategoryParams) {
//   const response = await shopApiFetch('/category', {
//     query: { ...params },
//   });

//   return response.data;
// }

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
