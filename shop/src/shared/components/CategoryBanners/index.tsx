import { categoryBanners } from '@/mock/categories';
import Image from 'next/image';
import Link from 'next/link';

export default function CategoryCirclesBanners() {
  return (
    <section className="mb-8">
      <div className="container relative mx-auto">
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
          {categoryBanners.map((banner) => (
            <Link key={banner.id} href={banner.link} className="flex-1">
              <Image src={banner.image} alt={banner.alt} width={600} height={300} className="rounded-base w-full h-full object-cover" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
