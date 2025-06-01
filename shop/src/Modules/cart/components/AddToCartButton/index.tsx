'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ProductDetails } from '@/Modules/product/types/productType';
import { useCart } from '../../hooks/useCart';
import { CartItem } from '../../types/cartType';
import CartItemControls from '../../views/CartItemControls';
import { cn } from '@/shared/utils/utils';

interface Props {
  product: ProductDetails;
  onAddToCart?: (quantity: number) => void;
}

export default function AddToCartButton({ product, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { selectedVariant } = useSelector((state: RootState) => state.product);

  const [existingProduct, setExistingProduct] = useState<CartItem>();

  const { cart, setCart } = useCart();

  const addToCart = () => {
    const updatedCart = [...cart];

    const cartItem = {
      id: product.id,
      title: product.name,
      thumbnail: product.mainImage?.fileUrl ?? '',
      price: product.basePrice ?? 0,
      discount_price: product.salePrice ?? 0,
      discount: 5,
      count: 1,
      type: product.type,
    };

    updatedCart.push(cartItem);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  useEffect(() => {
    setExistingProduct(cart.find((item) => item.id === product.id));
  }, [cart, product.id]);

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
            'flex-1 rounded-lg bg-[hsl(var(--primary))] cursor-pointer px-4 py-2 text-white transition-opacity hover:opacity-90',
            isButtonDisabled && 'cursor-not-allowed opacity-50',
          )}
          onClick={addToCart}
        >
          افزودن به سبد
        </button>
      )}
    </div>
  );
}
