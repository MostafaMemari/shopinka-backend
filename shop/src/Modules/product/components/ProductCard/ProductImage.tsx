import { useState } from 'react';
import Image from 'next/image';

const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative aspect-square w-full max-w-[216px] mx-auto overflow-hidden rounded-lg  border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800">
      {!isLoaded && <div className="absolute inset-0 z-0 animate-pulse bg-neutral-200 dark:bg-neutral-700" />}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-contain transition-opacity duration-300 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        sizes="(max-width: 768px) 50vw, 216px"
      />
    </div>
  );
};

export default ProductImage;
