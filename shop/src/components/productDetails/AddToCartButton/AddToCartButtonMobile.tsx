'use client';

import { FC } from 'react';
import PriceDisplay from '../PriceDisplay';

interface Props {
  newPrice?: number;
  oldPrice?: number;
  discount?: number;
  onAddToCart?: () => void;
}

const AddToCartButtonMobile: FC<Props> = ({ newPrice, oldPrice, discount, onAddToCart }) => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 bg-muted p-5">
      <div className="flex items-center justify-between gap-x-6">
        <div className="flex grow">
          <button onClick={onAddToCart} className="btn-primary w-full px-4 py-3 text-sm" aria-label="افزودن به سبد خرید">
            افزودن به سبد خرید
          </button>
        </div>
        <PriceDisplay newPrice={newPrice} oldPrice={oldPrice} discount={discount} />
      </div>
    </div>
  );
};

export default AddToCartButtonMobile;
