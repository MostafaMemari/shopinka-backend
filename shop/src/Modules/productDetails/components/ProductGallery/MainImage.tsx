'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface MainImageProps {
  src: string;
  alt: string;
}

const fallbackSrc = '/images/no-image.webp';

export default function MainImage({ src, alt }: MainImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <div className="relative overflow-hidden rounded-lg">
      <Image
        src={imgSrc}
        alt={alt ?? ''}
        width={600}
        height={600}
        className="w-full transform transition-transform duration-300 hover:scale-110"
        onError={() => setImgSrc(fallbackSrc)}
        priority
      />
    </div>
  );
}
