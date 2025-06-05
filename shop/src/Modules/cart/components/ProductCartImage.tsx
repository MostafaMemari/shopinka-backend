import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProductCartImageProps {
  title: string;
  thumbnail: string;
}

function ProductCartImage({ title, thumbnail }: ProductCartImageProps) {
  return (
    <Link href={`/product-detail/`}>
      <Image alt={title} className="h-20 w-20" src={thumbnail} width={80} height={80} loading="lazy" />
    </Link>
  );
}

export default ProductCartImage;
