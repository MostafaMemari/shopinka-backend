import { fetchProductBySlug } from '@/service/productService';
import ProductDetailsView from '@/components/productDetails/views/ProductDetailsView';
import { notFound } from 'next/navigation';
import ProductTabs from '@/components/product/ProductTabs';
import MobileHeader from '@/components/productDetails/MobileProductHeader';
import { Suspense } from 'react';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product || product.status !== 200 || !product.data) {
    return notFound();
  }

  return (
    <>
      <MobileHeader productId={product.data.id} />
      <ProductDetailsView product={product.data} />
      <ProductTabs description={product.data?.description} specifications={product.data?.properties} productId={product.data.id} />
    </>
  );
}
