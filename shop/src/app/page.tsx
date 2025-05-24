import { Suspense } from 'react';
import CategoryBanners from '@/components/CategoryBanners';
import CategoryCircles from '@/components/CategoryCircles';
import SkeletonLoader from '@/components/SkeletonLoader';
import BannerSlider from '@/components/Carousel/BannerSlider';
import CarouselProduct from '@/components/Carousel/CarouselProduct';
import CarouselBlog from '@/components/Carousel/CarouselBlog';
import Header from '@/components/header';
import Footer from '@/components/footer';

// توابع fetch برای دریافت داده‌ها
async function fetchSpecialOfferProducts() {
  const response = await fetch('http://localhost:3600/api/v1/product?includeMainImage=true', {});
  if (!response.ok) throw new Error('خطا در دریافت پیشنهادات شگفت‌انگیز');
  return response.json();
}

export default async function Home() {
  const specialOfferProducts = await fetchSpecialOfferProducts();

  return (
    <>
      <Header />
      <div className="fixed inset-x-0 top-1/3 mx-auto h-1/3 w-1/4 bg-primary/50 blur-[200px]"></div>
      <main className="grow bg-background pb-14 pt-36 xs:pt-36">
        <Suspense fallback={<SkeletonLoader count={1} className="h-64" />}>
          <BannerSlider />
        </Suspense>
        <Suspense fallback={<CarouselProduct title="پیشنهادات شگفت انگیز" products={[]} viewAllLink="/" loading={true} />}>
          <CarouselProduct title="پیشنهادات شگفت انگیز" products={specialOfferProducts.items} viewAllLink="/" />
        </Suspense>

        <Suspense fallback={<CarouselProduct title="جدیدترین محصولات" products={[]} viewAllLink="/" loading={true} />}>
          <CarouselProduct title="جدیدترین محصولات" products={specialOfferProducts.items} viewAllLink="/" />
        </Suspense>
        <Suspense fallback={<SkeletonLoader count={2} className="grid-cols-1 md:grid-cols-2" />}>
          <CategoryBanners />
        </Suspense>
        <Suspense fallback={<SkeletonLoader count={6} className="grid-cols-3 md:grid-cols-6" />}>
          <CategoryCircles />
        </Suspense>
        <Suspense fallback={<SkeletonLoader count={4} />}>
          <CarouselProduct title="پرفروش‌ترین محصولات" products={specialOfferProducts.items} viewAllLink="/" />
        </Suspense>
        {/* <Suspense fallback={<SkeletonLoader count={3} />}>
          <CarouselBlog sectionTitle="آخرین وبلاگ‌ها" blogs={specialOfferProducts.items} viewAllLink="/" />
        </Suspense> */}
      </main>
      <Footer />
    </>
  );
}
