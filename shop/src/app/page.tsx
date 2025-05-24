import { Suspense } from 'react';
import SkeletonLoader from '@/components/ProductLoader';
import BannerSlider from '@/components/Carousel/BannerSlider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import SpecialOfferProductsView from '@/Modules/indexPage/specialOfferProducts';

export default function Home() {
  return (
    <>
      <Header />
      <div className="fixed inset-x-0 top-1/3 mx-auto h-1/3 w-1/4 bg-primary/50 blur-[200px]"></div>

      <main className="grow bg-background pb-14 pt-36 xs:pt-36">
        <div className="w-full max-w-screen-xl mx-auto px-4">
          <Suspense>
            <BannerSlider />
          </Suspense>
        </div>

        <div className="w-full max-w-screen-xl mx-auto px-4 mt-8">
          <Suspense>
            <SpecialOfferProductsView />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}
