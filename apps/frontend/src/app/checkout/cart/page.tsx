import Image from "next/image";
import {
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineX,
  HiOutlineShoppingCart,
  HiOutlineCreditCard,
  HiOutlineTrash,
} from "react-icons/hi";
import { TbTruckDelivery } from "react-icons/tb";

export default function Page() {
  return (
    <>
      <main className="grow bg-background pb-14 pt-36 xs:pt-36">
        <div className="container pb-14">
          <div className="grid grid-cols-12 gap-2 lg:gap-6">
            {/* <!-- breadCrumb --> */}
            <div className="col-span-12 rounded-lg bg-muted">
              <ol className="grid grid-cols-3 overflow-hidden rounded-lg">
                <li className="flex flex-col items-center justify-center gap-2 bg-primary/10 p-4 text-xs text-primary /10 sm:text-sm md:text-base">
                  <HiOutlineShoppingCart className="h-6 w-6 md:h-8 md:w-8" />

                  <p className="leading-none">سبد خرید</p>
                </li>
                <li className="flex flex-col items-center justify-center gap-2 p-4 text-xs text-primary opacity-50 sm:text-sm md:text-base">
                  <TbTruckDelivery className="h-6 w-6 md:h-8 md:w-8" />

                  <p className="leading-none">شیوه ارسال</p>
                </li>
                <li className="flex flex-col items-center justify-center gap-2 p-4 text-xs text-primary opacity-50 sm:text-sm md:text-base">
                  <HiOutlineCreditCard className="h-6 w-6 md:h-8 md:w-8" />

                  <p className="leading-none">پرداخت</p>
                </li>
              </ol>
            </div>

            {/* <!-- Cart List --> */}
            <div className="col-span-12 md:col-span-8">
              <div className="rounded-lg bg-muted p-4">
                {/* <!-- Heading --> */}
                <div className="flex items-center justify-between gap-x-2 pb-4">
                  <h1 className="flex items-center gap-x-4 text-sm xs:text-base md:text-lg">
                    سبد خرید
                    <span className="text-sm text-text/60"> ( 2 کالا ) </span>
                  </h1>
                  <button
                    type="button"
                    className="btn-red-nobg px-3 py-2 text-sm"
                  >
                    <span>
                      <HiOutlineTrash className="h-6 w-6" />
                    </span>
                    <span>حذف همه</span>
                  </button>
                </div>
                <ul className="divide-y">
                  {/* <!-- Cart Item--> */}
                  <li>
                    <div className="py-4 sm:py-6">
                      <div className="grid grid-cols-2 items-center justify-start gap-2 xs:grid-cols-3 xs:gap-6 sm:grid-cols-4 xl:grid-cols-6">
                        {/* <!-- Image --> */}
                        <div className="relative row-span-2 min-w-fit xs:mx-auto">
                          <a href="#">
                            <Image
                              alt=""
                              className="w-25 rounded-lg sm:w-28"
                              src="/images/products/p4.png"
                              width={100}
                              height={100}
                            />
                          </a>

                          <button
                            className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background"
                            type="button"
                          >
                            <HiOutlineX className="h-6 w-6 text-red-600 dark:text-red-500" />
                          </button>
                        </div>
                        {/* <!-- Detail --> */}
                        <div className="row-span-2 space-y-4 xs:col-span-2 sm:col-span-3 xl:col-span-5">
                          {/* <!-- Title --> */}
                          <a
                            className="line-clamp-2 text-sm xs:text-base"
                            href="#"
                          >
                            کیف دستی دلسی مدل CHATELET AIR 2.0 کد 1676350
                          </a>
                          {/* <!-- Variant --> */}
                          <div className="flex items-center gap-x-2">
                            <span
                              className="h-4 w-4 rounded-full"
                              style={{ background: "#782f2f" }}
                            ></span>
                            <span className="text-xs text-text/90 xs:text-sm">
                              قهوه ای
                            </span>
                          </div>
                        </div>
                        {/* <!-- Quantity --> */}
                        <div className="flex items-center gap-x-2 xs:justify-center">
                          <div className="flex h-10 w-24 items-center justify-between gap-x-3 rounded-lg border py-1 sm:w-28">
                            <button type="button" data-action="increment">
                              <HiOutlinePlus className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                            </button>
                            <input
                              value="1"
                              disabled
                              type="number"
                              className="flex h-5 w-5 select-none items-center justify-center bg-transparent text-center text-sm font-medium outline-hidden sm:h-6 sm:w-6 sm:text-lg"
                            />
                            <button type="button" data-action="decrement">
                              <HiOutlineMinus className="h-5 w-5 text-red-600 dark:text-red-500 sm:h-6 sm:w-6" />
                            </button>
                          </div>
                        </div>
                        {/* <!-- Price --> */}
                        <div className="text-primary xs:col-span-2 sm:col-span-3 lg:text-lg xl:col-span-5">
                          <span className="font-bold">1,200,000</span>
                          <span className="text-sm lg:text-base">تومان</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- Cart Price Detail --> */}
            <div className="col-span-12 md:col-span-4">
              {/* <!-- Desktop --> */}
              <div className="hidden rounded-lg bg-muted p-4 md:block">
                <div className="mb-2 divide-y">
                  {/* <!-- cart items price before discount - coupon --> */}
                  <div className="flex items-center justify-between gap-x-2 py-6">
                    <div className="text-sm text-text/90 lg:text-base">
                      قیمت کالا ها (2)
                    </div>

                    <div className="text-sm text-primary lg:text-base">
                      <span className="font-bold">2,400,000</span>
                      <span className="text-xs lg:text-sm">تومان</span>
                    </div>
                  </div>

                  {/* <!-- Discount --> */}
                  <div className="flex items-center justify-between gap-x-2 py-6">
                    <div className="text-sm text-text/90 lg:text-base">
                      تخفیف
                    </div>

                    <div className="text-sm font-medium text-red-500 dark:text-red-400 lg:text-base">
                      <span className="font-bold">1,220,000</span>
                      <span className="text-xs lg:text-sm">تومان</span>
                    </div>
                  </div>
                  {/* <!-- Order final price --> */}

                  <div className="flex items-center justify-between gap-x-2 py-6">
                    <div className="text-sm text-text/90 lg:text-base">
                      مبلغ قابل پرداخت
                    </div>

                    <div className="text-sm text-primary lg:text-base">
                      <span className="font-bold">2,400,000</span>
                      <span className="text-xs lg:text-sm">تومان</span>
                    </div>
                  </div>
                </div>
                <div>
                  <a
                    href="./checkout-shipping.html"
                    className="btn-primary py-3"
                  >
                    ادامه فرایند خرید
                  </a>
                </div>
              </div>
              {/* <!-- Mobile --> */}
              <div className="fixed inset-x-0 bottom-0 flex items-center gap-x-6 rounded-t-2xl bg-muted p-4 md:hidden">
                <a
                  className="btn-primary grow py-3"
                  href="./checkout-shipping.html"
                >
                  ادامه فرایند خرید
                </a>
                <div className="flex flex-col items-center gap-y-1">
                  <div className="text-sm text-text/60">مبلغ قابل پرداخت</div>
                  <div className="text-text/90">
                    <span className="font-bold">1,200,000</span>
                    <span className="text-sm">تومان</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
