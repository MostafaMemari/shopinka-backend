// src/components/AddToCartButton.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ProductDetails } from '@/Modules/product/types/productType';
import { CartItem } from '@/Modules/cart/types/cartType';
import { cn } from '@/shared/utils/utils';
import { useCart } from '../../hooks/useCart';
import CartItemControls from '../../views/CartItemControls';

interface Props {
  product: ProductDetails;
  onAddToCart?: (quantity: number) => void;
}

export default function AddToCartButton({ product, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { selectedVariant } = useSelector((state: RootState) => state.product);
  const { cart, setCart, increaseCount, decreaseCount } = useCart();
  const [existingProduct, setExistingProduct] = useState<CartItem | undefined>();

  // به‌روزرسانی existingProduct وقتی سبد خرید یا product.id تغییر می‌کنه
  useEffect(() => {
    setExistingProduct(cart.find((item) => item.id === product.id));
  }, [cart, product.id]);

  const addToCart = () => {
    if (existingProduct) {
      // اگر محصول وجود داره، فقط تعدادش رو افزایش بده
      increaseCount(existingProduct);
    } else {
      // اضافه کردن محصول جدید به سبد خرید
      const cartItem: CartItem = {
        id: product.id,
        title: product.name,
        thumbnail: product.mainImage?.fileUrl ?? '',
        price: product.basePrice ?? 0,
        discount_price: product.salePrice ?? 0,
        discount: product.salePrice
          ? Math.round((((product.basePrice ?? 0) - (product.salePrice ?? 0)) / (product.basePrice ?? 1)) * 100)
          : 0,
        count: quantity,
        type: product.type,
      };

      setCart([...cart, cartItem]);
    }

    // اجرای callback اگر وجود داشته باشه
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
