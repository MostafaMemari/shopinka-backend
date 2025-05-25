import { calculateDiscount } from '@/shared/utils/calculateDiscount';
import { formatPrice } from '@/shared/utils/formatter';
import { FC } from 'react';

interface Props {
  oldPrice?: number;
  newPrice?: number;
}

const ProductPrice: FC<Props> = ({ oldPrice, newPrice }) => {
  const discount = calculateDiscount(oldPrice, newPrice);
  const hasDiscount = discount > 0;

  return (
    <div className="flex flex-col">
      {hasDiscount ? (
        <>
          <div className="h-5 text-left">
            <del className="text-sm text-text/60 decoration-warning md:text-base">{oldPrice && formatPrice(oldPrice)}</del>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="w-9 rounded-full bg-warning py-px text-center text-sm text-white">{discount}%</p>
            </div>
            <div className="text-sm font-bold text-primary md:text-base">
              {newPrice && formatPrice(newPrice)}
              <span className="text-xs font-light md:text-sm"> تومان</span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <div className="h-5 text-left"></div>
          <div className="flex items-center justify-between">
            <div></div>
            <div className="text-sm font-bold text-primary md:text-base">
              {newPrice && formatPrice(newPrice)}
              <span className="text-xs font-light md:text-sm"> تومان</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPrice;
