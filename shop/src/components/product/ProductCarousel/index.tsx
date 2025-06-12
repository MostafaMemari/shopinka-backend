'use client';

import React, { FC, useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { HiChevronLeft } from 'react-icons/hi';
import { productSwiperConfig } from '@/config/swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Product } from '@/types/productType';
import ProductCard from '../ProductCard';

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse relative overflow-hidden">
      <div className="flex space-x-4 rtl:space-x-reverse" style={{ gap: `${10}px` }}>
        {[...Array(6)].map((_, index) => (
          <div key={index} className="w-64 h-96 bg-gray-200 rounded-lg p-4 flex-shrink-0">
            <div className="w-full h-40 bg-gray-300 rounded-md mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
      <div className="absolute top-1/2 -left-4 z-10 -translate-y-1/2 w-8 h-8 bg-gray-200 rounded-full"></div>
      <div className="absolute top-1/2 -right-4 z-10 -translate-y-1/2 w-8 h-8 bg-gray-200 rounded-full"></div>
    </div>
  );
};

interface ProductCarouselProps {
  title: string;
  viewAllLink: string;
  viewAllText?: string;
  products: Product[];
}

const ProductCarousel: FC<ProductCarouselProps> = ({ title, viewAllLink, viewAllText = 'مشاهده همه', products }) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [isSwiperInitialized, setIsSwiperInitialized] = useState(false);

  return (
    <section className="mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium md:text-xl lg:text-2xl">{title}</h3>
          <Link
            href={viewAllLink}
            className="flex items-center gap-2 py-2 text-sm text-primary hover:text-blue-800 transition-colors lg:text-base"
          >
            {viewAllText}
            <HiChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
          </Link>
        </div>

        {products && products.length > 0 ? (
          <div className="relative overflow-hidden">
            {!isSwiperInitialized && <SkeletonLoader />}
            <Swiper
              ref={swiperRef}
              slidesPerView={productSwiperConfig.slidesPerView}
              spaceBetween={productSwiperConfig.spaceBetween}
              breakpoints={productSwiperConfig.breakpoints}
              className="product-carousel"
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              modules={[Navigation]}
              style={{ direction: 'rtl' }}
              onInit={() => setIsSwiperInitialized(true)}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
              <div className="swiper-button-prev absolute top-1/2 -left-4 z-10 -translate-y-1/2 after:text-sm after:text-gray-600" />
              <div className="swiper-button-next absolute top-1/2 -right-4 z-10 -translate-y-1/2 after:text-sm after:text-gray-600" />
            </Swiper>
          </div>
        ) : (
          <div className="text-center">هیچ محصولی یافت نشد</div>
        )}
      </div>
    </section>
  );
};

export default ProductCarousel;
