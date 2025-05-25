import { FC } from 'react';
import CarouselProduct from '@/Modules/product/components/ProductCarousel';
import { fetchNewestProducts } from '../../product/services/getProducts';

const NewestProductsCarousel: FC = async () => {
  const products = await fetchNewestProducts();

  return <CarouselProduct title="جدیدترین محصولات" products={products.items} viewAllLink="/products" />;
};

export default NewestProductsCarousel;
