import { useCart } from '@/hooks/reactQuery/cart/useCart';
import React from 'react';
import { LuShoppingCart } from 'react-icons/lu';

interface CartIconTotalQuantityProps {
  isLogin: boolean;
}

function CartIconTotalQuantity({ isLogin }: CartIconTotalQuantityProps) {
  const { cart } = useCart(isLogin);

  const totalQuantity = cart.items?.reduce((sum, item) => sum + item.count, 0) || 0;

  return (
    <div className="relative">
      <LuShoppingCart size={22} />

      {totalQuantity > 0 && (
        <span
          className={`absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-md bg-primary-btn text-sm font-bold text-white border border-white`}
        >
          {totalQuantity}
        </span>
      )}
    </div>
  );
}

export default CartIconTotalQuantity;
