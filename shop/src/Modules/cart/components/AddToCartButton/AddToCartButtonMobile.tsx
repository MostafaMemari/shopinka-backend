'use client';

import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import PriceDisplay from '../../../productDetails/components/PriceDisplay';

interface Props {
  onAddToCart?: (quantity: number) => void;
  productType: string; // برای بررسی نوع محصول
}

const AddToCartButtonMobile: FC<Props> = ({ onAddToCart, productType }) => {
  const [quantity, setQuantity] = useState(1);
  const { product, selectedVariant } = useSelector((state: RootState) => state.product);

  // بررسی اینکه آیا دکمه باید فعال باشه
  const isButtonDisabled = productType === 'VARIABLE' && !selectedVariant;

  // محاسبه قیمت‌ها و تخفیف از Redux
  const newPrice = selectedVariant ? selectedVariant.salePrice : product?.salePrice;
  const oldPrice = selectedVariant ? selectedVariant.basePrice : product?.basePrice;

  if (!product) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-10 bg-muted p-5">
      <div className="flex items-center justify-between gap-x-6">
        <div className="flex grow items-center gap-2">
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
          <button
            onClick={() => onAddToCart && onAddToCart(quantity)}
            className={`btn-primary w-full px-4 py-3 text-sm ${isButtonDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={isButtonDisabled}
            aria-label={isButtonDisabled ? 'لطفاً گزینه‌های محصول را انتخاب کنید' : 'افزودن به سبد خرید'}
          >
            {isButtonDisabled ? 'لطفاً گزینه‌های محصول را انتخاب کنید' : 'افزودن به سبد خرید'}
          </button>
        </div>
        <PriceDisplay />
      </div>
    </div>
  );
};

export default AddToCartButtonMobile;
