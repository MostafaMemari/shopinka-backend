"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { useMemo } from "react";
import { defaultSwiperConfig, searchBarSwiperConfig } from "@/config/swiper";

interface Item {
  id: string;
  title: string;
  href: string;
  image?: string;
}

interface CustomSwiperProps {
  items: Item[];
  variant: "product" | "search";
}

const CustomSwiper = ({ items, variant }: CustomSwiperProps) => {
  const swiperConfig = useMemo(
    () => ({
      ...defaultSwiperConfig,
      slidesPerView: searchBarSwiperConfig.slidesPerView,
      spaceBetween: searchBarSwiperConfig.spaceBetween,
      breakpoints: searchBarSwiperConfig.breakpoints,
    }),
    [],
  );

  return (
    <Swiper {...swiperConfig}>
      {items.map((item) => (
        <SwiperSlide
          key={item.id}
          className={`search-result-desktop ${variant === "search" ? "h-14" : ""}`}
        >
          {variant === "product" ? (
            <Link
              href={item.href}
              className="flex items-center gap-x-2 rounded-xl border px-4 py-2 text-text/60 hover:border-border/50"
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="w-16"
                />
              )}
              <p className="line-clamp-2">{item.title}</p>
            </Link>
          ) : (
            <Link
              href={item.href}
              className="flex items-center justify-center gap-x-2 rounded-full border p-2 text-text/60 hover:border-border/50"
            >
              <p className="line-clamp-1">{item.title}</p>
              <HiOutlineChevronLeft className="h-4 w-4" />
            </Link>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSwiper;
