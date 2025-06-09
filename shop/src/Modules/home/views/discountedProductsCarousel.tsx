import { FC } from 'react';
import CarouselProduct from '@/modules/product/components/ProductCarousel';
import { getProducts } from '@/modules/product/services/productService';

const DiscountedProductsCarousel: FC = async () => {
  const products = await getProducts({ take: 14, hasDiscount: true });

  return <CarouselProduct title="فروش ویژه" products={products.items} viewAllLink="/shop?hasDiscount=true" />;
};

export default DiscountedProductsCarousel;
