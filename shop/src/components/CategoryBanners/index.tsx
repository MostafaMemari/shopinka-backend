import { Category } from '@/types/categoryType';
import { PlaceholderImageEnum } from '@/types/enums/PlaceholderImageEnum';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCirclesBannersProps {
  categories: Category[];
  basePath: string;
}

export default function CategoryCirclesBanners({ categories, basePath }: CategoryCirclesBannersProps) {
  return (
    <section className="py-6">
      <div className="container mx-auto px-2">
        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`${basePath}/${category.slug}`}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 flex flex-col items-center group transition-all"
              tabIndex={0}
            >
              <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary/70 to-secondary/60 shadow-lg group-hover:shadow-2xl transition-all duration-200 overflow-hidden border-2 border-white group-hover:border-primary ring-2 ring-white flex items-center justify-center">
                <Image
                  src={category?.thumbnailImage?.fileUrl || PlaceholderImageEnum.SQUARE}
                  alt={category.name}
                  fill
                  className="object-cover object-center w-full h-full scale-100 group-hover:scale-105 transition-transform duration-200"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 200px"
                  priority
                  unoptimized
                />
                {!category?.thumbnailImage?.fileUrl && <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />}
              </div>
              <span className="mt-3 text-sm sm:text-base font-bold text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center w-full truncate group-hover:scale-105 transition-transform">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
