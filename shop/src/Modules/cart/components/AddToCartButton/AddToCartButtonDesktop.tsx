// src/components/AddToCartButtonDesktop.tsx
'use client';

import { CartButtonContent } from './CartButtonContent';
import { useCartLogic } from '../../hooks/useCartLogic';

export default function AddToCartButtonDesktop() {
  const { product, newPrice, isVariableProduct, isVariantSelected, isInCart, existingProduct, addToCart } = useCartLogic();

  if (!product || !newPrice) return null;

  return (
    <div className="mb-6 flex items-center gap-4">
      <CartButtonContent
        isVariableProduct={isVariableProduct}
        isVariantSelected={isVariantSelected}
        isInCart={isInCart}
        existingProduct={existingProduct}
        addToCart={addToCart}
        className="w-full py-3"
      />
    </div>
  );
}
