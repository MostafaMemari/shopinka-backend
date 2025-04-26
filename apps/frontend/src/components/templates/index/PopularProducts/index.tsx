import CarouselProduct from "@/features/product/CarouselProduct";
import { popularProducts } from "@/mock/productCarousels";

export default function PopularProducts() {
  return (
    <>
      <CarouselProduct title="محبوب ترین محصولات" viewAllLink="/shop" products={popularProducts} />
    </>
  );
}
