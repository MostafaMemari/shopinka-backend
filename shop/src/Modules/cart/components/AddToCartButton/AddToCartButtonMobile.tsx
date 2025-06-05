// src/components/AddToCartButtonMobile.tsx
'use client';

import { CartButtonContent } from './CartButtonContent';
import { useCartLogic } from '../../hooks/useCartLogic';
import { ProductCardLogic } from '../../types/productCardLogic';

interface AddToCartButtonMobileProps {
  product: ProductCardLogic;
}

export default function AddToCartButtonMobile({ product }: AddToCartButtonMobileProps) {
  const { newPrice, isVariableProduct, isVariantSelected, isInCart, existingProduct, addToCart } = useCartLogic({ product });

  if (!product || !newPrice) return null;

  return (
    <CartButtonContent
      isVariableProduct={isVariableProduct}
      isVariantSelected={isVariantSelected}
      isInCart={isInCart}
      existingProduct={existingProduct}
      addToCart={addToCart}
      className="flex-1"
    />
  );
}
