import { fetchProductBySlug } from '@/Modules/product/services/getProducts';
import ProductDetailsView from '@/Modules/productDetails/views/ProductDetailsView';
import React from 'react';

async function ProductDetails({ slug }: { slug: string }) {
  const product = await fetchProductBySlug(slug);

  return <ProductDetailsView product={product} />;
}

export default ProductDetails;
