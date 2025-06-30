import { NoImage } from '@/types/noImageEnum';
import Image from 'next/image';
import { FC } from 'react';

const PopularPosts: FC = () => {
  return (
    <div className="mb-8 rounded-lg bg-muted px-2 py-3 shadow-base xl:px-4">
      <p className="mb-4 text-center text-sm font-medium xl:text-base">مطالب محبوب</p>
      <ul className="space-y-8">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <li key={index}>
              <a href="#">
                <div className="flex gap-x-2 xl:gap-x-4">
                  <div className="min-w-fit">
                    <Image src={NoImage.BLOG} alt="blog" width={64} height={64} className="w-16 rounded-xl xl:w-20" unoptimized />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="line-clamp-2 text-sm text-text/90 xl:text-base">نحوه انتقال مخاطبین از گوشی آیفون به اندروید</p>
                    <p className="text-xs text-text/60 xl:text-sm">1402 / شهریور / 20</p>
                  </div>
                </div>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PopularPosts;
