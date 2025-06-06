import React from 'react';
import ProductCartImage from '../../components/ProductCartImage';
import Link from 'next/link';
import { CartItemState } from '../../types/cartType';
import CartItemAttributes from '../../components/CartItemAttributes';
import ProductPriceCard from '../../components/ProductPriceCart';
import CartControls from '../../components/CartControls';

interface CartPageItemProps {
  cartItem: CartItemState;
  isLast?: boolean; // Added to control border for the last item
}

function CartPageItem({ cartItem, isLast = false }: CartPageItemProps) {
  const attributes = cartItem.type === 'VARIABLE' && cartItem.attributeValues ? cartItem.attributeValues : [];

  return (
    <div className={`py-4 ${!isLast ? 'border-b border-gray-200' : ''}`}>
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-4 sm:col-span-3 flex flex-col items-center gap-2">
          <div className="w-24 h-24 sm:w-28 sm:h-28">
            <ProductCartImage thumbnail={cartItem.thumbnail} title={cartItem.title} />
          </div>

          <div className="w-24 flex justify-center">
            <CartControls product={cartItem} />
          </div>
        </div>

        <div className="col-span-8 sm:col-span-9 space-y-2">
          <Link
            href={`/product-detail/${cartItem.id}`}
            className="line-clamp-2 text-sm sm:text-base font-semibold text-gray-900 leading-snug hover:text-blue-600"
          >
            {cartItem.title}
          </Link>

          <div className="space-y-1 text-xs text-gray-500">
            <CartItemAttributes count={cartItem.count} type={cartItem.type} attributes={attributes} />
          </div>

          <div className="text-blue-600 text-sm font-bold pt-1">
            <ProductPriceCard oldPrice={cartItem.basePrice} newPrice={cartItem.salePrice} discount={cartItem.discount} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPageItem;
