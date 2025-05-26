'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addToCart } from '@/store/slices/cartSlice';
import { useVariant } from '../VariantProvider';
import { useState } from 'react';

export default function AddToCartButton() {
  const dispatch = useDispatch();
  const { selectedVariant } = useVariant();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (selectedVariant) {
      dispatch(addToCart({ variant: selectedVariant, quantity }));
    }
  };

  if (!selectedVariant) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg border text-lg"
        >
          -
        </button>
        <span className="w-8 text-center">{quantity}</span>
        <button
          onClick={() => setQuantity((prev) => prev + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border text-lg"
        >
          +
        </button>
      </div>
      <button onClick={handleAddToCart} className="flex-1 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90">
        افزودن به سبد خرید
      </button>
    </div>
  );
}
