'use client';

import { Suspense } from 'react';
import BannerSlider from '@/components/Carousel/BannerSlider';
import CarouselProduct from '@/components/product/ProductCarousel';
import Loader from '@/components/skeleton/Loader';
import { Product } from '@/types/productType';

interface ClientWrapperProps {
  discountProducts: Product[];
  newestProducts: Product[];
}

export default function ClientWrapper({ discountProducts, newestProducts }: ClientWrapperProps) {
  return (
    <>
      <div className="fixed inset-x-0 top-1/3 mx-auto h-1/3 w-1/4 bg-primary/50 blur-[400px]" />
      <main className="grow bg-background pb-14 pt-22 lg:pt-36">
        <div className="w-full max-w-screen-xl mx-auto px-4">
          <Suspense fallback={<Loader />}>
            <BannerSlider />
          </Suspense>
          <Suspense fallback={<Loader />}>
            <CarouselProduct title="فروش ویژه" products={discountProducts} viewAllLink="/shop?hasDiscount=true" />
            <CarouselProduct title="جدیدترین محصولات" products={newestProducts} viewAllLink="/shop?sortBy=newest" />
          </Suspense>
        </div>
      </main>
    </>
  );
}
