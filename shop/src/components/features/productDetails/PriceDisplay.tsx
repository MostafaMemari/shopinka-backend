'use client';

import { formatPrice } from '@/utils/formatter';
import { RootState } from '@/store';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

interface ProductPriceProps {
  product: {
    type: 'VARIABLE' | 'SIMPLE';
    salePrice: number | null;
    basePrice: number | null;
  };
}

export function ProductPrice({ product }: ProductPriceProps) {
  const { selectedVariant } = useSelector((state: RootState) => state.product);
  const isVariable = product.type === 'VARIABLE';

  const salePrice = isVariable ? (selectedVariant?.salePrice ?? null) : product.salePrice;
  const basePrice = isVariable ? (selectedVariant?.basePrice ?? null) : product.basePrice;

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
      {discount > 0 && basePrice != null && salePrice ? (
        <>
          <div className="flex items-center gap-x-2">
            {basePrice != null && (
              <div>
                <del className="text-xs text-text/60 decoration-warning md:text-sm">{formatPrice(basePrice)}</del>
              </div>
            )}
            <div className="flex w-8 items-center justify-center rounded-full bg-warning py-0.5 text-xs font-bold text-white dark:bg-red-600">
              {discount}%
            </div>
          </div>
          <div className="text-primary">
            <span className="text-base font-semibold lg:text-lg lg:font-bold">{formatPrice(salePrice)}</span>
            <span className="text-xs font-light lg:text-sm lg:font-medium"> تومان</span>
          </div>
        </>
      ) : (
        <div className="text-primary">
          <span className="text-base font-semibold lg:text-lg lg:font-bold">{formatPrice(basePrice ?? 0)}</span>
          <span className="text-xs font-light lg:text-sm lg:font-medium"> تومان</span>
        </div>
      )}
    </div>
  );
}

export default ProductPrice;
