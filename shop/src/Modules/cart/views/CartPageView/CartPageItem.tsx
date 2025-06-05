import React from 'react';
import ProductCartImage from '../../components/ProductCartImage';
import Link from 'next/link';
import { CartItemState } from '../../types/cartType';
import CartItemAttributes from '../../components/CartItemAttributes';
import ProductPriceCard from '../../components/ProductPriceCart';
import CartControls from '../../components/CartControls';

interface CartPageItemProps {
  cartItem: CartItemState;
}

function CartPageItem({ cartItem }: CartPageItemProps) {
  const attributes = cartItem.type === 'VARIABLE' && cartItem.attributeValues ? cartItem.attributeValues : [];

  return (
    <li>
      <div className="py-4 sm:py-6">
        <div className="grid grid-cols-2 items-center justify-start gap-2 xs:grid-cols-3 xs:gap-6 sm:grid-cols-4 xl:grid-cols-6">
          <div className="row-span-2 min-w-fit xs:mx-auto">
            <ProductCartImage thumbnail={cartItem.thumbnail} title={cartItem.title} />
          </div>
          <div className="row-span-2 space-y-4 xs:col-span-2 sm:col-span-3 xl:col-span-5">
            <Link href={`/product-detail/`} className="line-clamp-2 h-10 text-md">
              {cartItem.title}
            </Link>
            <div className="flex items-center gap-x-2">
              <CartItemAttributes count={cartItem.count} type={cartItem.type} attributes={attributes} />
            </div>
          </div>
          <div className="flex items-center gap-x-2 xs:justify-center">
            <div className="flex h-10 w-24 items-center justify-between gap-x-3 rounded-lg border py-1 sm:w-28">
              <CartControls product={cartItem} />
            </div>
          </div>

          <div className="text-primary xs:col-span-2 sm:col-span-3 lg:text-lg xl:col-span-5">
            <ProductPriceCard oldPrice={cartItem.basePrice} newPrice={cartItem.salePrice} discount={cartItem.discount} />
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartPageItem;
