// src/components/AddToCartButtonMobile.tsx
'use client';

import { CartButtonContent } from './CartButtonContent';
import PriceDisplay from '../../../productDetails/components/PriceDisplay';
import { useCartLogic } from '../../hooks/useCartLogic';

export default function AddToCartButtonMobile() {
  const { product, newPrice, isVariableProduct, isVariantSelected, isInCart, existingProduct, addToCart } = useCartLogic();

  if (!product || !newPrice) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-10 bg-muted p-5">
      <div className="flex items-center justify-between gap-x-6">
        <div className="flex grow items-center gap-2">
          <CartButtonContent
            isVariableProduct={isVariableProduct}
            isVariantSelected={isVariantSelected}
            isInCart={isInCart}
            existingProduct={existingProduct}
            addToCart={addToCart}
            className="flex-1"
          />
          <PriceDisplay />
        </div>
      </div>
    </div>
  );
}
