import { Product } from '@/types/productType';
import { formatPrice } from '@/utils/formatter';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface SearchItemProps {
  product: Product;
}

function SearchItem({ product }: SearchItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-md p-2 hover:bg-background/80 transition-colors">
      {product.mainImage && (
        <Image
          src={product.mainImage.fileUrl}
          width={48}
          height={48}
          alt={product.name}
          className="h-12 w-12 object-cover rounded-md flex-shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        <Link href={`/product/${product.slug}`} className="text-text hover:underline truncate block">
          {product.name}
        </Link>
        <div className="text-sm text-text/60 flex items-center gap-2">
          {product.salePrice ? (
            <>
              <span>{formatPrice(product.salePrice)} تومان</span>
              {product.basePrice !== product.salePrice && (
                <span className="line-through text-text/40">{formatPrice(product.basePrice ?? 0)}</span>
              )}
            </>
          ) : (
            <span>{formatPrice(product?.basePrice ?? 0) ?? 'قیمت نامشخص'} تومان</span>
          )}
        </div>
      </div>
    </li>
  );
}

export default SearchItem;
