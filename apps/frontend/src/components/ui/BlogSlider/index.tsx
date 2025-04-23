"use client";

import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import Link from "next/link";
import BlogCard, { BlogCardProps } from "../BlogCard";

interface BlogSliderProps {
  sectionTitle: string;
  viewAllLink: string;
  viewAllText?: string;
  blogs: BlogCardProps[];
  slidesPerView?: number;
  spaceBetween?: number;
  breakpoints?: Record<number, { slidesPerView: number; spaceBetween: number }>;
}

// BlogSection Component
const BlogSection: React.FC<BlogSliderProps> = ({
  sectionTitle,
  viewAllLink,
  viewAllText = "مشاهده همه",
  blogs,
  slidesPerView = 1.7,
  spaceBetween = 14,
  breakpoints = {
    360: { slidesPerView: 2, spaceBetween: 10 },
    460: { slidesPerView: 2.5, spaceBetween: 15 },
    640: { slidesPerView: 3, spaceBetween: 10 },
    768: { slidesPerView: 3.2, spaceBetween: 15 },
    1024: { slidesPerView: 4, spaceBetween: 20 },
    1380: { slidesPerView: 4, spaceBetween: 20 },
  },
}) => {
  useEffect(() => {
    // Ensure Swiper modules are registered
    import("swiper").then((Swiper) => {
      Swiper.default.use([Navigation, FreeMode]);
    });
  }, []);

  return (
    <section className="mb-6">
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-medium md:text-lg lg:text-xl">{sectionTitle}</h3>
          <Link href={viewAllLink} className="flex items-center gap-x-2 py-2 text-sm text-primary lg:text-base">
            {viewAllText}
            <span>
              <svg className="h-5 w-5 lg:h-6 lg:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
          </Link>
        </div>
        {/* Section Content */}
        <Swiper
          modules={[Navigation, FreeMode]}
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          freeMode={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={breakpoints}
          className="blog-slider"
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <BlogCard id={blog.id} imageSrc={blog.imageSrc} title={blog.title} date={blog.date} link={blog.link} />
            </SwiperSlide>
          ))}

          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </Swiper>
      </div>
    </section>
  );
};

export default BlogSection;
