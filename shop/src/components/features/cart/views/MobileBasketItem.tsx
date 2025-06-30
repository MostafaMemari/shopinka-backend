import Link from 'next/link';
import { CartItemState } from '@/types/cartType';
import CartControls from '@/components/features/cart/CartControls';
import CartItemAttributes from '@/components/features/cart/CartItemAttributes';
import ProductPrice from '@/components/features/productDetails/PriceDisplay';
import Image from 'next/image';

interface MobileBasketItemProp {
  item: CartItemState;
}

export default function MobileBasketItem({ item }: MobileBasketItemProp) {
  const attributes = item.type === 'VARIABLE' && item.attributeValues ? item.attributeValues : [];
  const productUrl = `/product/${item.slug}`;

  return (
    <div className="flex gap-x-2 py-5">
      <div className="relative min-w-fit">
        <Link href={productUrl}>
          <Image alt={item.title} className="h-full w-full" src={item.thumbnail} width={80} height={80} loading="lazy" unoptimized />
        </Link>
      </div>

      <div className="w-full space-y-1.5">
        <Link href={productUrl} className="line-clamp-2 h-10 text-sm">
          {item.title}
        </Link>
        <div className="flex items-center gap-x-2 text-xs text-text/60">
          <CartItemAttributes count={item.count} type={item.type} attributes={attributes} />
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <ProductPrice product={{ basePrice: item.basePrice, salePrice: item.salePrice, type: item.type }} />

          <CartControls product={item} />
        </div>
      </div>
    </div>
  );
}
