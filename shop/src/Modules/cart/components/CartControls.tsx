'use client';

import { cn } from '@/shared/utils/utils';
import { FaRegTrashAlt } from 'react-icons/fa';
import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi';
import { CartItemState } from '@/types/cartType';
import { PulseLoader } from 'react-spinners';
import { useCart } from '@/hooks/reactQuery/cart/useCart';

interface CartControlsProps {
  product: CartItemState;
  className?: string;
}

export function CartControls({ product, className }: CartControlsProps) {
  const { increaseCount, decreaseCount, deleteFromCart, isUpdatingQuantity, isRemovingItem } = useCart();

  const isLoading = isUpdatingQuantity || isRemovingItem;

  return (
    <div
      className={cn(
        'flex h-12 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-2 py-1 shadow-sm transition-all dark:border-gray-700 dark:bg-gray-800',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => increaseCount(product)}
        className="flex h-8 w-8 items-center justify-center rounded-md text-primary transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
        aria-label="افزایش تعداد"
        disabled={isLoading}
      >
        <HiOutlinePlus className="h-5 w-5" />
      </button>

      <div className="flex h-9 w-8 items-center justify-center">
        {isLoading ? (
          <PulseLoader color="var(--color-primary, #10b981)" size={6} loading aria-label="در حال بارگذاری" />
        ) : (
          <span className="w-full text-center font-bold text-gray-900 dark:text-gray-100">{product.count}</span>
        )}
      </div>

      {product.count > 1 ? (
        <button
          type="button"
          onClick={() => decreaseCount(product)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-primary transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          aria-label="کاهش تعداد"
          disabled={isLoading}
        >
          <HiOutlineMinus className="h-5 w-5" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => deleteFromCart(product)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-primary transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          aria-label="حذف از سبد خرید"
          disabled={isLoading}
        >
          <FaRegTrashAlt className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

export default CartControls;
