'use client';

import { useVariant } from '../VariantProvider';
import { ProductDetails, productVariant } from '@/Modules/product/types/productType';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addToCart } from '@/store/slices/cartSlice';
import { useState } from 'react';

interface Props {
  product: ProductDetails;
}

export default function AddToCartButton({ product }: Props) {
  const dispatch = useDispatch();
  const { selectedVariant, selectedColor, selectedButton } = useVariant();
  const [quantity, setQuantity] = useState(1);
  const isVariableProduct = product.variants.length > 0;

  const handleAddToCart = () => {
    if (isVariableProduct && !selectedVariant) {
      // Show error message for variable products without selection
      return;
    }

    const item = {
      variant:
        selectedVariant ||
        ({
          id: product.id,
          sku: product.sku,
          mainImageId: product.mainImageId,
          productId: product.id,
          orderId: 0,
          userId: product.userId,
          shortDescription: product.shortDescription,
          quantity: product.quantity,
          basePrice: product.basePrice,
          salePrice: product.salePrice,
          width: product.width,
          height: product.height,
          length: product.length,
          weight: product.weight,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          attributeValues: [],
          mainImage: product.mainImage,
        } as productVariant),
      quantity,
    };

    dispatch(addToCart(item));
  };

  // Check if we have a valid variant selection
  const hasValidSelection = () => {
    if (!isVariableProduct) return true;

    // If product has only color attribute
    if (product.attributes.some((attr) => attr.type === 'COLOR') && !product.attributes.some((attr) => attr.type === 'BUTTON')) {
      return !!selectedColor;
    }

    // If product has only button attribute
    if (!product.attributes.some((attr) => attr.type === 'COLOR') && product.attributes.some((attr) => attr.type === 'BUTTON')) {
      return !!selectedButton;
    }

    // If product has both attributes
    return !!selectedColor && !!selectedButton;
  };

  const isDisabled = isVariableProduct && !hasValidSelection();

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
