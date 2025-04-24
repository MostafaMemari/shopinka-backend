import CarouselProduct from "@/components/ui/CarouselProduct";
import { specialOfferProducts } from "@/mock/productCarousels";

export default function SpecialOfferProducts() {
  return (
    <>
      <CarouselProduct title="پیشنهادات شگفت انگیز" viewAllLink="/shop" products={specialOfferProducts} />
    </>
  );
}
