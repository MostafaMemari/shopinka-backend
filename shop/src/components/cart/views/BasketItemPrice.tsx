import { calculateDiscount } from '@/utils/calculateDiscount';
import { formatPrice } from '@/utils/formatter';
import { FC } from 'react';

interface Props {
  basePrice?: number | null;
  salePrice?: number | null;
}

const BasketItemPrice: FC<Props> = ({ basePrice, salePrice }) => {
  const isAvailable = basePrice != null && basePrice > 0;
  const discount = isAvailable && salePrice != null ? calculateDiscount(basePrice, salePrice) : 0;
  const hasDiscount = discount > 0 && salePrice != null;

  return (
    <div className="flex flex-col items-end gap-1">
      {hasDiscount ? (
        <>
          <div className="w-2">
            <div className="flex items-center gap-1">
              <del className="text-xs text-text/60 decoration-warning md:text-sm">{formatPrice(basePrice!)}</del>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-warning px-2 py-px text-xs text-white">{discount}%</span>
              </div>
            </div>
            <span className="text-xs flex items-center gap-1 font-bold text-primary md:text-base">
              {formatPrice(salePrice)} <span className="font-light text-xs">تومان</span>
            </span>
          </div>
        </>
      ) : (
        <span className="text-xs font-bold text-primary md:text-base">
          {isAvailable ? (
            <>
              {formatPrice(basePrice!)} <span className="font-light text-xs">تومان</span>
            </>
          ) : (
            <span className="text-xs font-light text-text/60">ناموجود</span>
          )}
        </span>
      )}
    </div>
  );
};

export default BasketItemPrice;
