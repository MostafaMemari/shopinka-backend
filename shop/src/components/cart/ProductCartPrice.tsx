'use client';

import { calculateDiscount } from '@/utils/calculateDiscount';
import { formatPrice } from '@/utils/formatter';
import React from 'react';

interface ProductCartPriceProps {
  basePrice?: number | null;
  salePrice?: number | null;
}

export default function ProductCartPrice({ salePrice, basePrice }: ProductCartPriceProps) {
  const isAvailable = basePrice != null && basePrice > 0;
  const discount = isAvailable && salePrice != null ? calculateDiscount(basePrice, salePrice) : 0;
  const hasDiscount = discount > 0 && salePrice != null;

  return (
    <div className="flex flex-col items-start gap-1 text-sm text-gray-800">
      {hasDiscount ? (
        <>
          <div className="text-lg font-bold text-primary">{formatPrice(salePrice ?? 0)} تومان</div>

          <div className="flex items-center gap-2">
            <span className="line-through text-gray-500">{formatPrice(basePrice ?? 0)} تومان</span>
            <span className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-600">{discount}% تخفیف</span>
          </div>
        </>
      ) : (
        <>
          {isAvailable ? (
            <>
              <div className="text-lg font-bold text-primary mt-4">{formatPrice(basePrice ?? 0)} تومان</div>
            </>
          ) : (
            <span className="text-xs font-light text-text/60">ناموجود</span>
          )}
        </>
      )}
    </div>
  );
}

{
  /* <div className="flex flex-col items-start gap-1 text-sm text-gray-800">
  <div className="text-lg font-bold text-green-600">{newPrice.toLocaleString()} تومان</div>
  {oldPrice && oldPrice > newPrice && (
    <div className="flex items-center gap-2">
      <span className="line-through text-gray-500">{oldPrice.toLocaleString()} تومان</span>
      <span className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-600">{discount}% تخفیف</span>
    </div>
  )}
</div>; */
}
