import Link from "next/link";
import Image from "next/image";
import { HiOutlinePlusCircle, HiOutlineMinusCircle, HiOutlineX } from "react-icons/hi";

interface MobileBasketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileBasketDrawer = ({ isOpen, onClose }: MobileBasketDrawerProps) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden" onClick={onClose}></div>}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-[400px] transform overflow-y-auto bg-muted transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-muted p-4">
          <h2 className="text-lg font-medium">سبد خرید</h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-background">
            <HiOutlineX className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <ul className="space-y-4">
            <li>
              <div className="flex gap-x-2">
                {/* Product Image */}
                <div className="relative min-w-fit">
                  <Link href="/product-detail" onClick={onClose}>
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
                  <Link className="line-clamp-2 h-12" href="/product-detail" onClick={onClose}>
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
        <div className="sticky bottom-0 mt-auto border-t bg-muted p-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-text/60">مبلغ قابل پرداخت</span>
            <div className="text-text/90">
              <span className="font-bold">1,200,000</span>
              <span className="text-sm">تومان</span>
            </div>
          </div>
          <Link href="/checkout-shipping" onClick={onClose}>
            <button className="btn-primary w-full py-3 text-sm" type="button">
              ثبت سفارش
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileBasketDrawer;
