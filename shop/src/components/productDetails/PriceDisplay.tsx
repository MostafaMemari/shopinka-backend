'use client';

import { FC } from 'react';

interface Props {
  newPrice?: number;
  oldPrice?: number;
  discount?: number;
  className?: string;
}

const PriceDisplay: FC<Props> = ({ newPrice, oldPrice, discount, className = '' }) => {
  const isFree = !newPrice && !oldPrice;
  const hasDiscount = !!newPrice && !!discount;

  return (
    <div className={`space-y-1 ${className}`} aria-live="polite">
      {hasDiscount && (
        <div className="flex items-center gap-x-2">
          {oldPrice && (
            <div>
              <del className="text-sm text-text/60 decoration-warning md:text-base">{oldPrice.toLocaleString('fa-IR')}</del>
            </div>
          )}
          {discount && (
            <div className="flex w-10 items-center justify-center rounded-full bg-warning py-0.5 text-sm font-bold text-white dark:bg-red-600">
              {discount}%
            </div>
          )}
        </div>
      )}
      <div className="text-primary">
        {isFree ? (
          <span className="text-base font-semibold lg:text-xl lg:font-bold">رایگان</span>
        ) : newPrice ? (
          <>
            <span className={`font-semibold lg:text-xl lg:font-bold"}`}>{newPrice.toLocaleString('fa-IR')}</span>
            <span className="text-sm font-light lg:text-base lg:font-medium"> تومان</span>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PriceDisplay;
