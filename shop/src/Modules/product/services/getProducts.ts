'use server';

import { shopApiFetch } from '@/server/api';

export async function fetchNewestProducts() {
  const response = await shopApiFetch('/product', {
    query: {
      includeMainImage: true,
      sortBy: 'newest',
    },
  });

  return response.data;
}

export async function fetchDiscountedProducts() {
  const response = await shopApiFetch('/product', {
    query: {
      includeMainImage: true,
      hasDiscount: true,
    },
  });

  return response.data;
}

export async function fetchProductBySlug(slug: string) {
  const response = await shopApiFetch(`/product/by-slug/${slug}`);

  return response.data;
}
