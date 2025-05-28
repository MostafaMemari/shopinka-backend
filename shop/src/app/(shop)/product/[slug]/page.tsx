import { fetchProductBySlug } from '@/Modules/product/services/getProducts';
import ProductDetailsView from '@/Modules/productDetails/views/ProductDetailsView';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  return <ProductDetailsView product={product} />;
}
