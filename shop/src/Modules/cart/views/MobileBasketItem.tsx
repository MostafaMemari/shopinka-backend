// src/components/MobileBasketItem.tsx
import { formatPrice } from '@/shared/utils/formatter';
import Image from 'next/image';
import Link from 'next/link';
import { CartItemState } from '../types/cartType';
import { AttributeValues } from '@/shared/types/attributeType';
import CartControls from '../components/CartControls';
import ProductCardImage from '../components/ProductCardImage';
import CartItemAttributes from '../components/CartItemAttributes';

interface MobileBasketItemProp {
  item: CartItemState;
}

export default function MobileBasketItem({ item }: MobileBasketItemProp) {
  const attributes = item.type === 'VARIABLE' && item.attributeValues ? item.attributeValues : [];

  return (
    <div className="flex gap-x-2 py-5">
      <div className="relative min-w-fit">
        <ProductCardImage title={item.title} thumbnail={item.thumbnail} />
      </div>

      <div className="w-full space-y-1.5">
        <Link href={`/product-detail/`} className="line-clamp-2 h-10 text-sm">
          {item.title}
        </Link>
        <div className="flex items-center gap-x-2 text-xs text-text/60">
          <CartItemAttributes count={item.count} type={item.type} attributes={attributes} />
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <div className="text-primary">
            <span className="font-bold">{formatPrice(item.salePrice)}</span>
            <span className="text-xs"> تومان</span>
          </div>

          <CartControls product={item} />
        </div>
      </div>
    </div>
  );
}
