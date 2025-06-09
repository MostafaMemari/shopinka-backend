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
  loading?: boolean;
  skeletonCount?: number;
}

const SkeletonCard = () => <div className="h-[350px] w-full animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />;

const Carousel: FC<CarouselProps> = ({
  items,
  slidesPerView = 1,
  spaceBetween = 10,
  breakpoints,
  navigation = true,
  freeMode = false,
  className = '',
  loading = false,
  skeletonCount = 4,
}) => {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.update();
    }
  }, [items]);

  const renderItems = loading
    ? Array(skeletonCount)
        .fill(null)
        .map((_, index) => (
          <SwiperSlide key={`skeleton-${index}`} className="!h-auto">
            <div className="h-full w-full p-2">
              <SkeletonCard />
            </div>
          </SwiperSlide>
        ))
    : items.map((item, index) => (
        <SwiperSlide key={`slide-${index}`} className="!h-auto">
          <div className="h-full w-full">{item}</div>
        </SwiperSlide>
      ));

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
      {renderItems}
      {navigation && !loading && (
        <>
          <div className="swiper-button-next after:text-sm after:text-gray-600" />
          <div className="swiper-button-prev after:text-sm after:text-gray-600" />
        </>
      )}
    </Swiper>
  );
};

export default Carousel;
