import { Suspense } from 'react';
import BannerSlider from '@/components/Carousel/BannerSlider';
import { getProducts } from '@/modules/product/services/productService';
import CarouselProduct from '@/modules/product/components/ProductCarousel';

// Loading component for the banner
const BannerSkeleton = () => <div className="w-full h-[300px] bg-gray-200 rounded-lg animate-pulse" />;

export default async function Home() {
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

        <Suspense fallback={<div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse mt-8" />}>
          <CarouselProduct title="فروش ویژه" products={discountProducts.items} viewAllLink="/shop?hasDiscount=true" />
        </Suspense>
        <Suspense fallback={<div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse mt-8" />}>
          <CarouselProduct title="جدیدترین محصولات" products={newestProducts.items} viewAllLink="/shop?sortBy=newest" />
        </Suspense>
      </main>
    </>
  );
}
