import Image from "next/image";
import Link from "next/link";
import { HiOutlineMinus, HiOutlinePlus, HiOutlineX } from "react-icons/hi";

export interface ItemCardBasketProp {
  item: {
    title: string;
    image: string;
    quantity: number;
    color: string;
    colorHex: string;
    price: number;
  };
}

export default function DesktopBasketItem({ item }: ItemCardBasketProp) {
  return (
    <div className="flex gap-x-2 py-5">
      <div className="relative min-w-fit">
        <Link href="/product-detail">
          <Image alt={item?.title} className="h-[120px] w-[120px]" src={item?.image} width={120} height={120} loading="lazy" />
        </Link>
        <button className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background" type="button">
          <HiOutlineX className="h-6 w-6 text-red-600 dark:text-red-500" />
        </button>
      </div>

      <div className="w-full space-y-1.5">
        <Link className="line-clamp-2 h-12" href="/product-detail">
          {item?.title}
        </Link>

        <div className="flex items-center gap-x-2 text-sm text-text/60">
          <div>تعداد : {item?.quantity}</div>
          <div className="h-3 w-px rounded-full bg-background"></div>
          <div className="flex items-center gap-x-2">
            <span className="h-4 w-4 rounded-full" style={{ background: item?.colorHex }}></span>
            <span>{item?.color}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-x-2">
          <div className="text-primary">
            <span className="text-lg font-bold">{item?.price.toLocaleString("fa-IR")}</span>
            <span className="text-sm"> تومان</span>
          </div>

          <div className="flex h-10 w-24 items-center justify-between rounded-lg border px-2 py-1">
            <button type="button" data-action="increment">
              <HiOutlinePlus className="h-5 w-5 text-primary" />
            </button>
            <input
              value={item?.quantity}
              disabled
              type="number"
              className="flex h-5 w-full grow select-none items-center justify-center bg-transparent text-center text-sm outline-hidden"
            />
            <button type="button" data-action="decrement">
              <HiOutlineMinus className="h-5 w-5 text-red-600 dark:text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
