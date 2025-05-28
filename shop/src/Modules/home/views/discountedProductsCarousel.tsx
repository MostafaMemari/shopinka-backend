import { FC } from 'react';
import CarouselProduct from '@/Modules/product/components/ProductCarousel';
import { getProducts } from '@/Modules/product/services/getProducts';

const DiscountedProductsCarousel: FC = async () => {
  const products = await getProducts({ take: 14, hasDiscount: true });

  return <CarouselProduct title="فروش ویژه" products={products.items} viewAllLink="/products" />;
};

export default DiscountedProductsCarousel;
