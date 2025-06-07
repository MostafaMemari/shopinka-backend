'use server';

import { shopApiFetch } from '@/server/api';
import { revalidateTag, unstable_cache } from 'next/cache';
import { Pager } from '@/shared/types/pagerType';
import { Product, ProductParams } from '../types/productType';

export const getProducts = unstable_cache(
  async (params?: ProductParams): Promise<{ items: Product[]; pager: Pager }> => {
    const response = await shopApiFetch('/product', {
      query: { ...params, includeMainImage: true },
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return response.data;
  },
  ['products'],
  {
    tags: ['products'],
  },
);

export async function refetchProducts() {
  revalidateTag('products');
}

export async function fetchProductBySlug(slug: string) {
  const response = await shopApiFetch(`/product/by-slug/${slug}`);

  return response.data;
}
