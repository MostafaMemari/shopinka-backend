"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { IBlog } from "@/lib/types/blogs";
import CarouselBlogCard from "../BlogCard";
import { blogSwiperConfig, defaultSwiperConfig } from "@/config/swiper";
import { useMemo } from "react";

interface Props {
  sectionTitle: string;
  viewAllLink: string;
  viewAllText?: string;
  blogs: IBlog[];
  slidesPerView?: number;
  spaceBetween?: number;
  breakpoints?: Record<number, { slidesPerView: number; spaceBetween: number }>;
}

export default function CarouselBlog({
  sectionTitle,
  viewAllLink,
  viewAllText = "مشاهده همه",
  blogs,
}: Props) {
  const swiperConfig = useMemo(
    () => ({
      ...defaultSwiperConfig,
      slidesPerView: blogSwiperConfig.slidesPerView,
      spaceBetween: blogSwiperConfig.spaceBetween,
      breakpoints: blogSwiperConfig.breakpoints,
    }),
    [],
  );

  const stableBlogs = useMemo(() => blogs, [blogs]);

  return (
    <section className="mb-6">
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-medium md:text-lg lg:text-xl">{sectionTitle}</h3>
          <Link
            href={viewAllLink}
            className="flex items-center gap-x-2 py-2 text-sm text-primary lg:text-base"
          >
            {viewAllText}
            <span>
              <svg
                className="h-5 w-5 lg:h-6 lg:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </span>
          </Link>
        </div>
        {/* Section Content */}
        <Swiper {...swiperConfig} className="blog-slider">
          {stableBlogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <CarouselBlogCard blog={blog} />
            </SwiperSlide>
          ))}
          <div className="swiper-button-next" />
          <div className="swiper-button-prev" />
        </Swiper>
      </div>
    </section>
  );
}
