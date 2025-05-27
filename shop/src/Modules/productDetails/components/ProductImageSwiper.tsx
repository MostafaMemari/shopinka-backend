'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Image as ImageType } from '@/shared/types/imageType';

export default function ProductImageSwiper() {
  const { product, selectedVariant } = useSelector((state: RootState) => state.product);

  if (!product) return null;

  const mainImage = product.type === 'VARIABLE' && selectedVariant?.mainImage ? selectedVariant.mainImage : product.mainImage;

  const displayImages = mainImage ? [mainImage, ...product.galleryImages] : product.galleryImages;

  return (
    <div className="swiper product-image-mobile-swiper">
      <Swiper modules={[Pagination]} pagination={{ el: '.swiper-pagination' }} spaceBetween={0} slidesPerView={1} className="w-full">
        {displayImages?.length &&
          displayImages.map((image, index) => (
            <SwiperSlide key={index}>
              <Image src={image.fileUrl} alt={image?.title ?? product.name} width={500} height={500} className="mx-auto" loading="lazy" />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="swiper-pagination text-left"></div>
    </div>
  );
}
