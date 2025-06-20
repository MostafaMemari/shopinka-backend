import { Category } from '@/types/categoryType';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCirclesBannersProps {
  categories: Category[];
}

export default async function CategoryCirclesBanners({ categories }: CategoryCirclesBannersProps) {
  return (
    <section className="mb-8">
      <div className="container relative mx-auto">
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
          {categories.map((category: Category) => (
            <Link key={category.id} href={category.slug} className="flex-1">
              <Image
                src={category?.thumbnailImage?.fileUrl || '/images/no-image.webp'}
                alt={category.name}
                width={600}
                height={300}
                className="rounded-base w-full h-full object-cover"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
