import { fetchProductBySlug, getProducts } from '@/service/productService';
import ProductDetailsView from '@/components/features/productDetails/views/ProductDetailsView';
import { notFound } from 'next/navigation';
import ProductTabs from '@/components/features/product/ProductTabs';
import MobileHeader from '@/components/features/productDetails/MobileProductHeader';
import CarouselProduct from '@/components/features/product/ProductCarousel';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await fetchProductBySlug(slug);
  const product = res?.data;

  if (!product || res.status !== 200) return notFound();

  const lastCategory = product.categories?.[product.categories.length - 1];
  const categoryIds = lastCategory ? [lastCategory.id] : [];

  const discountProducts = await getProducts({ take: 14, categoryIds });

  return (
    <>
      <MobileHeader productId={product.id} />
      <ProductDetailsView product={product} />
      <CarouselProduct title="محصولات مرتبط" products={discountProducts.items} viewAllLink={`/shop?categoryIds=${categoryIds.join(',')}`} />
      <ProductTabs description={product?.description} specifications={product?.properties} productId={product.id} />
    </>
  );
}
