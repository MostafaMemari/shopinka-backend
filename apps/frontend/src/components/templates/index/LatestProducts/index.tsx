import CarouselProduct from "@/components/ui/CarouselProduct";
import { latestProducts } from "@/mock/productCarousels";

export default function LatestProducts() {
  return <CarouselProduct title="جدیدترین محصولات" viewAllLink="/shop" products={latestProducts} />;
}
