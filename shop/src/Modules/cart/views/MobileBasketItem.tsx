// src/components/MobileBasketItem.tsx
import { formatPrice } from '@/shared/utils/formatter';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineMinus, HiOutlinePlus, HiOutlineX } from 'react-icons/hi';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../types/cartType';
import { AttributeValues } from '@/shared/types/attributeType';

interface MobileBasketItemProp {
  item: CartItem;
  onRemove: () => void;
}

export default function MobileBasketItem({ item, onRemove }: MobileBasketItemProp) {
  const { increaseCount, decreaseCount } = useCart();

  // استخراج ویژگی‌ها برای نمایش
  const attributes = item.type === 'VARIABLE' && item.attributeValues ? item.attributeValues : [];

  return (
    <div className="flex gap-x-2 py-5">
      <div className="relative min-w-fit">
        <Link href={`/product-detail/${item.id}`}>
          <Image alt={item.title} className="h-20 w-20" src={item.thumbnail} width={80} height={80} loading="lazy" />
        </Link>
        <button
          className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background"
          type="button"
          onClick={onRemove}
        >
          <HiOutlineX className="h-6 w-6 text-red-600 dark:text-red-500" />
        </button>
      </div>

      <div className="w-full space-y-1.5">
        <Link href={`/product-detail/${item.id}`} className="line-clamp-2 h-10 text-sm">
          {item.title}
        </Link>
        <div className="flex items-center gap-x-2 text-xs text-text/60">
          <div>تعداد: {item.count}</div>
          {item.type === 'VARIABLE' && attributes.length > 0 && (
            <>
              <div className="h-3 w-px rounded-full bg-background"></div>
              <div className="flex flex-wrap items-center gap-x-2">
                {attributes.map((attr: AttributeValues, index: number) => (
                  <div key={attr.id || index} className="flex items-center gap-x-2">
                    {attr.colorCode ? (
                      <>
                        <span className="h-4 w-4 rounded-full" style={{ background: attr.colorCode || '#000' }}></span>
                        <span>رنگ: {attr.name}</span>
                      </>
                    ) : attr.buttonLabel ? (
                      <span>{attr.buttonLabel}</span>
                    ) : (
                      <span>{attr.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <div className="text-primary">
            <span className="font-bold">{formatPrice(item.price)}</span>
            <span className="text-xs"> تومان</span>
          </div>
          <div className="flex h-8 w-20 justify-between rounded-lg border px-2 py-1">
            <button type="button" onClick={() => increaseCount(item)}>
              <HiOutlinePlus className="h-5 w-5 text-primary" />
            </button>
            <input
              value={item.count}
              disabled
              type="number"
              className="flex h-5 w-5 select-none items-center justify-center bg-transparent text-center text-sm outline-none"
            />
            <button type="button" onClick={() => decreaseCount(item)}>
              <HiOutlineMinus className="h-5 w-5 text-red-600 dark:text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
