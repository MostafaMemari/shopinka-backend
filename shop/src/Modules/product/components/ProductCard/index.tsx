import { FC } from 'react';
import ProductPrice from './ProductPrice';
import Link from 'next/link';
import ProductImage from './ProductImage';
import { Product } from '../../types/productType';

interface Props {
  product: any;
}

const ProductCard: FC<Props> = ({ product }) => {
  const imageUrl = product?.mainImage?.fileUrl || '';

  return (
    <div className="border-gradient group relative rounded-base p-px before:absolute before:-inset-px before:h-[calc(100%+2px)] before:w-[calc(100%+2px)] before:rounded-base">
      <div className="relative rounded-xl bg-muted p-2 shadow-base md:p-5">
        <div className="mb-2 md:mb-5" draggable={false}>
          <Link href={`/product/${product.slug}`}>
            <ProductImage src={imageUrl} alt={product.name} />
          </Link>
        </div>
        <div className="mb-2">
          <Link href={`/product/${product.slug}`} className="line-clamp-2 h-10 text-sm md:h-12 md:text-base">
            {product.name}
          </Link>
        </div>
        <ProductPrice newPrice={Number(product?.salePrice)} oldPrice={Number(product?.basePrice)} />
      </div>
    </div>
  );
};

export default ProductCard;
