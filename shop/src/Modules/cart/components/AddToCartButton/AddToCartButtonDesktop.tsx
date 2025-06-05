'use client';

import { CartButtonContent } from './CartButtonContent';
import { useCartLogic } from '../../hooks/useCartLogic';
import { ProductCardLogic } from '../../types/productCardLogic';

interface AddToCartButtonDesktopProps {
  product: ProductCardLogic;
}

export function AddToCartButtonDesktop({ product }: AddToCartButtonDesktopProps) {
  const { isVariableProduct, isVariantSelected, isInCart, existingProduct, addToCart, isAddingToCart } = useCartLogic({ product });

  return (
    <div className="mb-6 flex items-center gap-4">
      <CartButtonContent
        isVariableProduct={isVariableProduct}
        isVariantSelected={isVariantSelected}
        isInCart={isInCart}
        existingProduct={existingProduct}
        addToCart={addToCart}
        isAddingToCart={isAddingToCart}
        className="w-full py-3"
      />
    </div>
  );
}

export default AddToCartButtonDesktop;
