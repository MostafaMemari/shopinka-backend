import CarouselProduct from "@/features/product/CarouselProduct";
import { specialOfferProducts } from "@/mock/productCarousels";

export default function SpecialOfferProducts() {
  return (
    <>
      <CarouselProduct
        title="پیشنهادات شگفت انگیز"
        viewAllLink="/shop"
        products={specialOfferProducts}
      />
    </>
  );
}
