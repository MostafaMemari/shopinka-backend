import { Suspense } from 'react';
import BannerSlider from '@/components/Carousel/BannerSlider';
import { getProducts } from '@/modules/product/services/productService';
import CarouselProduct from '@/modules/product/components/ProductCarousel';

// Loading component for the banner
const BannerSkeleton = () => <div className="w-full h-[300px] bg-gray-200 rounded-lg animate-pulse" />;

// Loading component for product carousels
const CarouselSkeleton = () => (
  <section className="mb-8">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-4">
        <div className="h-8 w-1/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="h-[300px] bg-gray-200 rounded-lg animate-pulse" />
    </div>
  </section>
);

export default async function Home() {
  // Fetch data in parallel
  const [discountProducts, newestProducts] = await Promise.all([
    getProducts({ take: 14, hasDiscount: true }),
    getProducts({ take: 14, sortBy: 'newest' }),
  ]);

  return (
    <>
      <div className="fixed inset-x-0 top-1/3 mx-auto h-1/3 w-1/4 bg-primary/50 blur-[400px]" />

      <main className="grow bg-background pb-14 pt-22 lg:pt-36">
        <div className="w-full max-w-screen-xl mx-auto px-4">
          <Suspense fallback={<BannerSkeleton />}>
            <BannerSlider />
          </Suspense>
        </div>

        <Suspense fallback={<CarouselSkeleton />}>
          <CarouselProduct title="فروش ویژه" products={discountProducts.items} viewAllLink="/shop?hasDiscount=true" />
        </Suspense>

        <Suspense fallback={<CarouselSkeleton />}>
          <CarouselProduct title="جدیدترین محصولات" products={newestProducts.items} viewAllLink="/shop?sortBy=newest" />
        </Suspense>
      </main>
    </>
  );
}
