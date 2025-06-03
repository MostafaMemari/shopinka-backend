'use client';

import { formatPrice } from '@/shared/utils/formatter';
import { RootState } from '@/store';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export function ProductPrice() {
  const { product, selectedVariant } = useSelector((state: RootState) => state.product);

  const newPrice = useMemo(() => (selectedVariant ? selectedVariant.salePrice : product?.salePrice), [selectedVariant, product]);
  const oldPrice = useMemo(() => (selectedVariant ? selectedVariant.basePrice : product?.basePrice), [selectedVariant, product]);
  const discount = useMemo(() => {
    if (newPrice && oldPrice) {
      return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
    }
    return 0;
  }, [newPrice, oldPrice]);

  console.log(discount);

  if (!product) return null;
  if (product.type === 'VARIABLE' && !selectedVariant) return null;
  // if (!newPrice) return null;

  return (
    <div className="space-y-1" aria-live="polite">
      {discount > 0 && (
        <div className="flex items-center gap-x-2">
          {newPrice && (
            <div>
              <del className="text-xs text-text/60 decoration-warning md:text-sm">{formatPrice(newPrice)}</del>
            </div>
          )}
          <div className="flex w-8 items-center justify-center rounded-full bg-warning py-0.5 text-xs font-bold text-white dark:bg-red-600">
            {discount}%
          </div>
        </div>
      )}
      <div className="text-primary">
        <span className="text-base font-semibold lg:text-lg lg:font-bold">{formatPrice(oldPrice)}</span>
        <span className="text-xs font-light lg:text-sm lg:font-medium"> تومان</span>
      </div>
    </div>
  );
}

export default ProductPrice;
