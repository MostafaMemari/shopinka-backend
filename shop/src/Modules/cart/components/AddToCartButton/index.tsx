// src/components/AddToCartButton.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ProductDetails } from '@/Modules/product/types/productType';
import { cn } from '@/shared/utils/utils';
import { CartItem } from '../../types/cartType';
import { useCart } from '../../hooks/useCart';
import CartItemControls from '../../views/CartItemControls';

interface Props {
  product?: ProductDetails;
  onAddToCart?: (quantity: number) => void;
}

export default function AddToCartButton({ product: propProduct, onAddToCart }: Props) {
  const { product: stateProduct, selectedVariant } = useSelector((state: RootState) => state.product);
  const product = propProduct || stateProduct;

  const { cart, setCart, increaseCount } = useCart();
  const [existingProduct, setExistingProduct] = useState<CartItem | undefined>();

  const newPrice = useMemo(() => (selectedVariant ? selectedVariant.salePrice : product?.salePrice), [selectedVariant, product]);

  const oldPrice = useMemo(() => (selectedVariant ? selectedVariant.basePrice : product?.basePrice), [selectedVariant, product]);

  const discount = useMemo(() => {
    if (newPrice && oldPrice) {
      return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
    }
    return 0;
  }, [newPrice, oldPrice]);

  useEffect(() => {
    if (!product) return;

    const cartItemId = product.type === 'VARIABLE' ? (selectedVariant?.id ?? product.id) : product.id;

    const found = cart.find((item) => item.id === cartItemId);
    setExistingProduct(found);
  }, [cart, product, selectedVariant]);

  if (!product || !newPrice) return null;
  if (product.type === 'VARIABLE' && !selectedVariant) return null;

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
        count: 1,
        type: product.type,
        attributeValues: selectedVariant?.attributeValues ?? [],
      };

      setCart([...cart, cartItem]);
    }

    onAddToCart?.(1);
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
