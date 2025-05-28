import { FC } from 'react';
import CarouselProduct from '@/Modules/product/components/ProductCarousel';
import { getProducts } from '@/Modules/product/services/productService';

const NewestProductsCarousel: FC = async () => {
  const products = await getProducts({ take: 14, sortBy: 'newest' });

  return <CarouselProduct title="جدیدترین محصولات" products={products.items} viewAllLink="/products" />;
};

export default NewestProductsCarousel;
