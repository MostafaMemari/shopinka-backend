// src/components/DesktopBasketDropdown.tsx
'use client';

import Link from 'next/link';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import DesktopBasketItem from './DesktopBasketItem';
import { formatPrice } from '@/shared/utils/formatter';
// import { toast } from 'react-toastify';
import { useCart } from '../hooks/useCart';

export default function DesktopBasketDropdown() {
  const { cart, totalPrice, isLoading, error } = useCart();

  console.log(cart);

  // نمایش پیام خطا اگه API مشکل داشت
  // React.useEffect(() => {
  //   if (error) {
  //     toast.error(`خطا در بارگذاری سبد خرید: ${error.message}`);
  //   }
  // }, [error]);

  return (
    <></>

    // <div
    //   className={`
    //     absolute left-0 top-full z-10 w-[400px] overflow-hidden rounded-lg border-t-2 border-t-primary bg-muted shadow-lg
    //     origin-top transition-all duration-300 ease-out
    //     opacity-0 scale-95 -translate-y-2 pointer-events-none
    //     group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto
    //   `}
    // >
    //   <div className="flex items-center justify-between p-5 pb-2">
    //     <div className="text-sm text-text/90">{cart.length} مورد</div>
    //     <Link className="flex items-center gap-x-1 text-sm text-primary" href="/checkout-cart">
    //       <div>مشاهده سبد خرید</div>
    //       <div>
    //         <HiOutlineChevronLeft className="h-5 w-5" />
    //       </div>
    //     </Link>
    //   </div>

    //   <div className="h-60">
    //     {isLoading ? (
    //       <div className="flex h-full items-center justify-center text-sm text-text/60">در حال بارگذاری...</div>
    //     ) : (
    //       <ul className="main-scroll h-full space-y-2 divide-y overflow-y-auto p-5 pl-2">
    //         {cart.length > 0 ? (
    //           cart.map((item) => (
    //             <li key={item.id}>
    //               <DesktopBasketItem item={item} />
    //             </li>
    //           ))
    //         ) : (
    //           <div className="flex h-full items-center justify-center text-sm text-text/60">سبد خرید خالی است</div>
    //         )}
    //       </ul>
    //     )}
    //   </div>

    //   <div className="flex items-center justify-between border-t p-5">
    //     <div className="flex flex-col items-center gap-y-1">
    //       <div className="text-sm text-text/60">مبلغ قابل پرداخت</div>
    //       <div className="text-text/90">
    //         <span className="font-bold">{formatPrice(totalPrice)}</span>
    //         <span className="text-sm"> تومان</span>
    //       </div>
    //     </div>
    //     <Link href="/checkout-shipping">
    //       <button className="btn-primary w-32 py-3 text-sm" type="button" disabled={isLoading || cart.length === 0}>
    //         ثبت سفارش
    //       </button>
    //     </Link>
    //   </div>
    // </div>
  );
}
