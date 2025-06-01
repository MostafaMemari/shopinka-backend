import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProductCardImageProps {
  title: string;
  thumbnail: string;
}

function ProductCardImage({ title, thumbnail }: ProductCardImageProps) {
  return (
    <Link href={`/product-detail/`}>
      <Image alt={title} className="h-20 w-20" src={thumbnail} width={80} height={80} loading="lazy" />
    </Link>
  );
}

export default ProductCardImage;
