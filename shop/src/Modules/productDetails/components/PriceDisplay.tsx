// src/components/ProductPrice/ProductPrice.tsx
'use client';

import { formatPrice } from '@/shared/utils/formatter';
import { RootState } from '@/store';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

interface ProductPriceProps {
  productType: 'VARIABLE' | 'SIMPLE';
  productSalePrice: number | null;
  productBasePrice: number | null;
}

export function ProductPrice({ productType, productSalePrice, productBasePrice }: ProductPriceProps) {
  const { selectedVariant } = useSelector((state: RootState) => state.product);
  const isVariable = productType === 'VARIABLE';

  const salePrice = isVariable ? (selectedVariant?.salePrice ?? null) : productSalePrice;
  const basePrice = isVariable ? (selectedVariant?.basePrice ?? null) : productBasePrice;

  const discount = useMemo(() => {
    if (typeof salePrice === 'number' && typeof basePrice === 'number' && basePrice > 0) {
      return Math.round(((basePrice - salePrice) / basePrice) * 100);
    }
    return 0;
  }, [salePrice, basePrice]);

  if (isVariable && !selectedVariant) return null;
  if (salePrice == null && basePrice == null) return null;

  return (
    <div className="space-y-1" aria-live="polite">
      {discount > 0 && basePrice != null ? (
        <>
          <div className="flex items-center gap-x-2">
            {salePrice != null && (
              <div>
                <del className="text-xs text-text/60 decoration-warning md:text-sm">{formatPrice(salePrice)}</del>
              </div>
            )}
            <div className="flex w-8 items-center justify-center rounded-full bg-warning py-0.5 text-xs font-bold text-white dark:bg-red-600">
              {discount}%
            </div>
          </div>
          <div className="text-primary">
            <span className="text-base font-semibold lg:text-lg lg:font-bold">{formatPrice(basePrice)}</span>
            <span className="text-xs font-light lg:text-sm lg:font-medium"> تومان</span>
          </div>
        </>
      ) : (
        salePrice != null && (
          <div className="text-primary">
            <span className="text-base font-semibold lg:text-lg lg:font-bold">{formatPrice(salePrice)}</span>
            <span className="text-xs font-light lg:text-sm lg:font-medium"> تومان</span>
          </div>
        )
      )}
    </div>
  );
}

export default ProductPrice;
