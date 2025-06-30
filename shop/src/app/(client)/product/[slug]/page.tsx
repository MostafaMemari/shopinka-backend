import { fetchProductBySlug, getProducts } from '@/service/productService';
import ProductDetailsView from '@/components/features/productDetails/views/ProductDetailsView';
import { notFound } from 'next/navigation';
import ProductTabs from '@/components/features/product/ProductTabs';
import MobileHeader from '@/components/features/productDetails/MobileProductHeader';
import CarouselProduct from '@/components/features/product/ProductCarousel';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product || product.status !== 200 || !product.data) {
    return notFound();
  }
  const lastCategory = product.data.categories?.[product.data.categories.length - 1];
  const categoryIds = lastCategory ? [lastCategory.id] : [];

  const discountProducts = await getProducts({ take: 14, categoryIds });

  return (
    <>
      <MobileHeader productId={product.data.id} />
      <ProductDetailsView product={product.data} />
      <CarouselProduct title="محصولات مرتبط" products={discountProducts.items} viewAllLink={`/shop?categoryIds=${categoryIds.join(',')}`} />
      <ProductTabs description={product.data?.description} specifications={product.data?.properties} productId={product.data.id} />
    </>
  );
}
