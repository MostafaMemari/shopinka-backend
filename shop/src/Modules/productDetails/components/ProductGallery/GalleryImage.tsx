import { IProductThumbnail } from '@/lib/types/products';
import Image from 'next/image';

export default function GalleryImage({ src, alt, isBlurred = false }: IProductThumbnail) {
  return (
    <div className={`relative h-16 w-16 xl:h-20 xl:w-20 cursor-pointer rounded-lg border ${isBlurred ? 'relative' : ''}`}>
      <Image src={src} alt={alt ?? ''} fill className={`rounded-lg object-cover p-1 ${isBlurred ? 'blur-sm' : ''}`} />
      {isBlurred && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="2" />
            <circle cx="6" cy="12" r="2" />
            <circle cx="18" cy="12" r="2" />
          </svg>
        </span>
      )}
    </div>
  );
}
