import Link from "next/link";
import { HiOutlineX } from "react-icons/hi";
import MobileCartItemCard from "./MobileCartItemCard";

interface MobileBasketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileBasketDrawer({ isOpen, onClose }: MobileBasketDrawerProps) {
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
      {isOpen && <div className="fixed inset-0 z-30 bg-black/50" onClick={onClose}></div>}

      <div
        aria-labelledby="user-basket-drawer-navigation-label"
        className={`fixed left-0 top-0 z-40 h-full w-80 bg-muted transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        id="user-basket-drawer-navigation"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
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
                <MobileCartItemCard item={item} onRemove={() => console.log("remove item", item.id)} />
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
}
