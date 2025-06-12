'use client';

import React, { useMemo } from 'react';

interface ProductCartPriceProps {
  newPrice?: number;
  oldPrice?: number;
}

export default function ProductCartPrice({ newPrice, oldPrice }: ProductCartPriceProps) {
  const discount = useMemo(() => {
    if (!newPrice || !oldPrice || oldPrice <= newPrice) return 0;
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  }, [newPrice, oldPrice]);

  if (!newPrice) return null;

  return (
    <div className="flex flex-col items-start gap-1 text-sm text-gray-800">
      <div className="text-lg font-bold text-green-600">{newPrice.toLocaleString()} تومان</div>
      {oldPrice && oldPrice > newPrice && (
        <div className="flex items-center gap-2">
          <span className="line-through text-gray-500">{oldPrice.toLocaleString()} تومان</span>
          <span className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-600">{discount}% تخفیف</span>
        </div>
      )}
    </div>
  );
}
