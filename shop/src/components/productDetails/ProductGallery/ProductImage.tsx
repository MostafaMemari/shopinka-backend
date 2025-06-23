import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt?: string;
  isBlurred?: boolean;
}

export default function ProductImage({ src, alt, isBlurred = false }: ProductImageProps) {
  return (
    <div className={`cursor-pointer rounded-lg border p-1 ${isBlurred ? 'relative' : ''}`}>
      <Image
        src={src}
        alt={alt ?? ''}
        width={80}
        height={80}
        className={`h-16 w-16 xl:h-20 xl:w-20 ${isBlurred ? 'blur-sm' : ''}`}
        loading="lazy"
      />
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
