'use client';

import { ProductDetails } from '@/Modules/product/types/productType';
import { formatPrice } from '@/shared/utils/formatter';
import { productVariant } from '@/Modules/product/types/productType';

interface Props {
  product: ProductDetails;
  selectedVariant?: productVariant;
}

export default function PriceDisplay({ product, selectedVariant }: Props) {
  const isVariableProduct = product.variants.length > 0;

  const price = selectedVariant ? selectedVariant.salePrice || selectedVariant.basePrice : product.salePrice || product.basePrice;
  const basePrice = selectedVariant ? selectedVariant.basePrice : product.basePrice;
  const hasDiscount = selectedVariant
    ? selectedVariant.salePrice !== null && selectedVariant.salePrice < selectedVariant.basePrice!
    : product.salePrice !== null && product.salePrice < product.basePrice!;

  if (!price) return null;

  return (
    <div className="space-y-1" aria-live="polite">
      {hasDiscount && (
        <div className="flex items-center gap-x-2">
          {basePrice && (
            <div>
              <del className="text-sm text-text/60 decoration-warning md:text-base">{formatPrice(basePrice)}</del>
            </div>
          )}
          <div className="flex w-10 items-center justify-center rounded-full bg-warning py-0.5 text-sm font-bold text-white dark:bg-red-600">
            {Math.round(((basePrice! - price) / basePrice!) * 100)}%
          </div>
        </div>
      )}
      <div className="text-primary">
        <span className="font-semibold lg:text-xl lg:font-bold">{formatPrice(price)}</span>
        <span className="text-sm font-light lg:text-base lg:font-medium"> تومان</span>
      </div>
    </div>
  );
}
