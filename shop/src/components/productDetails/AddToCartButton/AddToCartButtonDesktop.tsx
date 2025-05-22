'use client';

import { FC } from 'react';

interface Props {
  onAddToCart?: () => void;
}

const AddToCartButtonDesktop: FC<Props> = ({ onAddToCart }) => {
  return (
    <div className="mb-6">
      <button onClick={onAddToCart} className="btn-primary w-full py-3" aria-label="افزودن به سبد خرید">
        افزودن به سبد خرید
      </button>
    </div>
  );
};

export default AddToCartButtonDesktop;
