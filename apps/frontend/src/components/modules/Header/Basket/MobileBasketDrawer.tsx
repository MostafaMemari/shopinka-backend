import Link from "next/link";
import Image from "next/image";
import { HiOutlinePlusCircle, HiOutlineMinusCircle, HiOutlineX } from "react-icons/hi";

interface MobileBasketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileBasketDrawer = ({ isOpen, onClose }: MobileBasketDrawerProps) => {
  const cartItems = [
    {
      id: 1,
      title: "تیشرت اسپورت مردانه",
      image: "/images/products/p1.png",
      quantity: 2,
      color: "طوسی",
      colorHex: "rgb(128, 128, 128)",
      price: "1,800,000",
    },
    {
      id: 2,
      title: "کلاه اسپورت مردانه",
      image: "/images/products/p2.png",
      quantity: 2,
      color: "طوسی",
      colorHex: "rgb(128, 128, 128)",
      price: "1,800,000",
    },
    {
      id: 3,
      title: "کفش اسپورت مردانه",
      image: "/images/products/p3.png",
      quantity: 2,
      color: "طوسی",
      colorHex: "rgb(128, 128, 128)",
      price: "1,800,000",
    },
    {
      id: 4,
      title: "کفش اسپورت مردانه",
      image: "/images/products/p4.png",
      quantity: 2,
      color: "قرمز",
      colorHex: "red",
      price: "1,800,000",
    },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/50" onClick={onClose}></div>}

      <div
        aria-labelledby="user-basket-drawer-navigation-label"
        className={`fixed left-0 top-0 z-40 h-full w-80 bg-muted transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        id="user-basket-drawer-navigation"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside drawer
      >
        <div className="flex items-center justify-between gap-x-4 border-b p-4 pb-5">
          <button
            aria-controls="user-account-drawer-navigation"
            className="inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-text/90"
            onClick={onClose}
            type="button"
          >
            <HiOutlineX className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </button>
          <h5 className="text-lg text-text/90">
            سبد خرید <span className="text-sm">( 4 )</span>
          </h5>
        </div>

        <div className="h-full pb-[150px]">
          <ul className="main-scroll h-full space-y-2 divide-y overflow-y-auto p-4">
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className="flex gap-x-2 py-5">
                  <div className="relative min-w-fit">
                    <Link href="/product-detail">
                      <Image alt={item.title} className="h-20 w-20" src={item.image} width={80} height={80} loading="lazy" />
                    </Link>
                    <button
                      className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background"
                      type="button"
                    >
                      <HiOutlineX className="h-6 w-6 text-red-600 dark:text-red-500" />
                    </button>
                  </div>

                  <div className="w-full space-y-1.5">
                    <Link href="/product-detail" className="line-clamp-2 h-10 text-sm">
                      {item.title}
                    </Link>
                    <div className="flex items-center gap-x-2 text-xs text-text/60">
                      <div>تعداد : {item.quantity}</div>
                      <div className="h-3 w-px rounded-full bg-background"></div>
                      <div className="flex items-center gap-x-2">
                        <span className="h-4 w-4 rounded-full" style={{ background: item.colorHex }}></span>
                        <span>{item.color}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-x-2">
                      <div className="text-primary">
                        <span className="font-bold">{item.price}</span>
                        <span className="text-xs">تومان</span>
                      </div>
                      <div className="flex h-8 w-20 justify-between rounded-lg border px-2 py-1">
                        <button type="button" data-action="increment">
                          <HiOutlinePlusCircle className="h-5 w-5 text-primary" />
                        </button>
                        <input
                          value="1"
                          disabled
                          type="number"
                          className="flex h-5 w-5 select-none items-center justify-center bg-transparent text-center text-sm outline-none"
                        />
                        <button type="button" data-action="decrement">
                          <HiOutlineMinusCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="sticky bottom-0 left-0 right-0 flex items-center justify-between border-t p-4 px-6 py-4">
          <div className="flex flex-col items-center gap-y-1">
            <div className="text-sm text-text/60">مبلغ قابل پرداخت</div>
            <div className="text-text/90">
              <span className="font-bold">1,200,000</span>
              <span className="text-sm">تومان</span>
            </div>
          </div>
          <Link href="/checkout-cart" className="btn-primary w-32 py-3 text-sm text-center">
            مشاهده سبد خرید
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileBasketDrawer;
