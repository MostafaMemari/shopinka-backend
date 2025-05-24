import { FC } from 'react';
import CarouselProduct from '@/components/Carousel/CarouselProduct';
import { fetchSpecialOfferProducts } from '../products/services/getProducts';

const SpecialOfferProductsView: FC = async () => {
  //   await new Promise((resolve) => setTimeout(resolve, 3000));

  const products = await fetchSpecialOfferProducts();

  return <CarouselProduct title="پیشنهادات شگفت انگیز" products={products} viewAllLink="/products" />;
};

export default SpecialOfferProductsView;
