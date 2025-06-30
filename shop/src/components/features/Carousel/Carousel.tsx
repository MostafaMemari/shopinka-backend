'use client';

import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import { ImSpinner2 } from 'react-icons/im';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import './caroucel.css';

interface CarouselProps {
  items: ReactNode[];
  slidesPerView?: number;
  spaceBetween?: number;
  breakpoints?: Record<number, { slidesPerView: number; spaceBetween: number }>;
  navigation?: boolean;
  freeMode?: boolean;
  className?: string;
  loading?: boolean;
}

const Carousel: FC<CarouselProps> = ({
  items,
  slidesPerView = 1,
  spaceBetween = 10,
  breakpoints,
  navigation = true,
  freeMode = false,
  className = '',
  loading = false,
}) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [swiperReady, setSwiperReady] = useState(true);

  useEffect(() => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.update();
    }
  }, [items]);

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center">
        <ImSpinner2 className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-300" />
      </div>
    );
  }

  return (
    <div className="relative">
      <Swiper
        ref={swiperRef}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        navigation={navigation ? { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' } : false}
        freeMode={freeMode}
        modules={[Navigation, FreeMode]}
        className={`${className} transition-opacity duration-300 ${swiperReady ? 'opacity-100' : 'opacity-0'}`}
        style={{ direction: 'rtl' }}
        onInit={() => setSwiperReady(true)}
      >
        {items.map((item, i) => (
          <SwiperSlide key={`slide-${i}`} className="!h-auto">
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
    </div>
  );
};

export default Carousel;
