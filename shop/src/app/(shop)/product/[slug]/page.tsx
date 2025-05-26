import { Suspense } from 'react';
import ProductDetails from '@/Modules/productDetails/components';
import { fetchProductBySlug } from '@/Modules/product/services/getProducts';
import Loading from './loading';

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const { slug } = params;

  return (
    <Suspense fallback={<Loading />}>
      <ProductDetailsWrapper slug={slug} />
    </Suspense>
  );
}

async function ProductDetailsWrapper({ slug }: { slug: string }) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const product = await fetchProductBySlug(slug);

  if (!product) {
    throw new Error('Product not found');
  }

  return <ProductDetails product={product} />;
}
