'use client';

import Image from 'next/image';
import { useState } from 'react';

interface MainImageProps {
  src: string;
  alt: string;
}

export default function MainImage({ src, alt }: MainImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-lg" onMouseEnter={() => setIsZoomed(true)} onMouseLeave={() => setIsZoomed(false)}>
      <Image
        src={src}
        alt={alt}
        width={600}
        height={600}
        className={`w-full transform transition-transform duration-300 ${isZoomed ? 'scale-110' : 'scale-100'}`}
        priority
      />
    </div>
  );
}
