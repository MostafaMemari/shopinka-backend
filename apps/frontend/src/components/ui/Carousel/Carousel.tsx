"use client";

import { FC, ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

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
  spaceBetween = 0,
  breakpoints,
  navigation = false,
  freeMode = false,
  className = "",
}) => {
  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      breakpoints={breakpoints}
      navigation={navigation ? { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" } : false}
      freeMode={freeMode}
      modules={[Navigation, FreeMode]}
      className={className}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>{item}</SwiperSlide>
      ))}
      {navigation && (
        <>
          <div className="swiper-button-next" />
          <div className="swiper-button-prev" />
        </>
      )}
    </Swiper>
  );
};

export default Carousel;
