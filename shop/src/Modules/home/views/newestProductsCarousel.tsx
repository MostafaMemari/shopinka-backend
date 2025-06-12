import { FC } from 'react';
import CarouselProduct from '@/components/product/ProductCarousel';
import { getProducts } from '@/server/productService';

const NewestProductsCarousel: FC = async () => {
  const products = await getProducts({ take: 14, sortBy: 'newest' });

  return <CarouselProduct title="جدیدترین محصولات" products={products.items} viewAllLink="/shop?sortBy=newest" />;
};

export default NewestProductsCarousel;
