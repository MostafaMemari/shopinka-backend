'use server';

import { shopApiFetch } from '@/server/api';
import { revalidateTag, unstable_cache } from 'next/cache';
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
  const response = await shopApiFetch(`/product/by-slug/${slug}`);

  return response;
}

export async function favoriteToggle(productId: number) {
  const response = await shopApiFetch(`/product/favorite-toggle/${productId}`, {
    method: 'POST',
  });

  return response;
}
