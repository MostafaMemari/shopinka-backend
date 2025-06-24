import { Category } from '@/types/categoryType';
import { PlaceholderImageEnum } from '@/types/enums/PlaceholderImageEnum';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryChildrenGridProps {
  name: string;
  categories: Category[];
}

export default function CategoryChildrenGrid({ name, categories }: CategoryChildrenGridProps) {
  if (!categories?.length) return null;

  return (
    <section className="mb-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl font-bold text-gray-900">{name || 'دسته‌بندی'}</span>
      </div>

      <div
        className="
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4
          overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300
        "
      >
        {categories.map((child) => (
          <div key={child.id}>
            <Link href={`/product-category/${child.slug}`}>
              <div
                className="
              flex flex-col items-center bg-white rounded-xl shadow-sm p-3 transition
              hover:shadow-md hover:-translate-y-1
              "
                tabIndex={0}
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 mb-2">
                  <Image
                    src={child?.thumbnailImage?.fileUrl || PlaceholderImageEnum.SQUARE}
                    alt={child?.name || 'زیر دسته'}
                    width={80}
                    height={80}
                    className="object-contain w-full h-full"
                    loading="lazy"
                  />
                </div>
                <span className="text-sm font-medium text-center text-gray-800">{child?.name}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
