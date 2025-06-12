'use client';

import { FC, useMemo } from 'react';
import Link from 'next/link';
import { blogSwiperConfig } from '@/config/swiper';
import { IBlog } from '@/lib/types/blogs';
import BlogCard from '@/../components/Blog';
import Carousel from '@/../components/Carousel/Carousel';

interface Props {
  sectionTitle: string;
  viewAllLink: string;
  viewAllText?: string;
  blogs: IBlog[];
}

const CarouselBlog: FC<Props> = ({ sectionTitle, viewAllLink, viewAllText = 'مشاهده همه', blogs }) => {
  const blogItems = useMemo(() => blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />), [blogs]);

  return (
    <section className="mb-6">
      <div className="container mx-auto px-4 relative">
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
        <Carousel
          items={blogItems}
          slidesPerView={blogSwiperConfig.slidesPerView}
          spaceBetween={blogSwiperConfig.spaceBetween}
          breakpoints={blogSwiperConfig.breakpoints}
          navigation={true}
          freeMode={true}
          className="blog-slider"
        />
      </div>
    </section>
  );
};

export default CarouselBlog;
