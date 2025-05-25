import ProductDetails from '@/Modules/product/components/productDetails';
import { fetchProductBySlug } from '@/Modules/product/services/getProducts';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const product = await fetchProductBySlug(slug);

  return <ProductDetails product={product} />;
}
