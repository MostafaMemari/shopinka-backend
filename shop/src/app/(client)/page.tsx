import BannerSlider from '@/components/Carousel/BannerSlider';
import NewestProductsCarousel from '@/modules/home/views/newestProductsCarousel';
import DiscountedProductsCarousel from '@/modules/home/views/discountedProductsCarousel';
import { getProducts } from '@/modules/product/services/productService';
import CarouselProduct from '@/modules/product/components/ProductCarousel';

export default async function Home() {
  const products = await getProducts({ take: 14, hasDiscount: true });

  return (
    <>
      <div className="fixed inset-x-0 top-1/3 mx-auto h-1/3 w-1/4 bg-primary/50 blur-[400px]"></div>

      <main className="grow bg-background pb-14 pt-22 lg:pt-36">
        {/* <Suspense fallback={<HomeSkeleton />}> */}
        <div className="w-full max-w-screen-xl mx-auto px-4">
          <BannerSlider />
        </div>
        <CarouselProduct title="فروش ویژه" products={products.items} viewAllLink="/shop?hasDiscount=true" />

        <DiscountedProductsCarousel />
        <NewestProductsCarousel />
        {/* </Suspense> */}
      </main>
    </>
  );
}
