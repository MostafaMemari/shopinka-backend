'use client';

import { FC } from 'react';
import ProductPrice from './ProductPrice';
import Link from 'next/link';
import ProductImage from './ProductImage';
import { Product } from '../../types/productType';

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
  const imageUrl = product.mainImage?.fileUrl ?? '/placeholder-image.jpg';
  const slug = product.slug ?? '#';
  const productName = product.name ?? 'محصول بدون نام';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    image: imageUrl,
    description: product.name ?? productName,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'IRR',
      price: product.salePrice ?? product.basePrice ?? 0,
      availability: product.quantity && product.quantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <article className="border-gradient group relative rounded-base p-px before:absolute before:-inset-px before:h-[calc(100%+2px)] before:w-[calc(100%+2px)] before:rounded-base">
      <div className="relative rounded-xl bg-muted p-2 shadow-base md:p-5">
        <div className="mb-2 md:mb-5" draggable={false}>
          <Link href={`/product/${slug}`} aria-label={`مشاهده جزئیات ${productName}`}>
            <ProductImage src={imageUrl} alt={productName} />
          </Link>
        </div>
        <div className="mb-2">
          <Link href={`/product/${slug}`} className="line-clamp-2 h-10 text-sm md:h-12 md:text-base hover:text-primary">
            <h3 className="text-sm md:text-base">{productName}</h3>
          </Link>
        </div>
        <ProductPrice salePrice={product.salePrice} basePrice={product.basePrice} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </div>
    </article>
  );
};

export default ProductCard;
