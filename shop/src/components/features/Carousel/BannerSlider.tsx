'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { mainSliderBanners, sideBanners } from '@/data/bannerData';

export default function BannerSlider() {
  return (
    <div className="relative mb-8 grid grid-cols-12 gap-x-4 gap-y-2">
      <div className="col-span-12 lg:col-span-8">
        <Swiper
          rewind={true}
          loop={true}
          autoplay={{ delay: 3000 }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            el: '.main-banner-pagination',
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Navigation, Pagination, Autoplay]}
          className="banner-slider rounded-lg shadow-base"
        >
          {mainSliderBanners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Link href={banner.link}>
                <Image
                  src={banner.image}
                  alt=""
                  width={800}
                  height={450}
                  className="max-h-[450px] w-full object-cover"
                  priority={banner.id === 1}
                  unoptimized
                />
              </Link>
            </SwiperSlide>
          ))}

          <div className="swiper-button-next hidden md:flex"></div>
          <div className="swiper-button-prev hidden md:flex"></div>
          <div className="swiper-pagination main-banner-pagination"></div>
        </Swiper>
      </div>
      <div className="col-span-12 hidden xs:block lg:col-span-4">
        <div className="flex h-full flex-row justify-between gap-x-2 lg:flex-col">
          {sideBanners.map((banner) => (
            <div key={banner.id}>
              <Link href={banner.link}>
                <Image src={banner.image} alt="" width={400} height={220} className="h-full w-full rounded-lg shadow-base" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
