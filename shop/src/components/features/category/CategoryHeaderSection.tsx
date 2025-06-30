import { NoImage } from '@/types/noImageEnum';
import Image from 'next/image';

interface Category {
  name: string;
  description?: string;
  thumbnailImage?: { fileUrl: string };
}

export default function CategoryHeaderSection({ name, description, thumbnailImage }: Category) {
  if (!name) return null;

  const safeDescription = description || 'دسته‌بندی بدون توضیحات';

  return (
    <section className="mt-8" itemScope itemType="https://schema.org/CollectionPage">
      <div className="bg-muted mx-auto rounded-xl p-4 flex flex-col items-center">
        {thumbnailImage && (
          <div className="w-32 h-32 mb-4 rounded-lg overflow-hidden">
            <Image
              src={thumbnailImage?.fileUrl || NoImage.PRODUCT}
              alt={name ? `عکس دسته‌بندی ${name}` : 'تصویر دسته‌بندی'}
              width={800}
              height={128}
              priority
              className="w-full h-32 object-cover"
              itemProp="image"
              unoptimized
            />
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 text-gray-900 text-right" itemProp="name">
          {name}
        </h1>
        <div
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl leading-7 text-gray-700 text-right"
          itemProp="description"
          dangerouslySetInnerHTML={{ __html: safeDescription }}
        />
      </div>
    </section>
  );
}
