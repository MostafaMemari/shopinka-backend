'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ProductDetails } from '@/Modules/product/types/productType';

interface Props {
  product: ProductDetails;
  onAddToCart?: (quantity: number) => void; // برای ارسال تعداد به سبد خرید
}

export default function AddToCartButton({ product, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { selectedVariant } = useSelector((state: RootState) => state.product);

  // بررسی اینکه آیا دکمه باید فعال باشه
  const isButtonDisabled = product.type === 'VARIABLE' && !selectedVariant;

  return (
    <div className="flex items-center gap-4">
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
        className={`flex-1 rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-white transition-opacity hover:opacity-90 ${
          isButtonDisabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={isButtonDisabled}
        onClick={() => onAddToCart && onAddToCart(quantity)}
      >
        {isButtonDisabled ? 'لطفاً گزینه‌های محصول را انتخاب کنید' : 'افزودن به سبد خرید'}
      </button>
    </div>
  );
}
