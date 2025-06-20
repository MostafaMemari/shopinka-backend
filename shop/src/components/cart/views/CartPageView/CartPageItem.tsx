import React from 'react';
import Link from 'next/link';
import { CartItemState } from '@/types/cartType';
import CartItemAttributes from '@/components/cart/CartItemAttributes';
import CartControls from '@/components/cart/CartControls';
import ProductPrice from '@/components/productDetails/PriceDisplay';
import Image from 'next/image';

interface CartPageItemProps {
  cartItem: CartItemState;
  isLast?: boolean;
}

function CartPageItem({ cartItem, isLast = false }: CartPageItemProps) {
  const attributes = cartItem.type === 'VARIABLE' && cartItem.attributeValues ? cartItem.attributeValues : [];
  const cosnt = cartItem.count;
  const productUrl = `/product/${cartItem.slug}`;

  return (
    <div className={`py-4 ${!isLast ? 'border-b border-gray-200' : ''}`}>
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-4 sm:col-span-3 flex flex-col items-center gap-2">
          <div className="w-24 h-24 sm:w-28 sm:h-28">
            <Link href={productUrl}>
              <Image alt={cartItem.title} className="h-full w-full" src={cartItem.thumbnail} width={80} height={80} loading="lazy" />
            </Link>
          </div>

          <div className="w-24 flex justify-center">
            <CartControls product={cartItem} />
          </div>
        </div>

        <div className="col-span-8 sm:col-span-9 space-y-2">
          <Link
            href={productUrl}
            className="line-clamp-2 text-sm sm:text-base font-semibold text-gray-900 leading-snug hover:text-blue-600"
          >
            {cartItem.title}
          </Link>

          <div className="space-y-1 text-xs text-gray-500">
            <CartItemAttributes count={cartItem.count} type={cartItem.type} attributes={attributes} />
          </div>

          <div className="text-blue-600 text-sm font-bold pt-1">
            <ProductPrice product={{ basePrice: cartItem.basePrice * cosnt, salePrice: cartItem.salePrice * cosnt, type: cartItem.type }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPageItem;
