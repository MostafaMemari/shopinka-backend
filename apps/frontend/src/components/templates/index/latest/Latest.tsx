"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "@/components/modules/ProductCard";
import { HiChevronLeft } from "react-icons/hi";
import Link from "next/link";

const Latest = () => {
  return (
    <section className="mb-8">
      <div className="container relative">
        {/* Section Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-medium md:text-lg lg:text-xl">جدیدترین محصولات</h3>
          <Link href="/shop" className="flex items-center gap-x-2 py-2 text-sm text-primary lg:text-base">
            مشاهده همه
            <HiChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
          </Link>
        </div>

        {/* Section Content */}
        <Swiper
          slidesPerView={1.5}
          spaceBetween={14}
          freeMode={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            360: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            460: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3.5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4.5,
              spaceBetween: 10,
            },
            1380: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
          modules={[Navigation]}
          className="product-slider"
        >
          <SwiperSlide>
            <ProductCard
              imageSrc="/images/products/p1.png"
              title="کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2"
              oldPrice={150000}
              newPrice={100000}
              discount={5}
              productLink="/"
            />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard
              imageSrc="/images/products/p2.png"
              title="کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2"
              oldPrice={150000}
              newPrice={100000}
              discount={5}
              productLink="/"
            />
          </SwiperSlide>

          <SwiperSlide>
            <ProductCard
              imageSrc="/images/products/p3.png"
              title="کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2"
              newPrice={100000}
              productLink="/"
            />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard
              imageSrc="/images/products/p2.png"
              title="کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2"
              oldPrice={150000}
              newPrice={100000}
              discount={5}
              productLink="/"
            />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard
              imageSrc="/images/products/p2.png"
              title="کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2"
              oldPrice={150000}
              newPrice={100000}
              discount={5}
              productLink="/"
            />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard
              imageSrc="/images/products/p2.png"
              title="کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2"
              oldPrice={150000}
              newPrice={100000}
              discount={5}
              productLink="/"
            />
          </SwiperSlide>
        </Swiper>

        <div className="swiper-button-next absolute left-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer" />
        <div className="swiper-button-prev absolute right-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer" />
      </div>
    </section>
  );
};

export default Latest;
