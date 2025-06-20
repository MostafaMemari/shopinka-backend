'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { blogSwiperConfig } from '@/config/swiper';
import { BlogItem } from '@/types/blogType';
import BlogCard from './BlogCard';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { HiChevronLeft } from 'react-icons/hi';

interface Props {
  title: string;
  viewAllLink: string;
  viewAllText?: string;
  blogs: BlogItem[];
}

const CarouselBlog: FC<Props> = ({ title, viewAllLink, viewAllText = 'مشاهده همه', blogs }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="mb-6">
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium md:text-xl lg:text-2xl">{title}</h3>
          <Link
            href={viewAllLink}
            className="flex items-center gap-2 py-2 text-sm text-primary hover:text-blue-800 transition-colors lg:text-base"
          >
            {viewAllText}
            <HiChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
          </Link>
        </div>
        {blogs && blogs.length > 0 ? (
          <div className="relative overflow-hidden">
            {!isMounted && <SkeletonLoader />}
            <Swiper
              slidesPerView={blogSwiperConfig.slidesPerView}
              spaceBetween={blogSwiperConfig.spaceBetween}
              breakpoints={blogSwiperConfig.breakpoints}
              className="product-carousel"
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              modules={[Navigation]}
              style={{ direction: 'rtl' }}
              onInit={() => setIsMounted(true)}
            >
              {blogs.map((blog) => (
                <SwiperSlide key={blog.id}>
                  <BlogCard blog={blog} />
                </SwiperSlide>
              ))}
              <div className="swiper-button-prev absolute top-1/2 -left-4 z-10 -translate-y-1/2 after:text-sm after:text-gray-600" />
              <div className="swiper-button-next absolute top-1/2 -right-4 z-10 -translate-y-1/2 after:text-sm after:text-gray-600" />
            </Swiper>
          </div>
        ) : (
          <div className="text-center">هیچ بلاگی یافت نشد</div>
        )}
      </div>
    </section>
  );
};

export default CarouselBlog;
