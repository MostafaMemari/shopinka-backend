'use client';

import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface Props {
  onAddToCart?: (quantity: number) => void;
  productType: string; // برای بررسی نوع محصول
}

const AddToCartButtonDesktop: FC<Props> = ({ onAddToCart, productType }) => {
  const [quantity, setQuantity] = useState(1);
  const { selectedVariant } = useSelector((state: RootState) => state.product);

  // بررسی اینکه آیا دکمه باید فعال باشه
  const isButtonDisabled = productType === 'VARIABLE' && !selectedVariant;

  return (
    <div className="mb-6 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          className="rounded-full border p-2 hover:bg-muted"
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="w-8 text-center">{quantity}</span>
        <button onClick={() => setQuantity((prev) => prev + 1)} className="rounded-full border p-2 hover:bg-muted">
          +
        </button>
      </div>
      <button
        onClick={() => onAddToCart && onAddToCart(quantity)}
        className={`btn-primary w-full py-3 ${isButtonDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={isButtonDisabled}
        aria-label={isButtonDisabled ? 'لطفاً گزینه‌های محصول را انتخاب کنید' : 'افزودن به سبد خرید'}
      >
        {isButtonDisabled ? 'لطفاً گزینه‌های محصول را انتخاب کنید' : 'افزودن به سبد خرید'}
      </button>
    </div>
  );
};

export default AddToCartButtonDesktop;
