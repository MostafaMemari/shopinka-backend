"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { HiChevronLeft } from "react-icons/hi";
import ProductCard from "../ProductCard";
import "swiper/css";
import "swiper/css/navigation";

interface Product {
  id: string;
  imageSrc: string;
  title: string;
  productLink: string;
  newPrice: number;
  oldPrice?: number;
  discount?: number;
}

interface ProductSliderProps {
  title: string;
  viewAllLink: string;
  viewAllText?: string;
  products: Product[];
  slidesPerView?: number;
  spaceBetween?: number;
  breakpoints?: Record<number, { slidesPerView: number; spaceBetween: number }>;
}

const ProductSlider = ({
  title,
  viewAllLink,
  viewAllText = "مشاهده همه",
  products,
  slidesPerView = 1.5,
  spaceBetween = 14,
  breakpoints = {
    360: { slidesPerView: 2, spaceBetween: 10 },
    460: { slidesPerView: 2.5, spaceBetween: 10 },
    640: { slidesPerView: 3, spaceBetween: 10 },
    768: { slidesPerView: 3.5, spaceBetween: 10 },
    1024: { slidesPerView: 4.5, spaceBetween: 10 },
    1380: { slidesPerView: 6, spaceBetween: 10 },
  },
}: ProductSliderProps) => {
  return (
    <section className="mb-8">
      <div className="container relative">
        {/* Section Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-medium md:text-lg lg:text-xl">{title}</h3>
          <Link href={viewAllLink} className="flex items-center gap-x-2 py-2 text-sm text-primary lg:text-base">
            {viewAllText}
            <HiChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
          </Link>
        </div>

        {/* Section Content */}
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          freeMode={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={breakpoints}
          modules={[Navigation]}
          className="product-slider"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                imageSrc={product.imageSrc}
                title={product.title}
                oldPrice={product.oldPrice}
                newPrice={product.newPrice}
                discount={product.discount}
                productLink={product.productLink}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-button-next absolute left-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer" />
        <div className="swiper-button-prev absolute right-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer" />
      </div>
    </section>
  );
};

export default ProductSlider;
