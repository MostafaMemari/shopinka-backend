// src/components/AddToCartButton.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ProductDetails } from '@/Modules/product/types/productType';
import { cn } from '@/shared/utils/utils';
import { CartItem } from '../../types/cartType';
import { useCart } from '../../hooks/useCart';
import CartItemControls from '../../views/CartItemControls';

interface Props {
  product?: ProductDetails; // اختیاری کردن product به دلیل استفاده از useSelector
  onAddToCart?: (quantity: number) => void;
}

export default function AddToCartButton({ product: propProduct, onAddToCart }: Props) {
  const { product: stateProduct, selectedVariant } = useSelector((state: RootState) => state.product);
  const product = propProduct || stateProduct; // استفاده از propProduct اگر ارائه شده باشد، وگرنه stateProduct

  if (!product) return null;

  if (product.type === 'VARIABLE' && !selectedVariant) return null;

  const newPrice = selectedVariant ? selectedVariant.salePrice : product.salePrice;
  const oldPrice = selectedVariant ? selectedVariant.basePrice : product.basePrice;
  const discount = newPrice && oldPrice ? Math.round(((oldPrice - newPrice) / oldPrice) * 100) : 0;

  if (!newPrice) return null;

  const [quantity, setQuantity] = useState(1);
  const { cart, setCart, increaseCount, decreaseCount } = useCart();
  const [existingProduct, setExistingProduct] = useState<CartItem | undefined>();

  useEffect(() => {
    const cartItemId = product.type === 'VARIABLE' ? (selectedVariant?.id ?? product.id) : product.id;
    setExistingProduct(cart.find((item) => item.id === cartItemId));
  }, [cart, product.id, product.type, selectedVariant]);

  const addToCart = () => {
    if (existingProduct) {
      increaseCount(existingProduct);
    } else {
      const cartItem: CartItem = {
        id: product.type === 'VARIABLE' ? (selectedVariant?.id ?? product.id) : product.id,
        title: product.name,
        thumbnail: product.mainImage?.fileUrl ?? '',
        price: newPrice,
        discount_price: oldPrice ?? newPrice,
        discount: discount ?? 0,
        count: quantity,
        type: product.type,
        attributeValues: selectedVariant?.attributeValues ?? [],
      };

      setCart([...cart, cartItem]);
    }

    if (onAddToCart) {
      onAddToCart(quantity);
    }
  };

  const isButtonDisabled = product.type === 'VARIABLE' && !selectedVariant;

  return (
    <div className="flex items-center gap-4">
      {existingProduct ? (
        <div className="w-full">
          <CartItemControls product={existingProduct} />
        </div>
      ) : (
        <button
          className={cn(
            'flex-1 rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-white transition-opacity hover:opacity-90',
            isButtonDisabled && 'cursor-not-allowed opacity-50',
          )}
          onClick={addToCart}
          disabled={isButtonDisabled}
        >
          افزودن به سبد
        </button>
      )}
    </div>
  );
}
