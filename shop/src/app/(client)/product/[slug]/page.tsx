import { fetchProductBySlug } from '@/server/productService';
import ProductDetailsView from '@/components/productDetails/views/ProductDetailsView';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product || product.status !== 200 || !product.data) {
    return notFound();
  }

  return <ProductDetailsView product={product.data} />;
}
