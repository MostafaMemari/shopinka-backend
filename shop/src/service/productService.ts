'use server';

import { shopApiFetch } from '@/service/api';
import { revalidateTag } from 'next/cache';
import { Pager } from '@/types/pagerType';
import { Product, ProductParams } from '../types/productType';
import { ofetch } from 'ofetch';

// export const getProducts = unstable_cache(
//   async (params?: ProductParams): Promise<{ items: Product[]; pager: Pager }> => {
//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     const response = await ofetch(`/product`, {
//       baseURL: process.env.API_BASE_URL,
//       method: 'GET',
//       query: { ...params, includeMainImage: true },
//     });

//     return {
//       items: response.items,
//       pager: response.pager,
//     };
//   },
//   ['products'],
//   { tags: ['products'] },
// );

export const getProducts = async (params?: ProductParams): Promise<{ items: Product[]; pager: Pager }> => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log(params);

  const response = await ofetch(`/product`, {
    baseURL: process.env.API_BASE_URL,
    method: 'GET',
    query: { ...params, includeMainImage: true },
  });

  return {
    items: response.items,
    pager: response.pager,
  };
};

export async function refetchProducts() {
  revalidateTag('products');
}

export async function fetchProductBySlug(slug: string) {
  const res = await shopApiFetch(`/product/by-slug/${slug}`);

  return res;
}

export async function favoriteToggle(productId: number) {
  const res = await shopApiFetch(`/product/favorite-toggle/${productId}`, {
    method: 'PATCH',
  });

  if (res.status !== 200) throw new Error('Failed to toggle favorite');

  return res;
}

export async function isFavorite(productId: number) {
  const res = await shopApiFetch(`/product/${productId}/favorite`, {
    method: 'GET',
  });

  if (res.status !== 200) throw new Error('Failed to check favorite status');

  return res.data === 'true' ? true : false;
}
