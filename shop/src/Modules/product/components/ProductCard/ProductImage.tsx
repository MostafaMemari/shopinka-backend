import { useState } from 'react';
import Image from 'next/image';

const fallbackSrc = '/images/no-image.webp';

const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
  const initialSrc = src || fallbackSrc;
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(initialSrc);

  return (
    <div className="relative aspect-square w-full max-w-[216px] mx-auto overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800">
      {!isLoaded && <div className="absolute inset-0 z-0 animate-pulse bg-neutral-200 dark:bg-neutral-700" />}
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={alt}
          fill
          className={`object-contain transition-opacity duration-300 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setImgSrc(fallbackSrc)}
          sizes="(max-width: 768px) 50vw, 216px"
        />
      )}
    </div>
  );
};

export default ProductImage;
