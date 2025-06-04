import Image from 'next/image';
import Link from 'next/link';
import { CartItemState } from '../types/cartType';
import CartControls from '../components/CartControls';
import CartItemAttributes from '../components/CartItemAttributes';
import ProductPriceCard from '../components/ProductPriceCard';

export interface ItemCardBasketProp {
  item: CartItemState;
}

export default function DesktopBasketItem({ item }: ItemCardBasketProp) {
  const attributes = item.type === 'VARIABLE' && item.attributeValues ? item.attributeValues : [];

  return (
    <div className="flex gap-x-2 py-5">
      <div className="relative min-w-fit">
        <Link href={`/product-detail/${item.id}`}>
          <Image alt={item.title} className="h-[120px] w-[120px]" src={item?.thumbnail ?? ''} width={120} height={120} loading="lazy" />
        </Link>
      </div>

      <div className="w-full space-y-1.5">
        <Link className="line-clamp-2 h-12" href={`/product-detail/${item.id}`}>
          {item.title}
        </Link>

        <div className="flex items-center gap-x-2 text-sm text-text/60">
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
