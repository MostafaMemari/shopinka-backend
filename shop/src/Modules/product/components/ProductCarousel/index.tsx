'use client';

import React, { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { HiChevronLeft } from 'react-icons/hi';
import ProductCard from '@/modules/product/components/ProductCard';
import { productSwiperConfig } from '@/config/swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Product } from '../../types/productType';
import ProductCardSkeleton from '@/modules/shopPage/components/ProductCardSkeleton';

interface ProductCarouselProps {
  title: string;
  viewAllLink: string;
  viewAllText?: string;
  products: Product[];
}

const ProductCarousel: FC<ProductCarouselProps> = ({ title, viewAllLink, viewAllText = 'مشاهده همه', products }) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mountedProducts, setMountedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setMountedProducts(products);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [products]);

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance && mountedProducts.length > 0) {
      swiperInstance.update();
      swiperInstance.slideTo(0, 0);
    }
  }, [mountedProducts]);

  const renderSkeletons = () =>
    Array.from({ length: 4 }).map((_, index) => (
      <SwiperSlide key={`skeleton-${index}`}>
        <div className="h-full w-full flex items-stretch">
          <ProductCardSkeleton />
        </div>
      </SwiperSlide>
    ));

  if (!isLoading && mountedProducts.length === 0) {
    return (
      <section className="mb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium md:text-xl lg:text-2xl">{title}</h3>
            <Link
              href={viewAllLink}
              className="flex items-center gap-2 py-2 text-sm text-blue-600 hover:text-blue-800 transition-colors lg:text-base"
            >
              {viewAllText}
              <HiChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
            </Link>
          </div>
          <div className="relative overflow-hidden min-h-[200px] flex items-center justify-center">
            <span className="text-gray-500 text-lg">محصولی یافت نشد</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium md:text-xl lg:text-2xl">{title}</h3>
          <Link
            href={viewAllLink}
            className="flex items-center gap-2 py-2 text-sm text-blue-600 hover:text-blue-800 transition-colors lg:text-base"
            aria-label={`مشاهده همه ${title}`}
          >
            {viewAllText}
            <HiChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
          </Link>
        </div>

        <div className="relative overflow-hidden min-h-[200px]">
          <Swiper
            ref={swiperRef}
            slidesPerView={productSwiperConfig.slidesPerView}
            spaceBetween={productSwiperConfig.spaceBetween}
            breakpoints={productSwiperConfig.breakpoints}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            modules={[Navigation]}
            className="w-full"
            style={{ direction: 'rtl' }}
            wrapperClass="flex items-stretch"
            updateOnWindowResize
            observer
            observeParents
            slidesOffsetBefore={0}
            slidesOffsetAfter={0}
          >
            {isLoading
              ? renderSkeletons()
              : mountedProducts.map((product) => (
                  <SwiperSlide
                    key={product.id}
                    className="h-auto flex-none w-[171.333px] ml-[10px] transition-transform duration-300 ease-in-out
                  sm:w-[170px]
                  md:w-[171.19px]
                  lg:w-[194px]
                  xl:w-[213px]
                  2xl:w-[216px]"
                  >
                    <div className="h-full w-full flex items-stretch">
                      <ProductCard product={product} />
                    </div>
                  </SwiperSlide>
                ))}
            <div className="swiper-button-prev after:text-sm after:text-gray-600 absolute top-1/2 -left-4 z-10 transform -translate-y-1/2" />
            <div className="swiper-button-next after:text-sm after:text-gray-600 absolute top-1/2 -right-4 z-10 transform -translate-y-1/2" />
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
