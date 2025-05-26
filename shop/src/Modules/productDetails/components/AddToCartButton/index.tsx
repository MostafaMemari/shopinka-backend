'use client';

import { useVariant } from '../VariantProvider';
import { ProductDetails } from '@/Modules/product/types/productType';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addToCart } from '@/store/slices/cartSlice';
import { useState } from 'react';

interface Props {
  product: ProductDetails;
}

export default function AddToCartButton({ product }: Props) {
  const dispatch = useDispatch();
  const { selectedVariant } = useVariant();
  const [quantity, setQuantity] = useState(1);
  const isVariableProduct = product.variants.length > 0;

  const handleAddToCart = () => {
    if (isVariableProduct && !selectedVariant) {
      // Show error message for variable products without selection
      return;
    }

    const item = {
      variant: selectedVariant || {
        id: product.id,
        name: product.name,
        price: product.salePrice || product.basePrice,
        stock: product.quantity,
        attributeValues: [],
        mainImage: product.mainImage,
      },
      quantity,
    };

    dispatch(addToCart(item));
  };

  const isDisabled = isVariableProduct && !selectedVariant;

  return (
    <div className="flex items-center gap-4">
      {/* <div className="flex items-center gap-2">
        <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} className="rounded-full border p-2 hover:bg-muted">
          -
        </button>
        <span className="w-8 text-center">{quantity}</span>
        <button onClick={() => setQuantity((prev) => prev + 1)} className="rounded-full border p-2 hover:bg-muted">
          +
        </button>
      </div> */}
      <button
        onClick={handleAddToCart}
        disabled={isDisabled}
        className={`flex-1 rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-white transition-opacity hover:opacity-90 ${
          isDisabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        {isDisabled ? 'لطفا گزینه‌های محصول را انتخاب کنید' : 'افزودن به سبد خرید'}
      </button>
    </div>
  );
}
