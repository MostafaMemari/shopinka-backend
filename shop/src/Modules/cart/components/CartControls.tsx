// src/components/CartControls.tsx
import { cn } from '@/shared/utils/utils';
import { CartItem } from '@/Modules/cart/types/cartType';
import { FaRegTrashAlt } from 'react-icons/fa';
import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi';
import { useCart } from '../hooks/useCart';

interface CartControlsProps {
  product: CartItem;
  className?: string;
}

export function CartControls({ product, className }: CartControlsProps) {
  const { decreaseCount, increaseCount, deleteFromCart } = useCart();

  return (
    <div
      className={cn(
        'flex h-10 w-28 items-center justify-between rounded-lg border border-gray-200 bg-white px-2 py-1 shadow-sm transition-all dark:border-gray-700 dark:bg-gray-800',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => increaseCount(product)}
        className="flex h-8 w-8 items-center justify-center rounded-md text-primary transition-colors"
        aria-label="افزایش تعداد"
      >
        <HiOutlinePlus className="h-5 w-5" />
      </button>

      <span className="w-8 text-center font-bold text-gray-900 ">{product.count}</span>

      {product.count > 1 ? (
        <button
          type="button"
          onClick={() => decreaseCount(product)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-primary transition-colors"
          aria-label="کاهش تعداد"
        >
          <HiOutlineMinus className="h-5 w-5" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => deleteFromCart(product.id)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-primary transition-colors"
          aria-label="حذف از سبد خرید"
        >
          <FaRegTrashAlt className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

export default CartControls;
