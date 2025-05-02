"use client";

import { FC, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { searchBarSwiperConfig } from "@/config/swiper";
import Carousel from "./Carousel";

interface Item {
  id: string;
  title: string;
  href: string;
  image?: string;
}

interface Props {
  sectionTitle?: string;
  viewAllLink?: string;
  viewAllText?: string;
  items: Item[];
  variant: "product" | "search";
}

const CarouselSearchBar: FC<Props> = ({ sectionTitle, viewAllLink, viewAllText = "مشاهده همه", items, variant }) => {
  const renderItems = useMemo(
    () =>
      items.map((item) => (
        <div key={item.id} className={`search-result-desktop ${variant === "search" ? "h-14" : ""}`}>
          {variant === "product" ? (
            <Link href={item.href} className="flex items-center gap-x-2 rounded-xl border px-4 py-2 text-text/60 hover:border-border/50">
              {item.image && <Image src={item.image} alt={item.title} width={64} height={64} className="w-16" />}
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
        </div>
      )),
    [items, variant]
  );

  return (
    <section className="mb-6">
      <div className="container mx-auto px-4 relative">
        {sectionTitle && (
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-medium md:text-lg lg:text-xl">{sectionTitle}</h3>
            {viewAllLink && (
              <Link href={viewAllLink} className="flex items-center gap-x-2 py-2 text-sm text-primary lg:text-base">
                {viewAllText}
                <span>
                  <svg className="h-5 w-5 lg:h-6 lg:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
              </Link>
            )}
          </div>
        )}

        <Carousel
          items={renderItems}
          slidesPerView={searchBarSwiperConfig.slidesPerView}
          spaceBetween={searchBarSwiperConfig.spaceBetween}
          breakpoints={searchBarSwiperConfig.breakpoints}
          navigation={false}
          freeMode={true}
          className="custom-slider"
        />
      </div>
    </section>
  );
};

export default CarouselSearchBar;
