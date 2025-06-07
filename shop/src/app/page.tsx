import { Suspense } from 'react';
import BannerSlider from '@/shared/components/Carousel/BannerSlider';
import Header from '@/shared/components/header';
import Footer from '@/shared/components/footer';
import NewestProductsCarousel from '@/modules/home/views/newestProductsCarousel';
import DiscountedProductsCarousel from '@/modules/home/views/discountedProductsCarousel';
import HomeSkeleton from '@/components/HomeSkeleton';
import MobileLayout from '@/shared/components/MobileLayout';

export default function Home() {
  return (
    <>
      <MobileLayout />
      <Header />
      <div className="fixed inset-x-0 top-1/3 mx-auto h-1/3 w-1/4 bg-primary/50 blur-[400px]"></div>

      <main className="grow bg-background pb-14 pt-22 lg:pt-36">
        <Suspense fallback={<HomeSkeleton />}>
          <div className="w-full max-w-screen-xl mx-auto px-4">
            <BannerSlider />
          </div>

          <div className="w-full max-w-screen-xl mx-auto px-4 mt-8">
            <DiscountedProductsCarousel />
          </div>

          <div className="w-full max-w-screen-xl mx-auto px-4 mt-8">
            <NewestProductsCarousel />
          </div>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
