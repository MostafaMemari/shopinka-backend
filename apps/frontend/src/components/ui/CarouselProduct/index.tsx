"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { HiChevronLeft } from "react-icons/hi";
import "swiper/css";
import "swiper/css/navigation";
import { IProduct } from "@/lib/types/products";
import CarouselProductCard from "./CarouselProductCard";
import { productSwiperConfig } from "@/config/swiper";

interface Props {
  title: string;
  viewAllLink: string;
  viewAllText?: string;
  products: IProduct[];
  slidesPerView?: number;
  spaceBetween?: number;
  breakpoints?: Record<number, { slidesPerView: number; spaceBetween: number }>;
}

export default function CarouselProduct({
  title,
  viewAllLink,
  viewAllText = "مشاهده همه",
  products,
  slidesPerView,
  spaceBetween,
  breakpoints,
}: Props) {
  const swiperConfig = {
    ...productSwiperConfig,
    slidesPerView: slidesPerView ?? productSwiperConfig.slidesPerView,
    spaceBetween: spaceBetween ?? productSwiperConfig.spaceBetween,
    breakpoints: breakpoints ?? productSwiperConfig.breakpoints,
  };

  return (
    <section className="mb-8">
      <div className="container relative">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-medium md:text-lg lg:text-xl">{title}</h3>
          <Link href={viewAllLink} className="flex items-center gap-x-2 py-2 text-sm text-primary lg:text-base">
            {viewAllText}
            <HiChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
          </Link>
        </div>

        <Swiper {...swiperConfig} modules={[Navigation]} className="product-slider">
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <CarouselProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-button-next absolute left-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer" />
        <div className="swiper-button-prev absolute right-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer" />
      </div>
    </section>
  );
}
