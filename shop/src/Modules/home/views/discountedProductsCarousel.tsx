import { FC } from 'react';
import CarouselProduct from '@/Modules/product/components/ProductCarousel';
import { fetchDiscountedProducts } from '../../product/services/getProducts';

const DiscountedProductsCarousel: FC = async () => {
  const products = await fetchDiscountedProducts();

  return <CarouselProduct title="فروش ویژه" products={products.items} viewAllLink="/products" />;
};

export default DiscountedProductsCarousel;
