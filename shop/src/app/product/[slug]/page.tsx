import { fetchProductBySlug } from '@/modules/product/services/productService';
import ProductDetailsView from '@/modules/productDetails/views/ProductDetailsView';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  return <ProductDetailsView product={product} />;
}
