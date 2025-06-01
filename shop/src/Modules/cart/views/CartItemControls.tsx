import { useCart } from '../hooks/useCart';
import { CartItem } from '../types/cartType';
import { FaRegTrashAlt } from 'react-icons/fa';
import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi';

export default function CartItemControls({ product }: { product: CartItem }) {
  const { decreaseCount, increaseCount, deleteFromCart } = useCart();

  return (
    <>
      <div className="flex h-10 w-24 items-center justify-between rounded-lg border px-2 py-1">
        <button type="button" onClick={() => increaseCount(product)}>
          <HiOutlinePlus className="h-5 w-5 text-primary" />
        </button>

        <span className="font-bold">{product.count}</span>

        {product.count > 1 ? (
          <button type="button" onClick={() => decreaseCount(product)}>
            <HiOutlineMinus className="h-5 w-5 text-red-600 dark:text-red-500" />
          </button>
        ) : (
          <button type="button" onClick={() => deleteFromCart(product.id)}>
            <FaRegTrashAlt className="h-5 w-5 text-red-600 dark:text-red-500" />
          </button>
        )}
      </div>
    </>
  );
}
