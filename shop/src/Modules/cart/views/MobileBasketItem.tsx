import Link from 'next/link';
import { CartItemState } from '@/types/cartType';
import CartControls from '@/components/cart/CartControls';
import ProductCardImage from '@/components/cart/ProductCartImage';
import CartItemAttributes from '@/components/cart/CartItemAttributes';
import ProductPriceCard from '@/components/cart/ProductPriceCart';

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
          <ProductPriceCard oldPrice={item.basePrice} newPrice={item.salePrice} discount={item.discount} />

          <CartControls product={item} />
        </div>
      </div>
    </div>
  );
}
