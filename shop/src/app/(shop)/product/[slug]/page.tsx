import { Suspense } from 'react';
import ProductDetails from './ProductDetails';
import ProductLoader from '@/components/ProductLoader';

type Props = {
  params: { slug: string };
};

function ProductDetailsWrapper({ params }: Props) {
  const { slug } = params;

  return (
    <Suspense fallback={<ProductLoader />}>
      <ProductDetails key={slug} slug={slug} />
    </Suspense>
  );
}

export default ProductDetailsWrapper;
