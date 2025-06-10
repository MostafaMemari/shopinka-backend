'use client';

import React, { FC, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { HiChevronLeft } from 'react-icons/hi';
import ProductCard from '@/modules/product/components/ProductCard';
import { productSwiperConfig } from '@/config/swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Product } from '../../types/productType';

interface ProductCarouselProps {
  title: string;
  viewAllLink: string;
  viewAllText?: string;
  products: Product[];
}

const ProductCarousel: FC<ProductCarouselProps> = ({ title, viewAllLink, viewAllText = 'مشاهده همه', products }) => {
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update();
    }
  }, [products]);

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

        {products.length > 0 ? (
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
            >
              {products.map((product) => (
                <SwiperSlide key={product.id} className="flex justify-center items-stretch">
                  <div className="w-full max-w-[300px]">
                    <ProductCard product={product} />
                  </div>
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
