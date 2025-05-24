import { useState } from 'react';
import Image from 'next/image';

const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-[200px] w-full rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
      {!isLoaded && <div className="absolute inset-0 animate-pulse bg-gray-300 dark:bg-gray-600 z-0" />}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-contain transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};
