'use server';

import { shopApiFetch } from '@/server/api';
import { ProductParams } from '../types/productType';

export async function getProducts(params: ProductParams) {
  const response = await shopApiFetch('/product', {
    query: { ...params, includeMainImage: true },
  });

  return response.data;
}

// export async function fetchNewestProducts() {
//   const response = await shopApiFetch('/product', {
//     query: {
//       includeMainImage: true,
//       sortBy: 'newest',
//     },
//   });

//   return response.data;
// }

// export async function fetchDiscountedProducts() {
//   const response = await shopApiFetch('/product', {
//     query: {
//       includeMainImage: true,
//       hasDiscount: true,
//     },
//   });

//   return response.data;
// }

export async function fetchProductBySlug(slug: string) {
  const response = await shopApiFetch(`/product/by-slug/${slug}`);

  return response.data;
}
