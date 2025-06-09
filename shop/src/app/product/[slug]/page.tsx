import { fetchProductBySlug } from '@/modules/product/services/productService';
import ProductDetailsView from '@/modules/productDetails/views/ProductDetailsView';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = await fetchProductBySlug(slug);

  if (!product || product.status !== 200 || !product.data) {
    return notFound(); // این صفحه رو می‌فرسته به /404
  }

  return <ProductDetailsView product={product.data} />;
}
