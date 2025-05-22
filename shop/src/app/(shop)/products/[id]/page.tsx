import ProductDetails from '@/components/productDetails';
import { mockProductDetails } from '@/mock/productCarousels';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const product = {
    id: mockProductDetails.id,
    imageSrc: mockProductDetails.mainImage.src,
    title: mockProductDetails.title,
    productLink: `/products/${id}`,
    newPrice: mockProductDetails.newPrice,
    oldPrice: mockProductDetails.newPrice + mockProductDetails.discount,
    discount: mockProductDetails.discount,
  };

  return <ProductDetails product={product} />;
}
