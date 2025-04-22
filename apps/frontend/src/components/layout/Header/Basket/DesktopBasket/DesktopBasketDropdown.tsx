import Link from "next/link";
import Image from "next/image";
import { HiOutlineChevronLeft, HiOutlinePlusCircle, HiOutlineMinusCircle, HiOutlineX } from "react-icons/hi";

const DesktopBasketDropdown = () => {
  return (
    <div
      className={`
        absolute left-0 top-full z-10 w-[400px] overflow-hidden rounded-lg border-t-2 border-t-primary bg-muted shadow-lg
        origin-top transition-all duration-300 ease-out
        opacity-0 scale-95 -translate-y-2 pointer-events-none
        group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto
      `}
    >
      {/* Head */}
      <div className="flex items-center justify-between p-5 pb-2">
        <div className="text-sm text-text/90">10 مورد</div>
        <Link className="flex items-center gap-x-1 text-sm text-primary" href="/checkout-cart">
          <div>مشاهده سبد خرید</div>
          <div>
            <HiOutlineChevronLeft className="h-5 w-5" />
          </div>
        </Link>
      </div>

      {/* Items */}
      <div className="h-60">
        <ul className="main-scroll h-full space-y-2 divide-y overflow-y-auto p-5 pl-2">
          <li>
            <div className="flex gap-x-2 py-5">
              {/* Product Image */}
              <div className="relative min-w-fit">
                <Link href="/product-detail">
                  <Image alt="" className="h-[120px] w-[120px]" loading="lazy" src="/images/products/p1.png" width={120} height={120} />
                </Link>
                <button
                  className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background"
                  type="button"
                >
                  <HiOutlineX className="h-6 w-6 text-red-600 dark:text-red-500" />
                </button>
              </div>

              <div className="w-full space-y-1.5">
                {/* Product Title */}
                <Link className="line-clamp-2 h-12" href="/product-detail">
                  تیشرت اسپورت مردانه
                </Link>

                {/* Product Attribute */}
                <div className="flex items-center gap-x-2 text-sm text-text/60">
                  <div>تعداد : 2</div>
                  <div className="h-3 w-px rounded-full bg-background"></div>
                  <div className="flex items-center gap-x-2">
                    <span className="h-4 w-4 rounded-full" style={{ background: "rgb(128, 128, 128)" }}></span>
                    <span>طوسی</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-x-2">
                  {/* Product Price */}
                  <div className="text-primary">
                    <span className="text-lg font-bold">1,800,000</span>
                    <span className="text-sm">تومان</span>
                  </div>

                  {/* Product Quantity */}
                  <div className="flex h-10 w-24 items-center justify-between rounded-lg border px-2 py-1">
                    <button type="button" data-action="increment">
                      <HiOutlinePlusCircle className="h-5 w-5 text-primary" />
                    </button>
                    <input
                      value="1"
                      disabled
                      type="number"
                      className="flex h-5 w-full grow select-none items-center justify-center bg-transparent text-center text-sm outline-hidden"
                    />
                    <button type="button" data-action="decrement">
                      <HiOutlineMinusCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t p-5">
        <div className="flex flex-col items-center gap-y-1">
          <div className="text-sm text-text/60">مبلغ قابل پرداخت</div>
          <div className="text-text/90">
            <span className="font-bold">1,200,000</span>
            <span className="text-sm">تومان</span>
          </div>
        </div>
        <Link href="/checkout-shipping">
          <button className="btn-primary w-32 py-3 text-sm" type="button">
            ثبت سفارش
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DesktopBasketDropdown;
