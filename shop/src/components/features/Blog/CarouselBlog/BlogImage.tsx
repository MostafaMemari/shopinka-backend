'use client';

import { useState } from 'react';
import Image from 'next/image';

const fallbackSrc = '/images/no-image.webp';

const BlogImage = ({ src, alt }: { src: string; alt: string }) => {
  const initialSrc = src || fallbackSrc;
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(initialSrc);

  return (
    <div className="relative w-full max-w-[307px] mx-auto overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
      {!isLoaded && <div className="absolute inset-0 z-0 animate-pulse bg-neutral-200" />}
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={alt}
          width={307}
          height={172}
          className={`w-full h-full object-contain transition-opacity duration-300 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setImgSrc(fallbackSrc)}
          sizes="(max-width: 768px) 50vw, 172px"
          unoptimized
        />
      )}
    </div>
  );
};

export default BlogImage;
