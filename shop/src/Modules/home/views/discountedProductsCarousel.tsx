import { FC } from 'react';
import CarouselProduct from '@/components/product/ProductCarousel';
import { getProducts } from '@/server/productService';

const DiscountedProductsCarousel: FC = async () => {
  const products = await getProducts({ take: 14, hasDiscount: true });

  return <CarouselProduct title="فروش ویژه" products={products.items} viewAllLink="/shop?hasDiscount=true" />;
};

export default DiscountedProductsCarousel;
