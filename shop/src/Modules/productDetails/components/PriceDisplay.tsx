'use client';

import { formatPrice } from '@/shared/utils/formatter';
import { RootState } from '@/store';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export function ProductPrice() {
  const { product, selectedVariant } = useSelector((state: RootState) => state.product);

  if (!product) return null;

  if (product.type === 'VARIABLE' && !selectedVariant) return null;

  const newPrice = useMemo(() => (selectedVariant ? selectedVariant.salePrice : product?.salePrice), [selectedVariant, product]);
  const oldPrice = useMemo(() => (selectedVariant ? selectedVariant.basePrice : product?.basePrice), [selectedVariant, product]);
  const discount = useMemo(() => {
    if (newPrice && oldPrice) {
      return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
    }
    return 0;
  }, [newPrice, oldPrice]);

  if (!newPrice) return null;

  return (
    <div className="space-y-1" aria-live="polite">
      {discount && (
        <div className="flex items-center gap-x-2">
          {oldPrice && (
            <div>
              <del className="text-sm text-text/60 decoration-warning md:text-base">{formatPrice(oldPrice)}</del>
            </div>
          )}
          <div className="flex w-10 items-center justify-center rounded-full bg-warning py-0.5 text-sm font-bold text-white dark:bg-red-600">
            {discount}%
          </div>
        </div>
      )}
      <div className="text-primary">
        <span className="font-semibold lg:text-xl lg:font-bold">{formatPrice(newPrice)}</span>
        <span className="text-sm font-light lg:text-base lg:font-medium"> تومان</span>
      </div>
    </div>
  );
}

export default ProductPrice;
