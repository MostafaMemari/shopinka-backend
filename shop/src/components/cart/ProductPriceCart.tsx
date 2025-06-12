'use client';

import { formatPrice } from '@/shared/utils/formatter';

interface ProductPriceCartProps {
  newPrice: number;
  oldPrice: number;
  discount: number;
}

export function ProductPriceCart({ newPrice, oldPrice, discount }: ProductPriceCartProps) {
  return (
    <div className="space-y-1" aria-live="polite">
      {discount > 0 && (
        <div className="flex items-center gap-x-1">
          {newPrice > 0 && (
            <div>
              <del className="text-[11px] text-text/60 decoration-warning">{formatPrice(newPrice)}</del>
            </div>
          )}
          <div className="flex h-5 min-w-[28px] items-center justify-center rounded-full bg-warning px-1.5 py-0.5 text-xs font-bold text-white dark:bg-red-600">
            {discount}%
          </div>
        </div>
      )}
      <div className="text-primary">
        <span className="font-semibold text-base lg:text-lg">{formatPrice(oldPrice)}</span>
        <span className="text-xs font-light lg:text-sm"> تومان</span>
      </div>
    </div>
  );
}

export default ProductPriceCart;
