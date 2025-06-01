import { BiMinus, BiPlus } from 'react-icons/bi';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../types/cartType';
import { BsTrash2 } from 'react-icons/bs';

export default function CartItemControls({ product, vertical }: { product: CartItem; vertical?: boolean }) {
  const { decreaseCount, increaseCount, deleteFromCart } = useCart();

  return (
    <div className={`border shadow flex items-center justify-between gap-5 rounded-md text-red-500 p-2 ${vertical ? 'flex-col' : ''}`}>
      <button>
        <BiPlus onClick={() => increaseCount(product)} size={20} />
      </button>
      <span className="font-bold">{product.count}</span>
      <button>
        {product.count > 1 ? (
          <BiMinus onClick={() => decreaseCount(product)} size={20} />
        ) : (
          <BsTrash2
            onClick={() => {
              deleteFromCart(product.id);
            }}
            size={16}
          />
        )}
      </button>
    </div>
  );
}
