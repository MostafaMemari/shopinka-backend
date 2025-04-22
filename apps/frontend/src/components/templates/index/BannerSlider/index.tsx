"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Banner() {
  return (
    <section className="mb-8">
      <div className="container relative grid grid-cols-12 gap-x-4 gap-y-2">
        <div className="col-span-12 lg:col-span-8">
          <Swiper
            rewind={true}
            loop={true}
            autoplay={{ delay: 3000 }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              el: ".main-banner-pagination",
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Navigation, Pagination, Autoplay]}
            className="banner-slider rounded-lg shadow-base"
          >
            <SwiperSlide>
              <Link href="/">
                <Image
                  src="/images/banners/main-slider-1.jpg"
                  alt=""
                  width={800}
                  height={450}
                  className="max-h-[450px] w-full object-cover"
                  priority
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href="/">
                <Image
                  src="/images/banners/main-slider-2.jpg"
                  alt=""
                  width={800}
                  height={450}
                  className="max-h-[450px] w-full object-cover"
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link href="/">
                <Image
                  src="/images/banners/main-slider-3.jpg"
                  alt=""
                  width={800}
                  height={450}
                  className="max-h-[450px] w-full object-cover"
                />
              </Link>
            </SwiperSlide>
            <div className="swiper-button-next hidden md:flex"></div>
            <div className="swiper-button-prev hidden md:flex"></div>
            <div className="swiper-pagination main-banner-pagination"></div>
          </Swiper>
        </div>
        <div className="col-span-12 hidden xs:block lg:col-span-4">
          <div className="flex h-full flex-row justify-between gap-x-2 lg:flex-col">
            <div>
              <Link href="/">
                <Image
                  src="/images/banners/main-banner-top.jpg"
                  alt=""
                  width={400}
                  height={220}
                  className="h-full w-full rounded-lg shadow-base"
                />
              </Link>
            </div>
            <div>
              <Link href="/">
                <Image
                  src="/images/banners/main-bot.gif"
                  alt=""
                  width={400}
                  height={220}
                  className="h-full w-full rounded-lg shadow-base"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
