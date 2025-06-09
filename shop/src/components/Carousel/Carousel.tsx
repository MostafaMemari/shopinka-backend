'use client';

import { FC, ReactNode, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

interface CarouselProps {
  items: ReactNode[];
  slidesPerView?: number;
  spaceBetween?: number;
  breakpoints?: Record<number, { slidesPerView: number; spaceBetween: number }>;
  navigation?: boolean;
  freeMode?: boolean;
  className?: string;
}

const Carousel: FC<CarouselProps> = ({
  items,
  slidesPerView = 1,
  spaceBetween = 10,
  breakpoints,
  navigation = true,
  freeMode = false,
  className = '',
}) => {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    // اطمینان از مقداردهی مجدد Swiper پس از لود کامل محتوا
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.update();
    }
  }, [items]);

  return (
    <Swiper
      ref={swiperRef}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      breakpoints={breakpoints}
      navigation={navigation ? { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' } : undefined}
      freeMode={freeMode}
      modules={[Navigation, FreeMode]}
      className={`${className}`}
      observer={true}
      observeParents={true}
      watchSlidesProgress={true}
      preventInteractionOnTransition={true}
      initialSlide={0}
      style={{ direction: 'rtl' }}
    >
      {items?.map((item, index) => (
        <SwiperSlide key={`slide-${index}`} className="!h-auto">
          <div className="h-full w-full">{item}</div>
        </SwiperSlide>
      ))}
      {navigation && (
        <>
          <div className="swiper-button-next after:text-sm after:text-gray-600" />
          <div className="swiper-button-prev after:text-sm after:text-gray-600" />
        </>
      )}
    </Swiper>
  );
};

export default Carousel;
