import ProductDetails from '@/Modules/productDetails/components';
import { fetchProductBySlug } from '@/Modules/product/services/getProducts';

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const product = await fetchProductBySlug(params.slug);
  return <ProductDetails product={product} />;
}
