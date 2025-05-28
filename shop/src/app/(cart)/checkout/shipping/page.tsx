import Image from 'next/image';
import { HiOutlineCreditCard, HiOutlineCheck, HiDotsVertical } from 'react-icons/hi';
import { MdOutlineAddLocationAlt, MdOutlineEditLocation, MdOutlineWrongLocation } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';

export default function Page() {
  return (
    <>
      <main className="grow bg-background pb-14 pt-36 xs:pt-36">
        <div className="container pb-14">
          <div className="grid grid-cols-12 gap-2 lg:gap-6">
            {/* <!-- breadCrumb --> */}
            <div className="col-span-12 rounded-lg bg-muted">
              <ol className="grid grid-cols-3 overflow-hidden rounded-lg">
                <li className="flex flex-col items-center justify-center gap-2 p-4 text-xs text-primary opacity-50 sm:text-sm md:text-base">
                  <HiOutlineCheck className="h-6 w-6 md:h-8 md:w-8" />

                  <p className="leading-none">سبد خرید</p>
                </li>
                <li className="flex flex-col items-center justify-center gap-2 bg-primary/10 p-4 text-xs text-primary /10 sm:text-sm md:text-base">
                  <TbTruckDelivery className="h-6 w-6 md:h-8 md:w-8" />

                  <p className="leading-none">شیوه ارسال</p>
                </li>
                <li className="flex flex-col items-center justify-center gap-2 p-4 text-xs text-primary opacity-50 sm:text-sm md:text-base">
                  <HiOutlineCreditCard className="h-6 w-6 md:h-8 md:w-8" />

                  <p className="leading-none">پرداخت</p>
                </li>
              </ol>
            </div>
            {/* <!-- Content --> */}
            <div className="col-span-12 md:col-span-8">
              <div className="rounded-lg bg-muted p-4">
                {/* <!-- Address Section --> */}

                <div className="mb-6">
                  <div className="flex items-center justify-between gap-x-2 pb-4">
                    <h1 className="flex items-center gap-x-4 text-sm xs:text-base md:text-lg">آدرس تحویل سفارش</h1>
                    <button
                      data-modal-target="address-add-modal"
                      data-modal-toggle="address-add-modal"
                      className="btn-primary-nobg px-3 py-2 text-sm"
                    >
                      <span>
                        <MdOutlineAddLocationAlt className="h-6 w-6" />
                      </span>
                      <span> آدرس جدید </span>
                    </button>
                  </div>

                  <fieldset className="space-y-2">
                    <legend className="sr-only">Address</legend>

                    <div>
                      <input type="radio" name="address" value="address-1" id="address-1" className="peer hidden" />

                      <label
                        htmlFor="address-1"
                        className="relative block cursor-pointer rounded-lg border p-4 shadow-base peer-checked:border-emerald-500 hover:border-border/50 dark:peer-checked:border-emerald-400 dark:hover:border-white/10"
                      >
                        <div className="mb-4 flex items-center justify-between gap-x-2 sm:mb-2">
                          <p className="line-clamp-2 h-10 text-sm text-text/90 xs:text-base sm:line-clamp-1 sm:h-6">
                            استان تهران شهر تهران - خیابان گاندی جنوبی - نبش خیابان ۲۱ - پلاک ۲۸
                          </p>

                          <div className="hidden md:block">
                            <button
                              id="dropdownMenuIconButton"
                              data-dropdown-toggle="address-option-1"
                              type="button"
                              className="rounded-full p-1 text-text/90 hover:bg-background hover:"
                            >
                              <HiDotsVertical className="h-6 w-6" />
                            </button>
                            {/* <!-- Dropdown menu --> */}
                            <div className="z-10 ml-5! hidden w-50 overflow-hidden rounded-lg border bg-muted" id="address-option-1">
                              <ul className="space-y-2 p-2">
                                <li>
                                  <button
                                    type="button"
                                    data-modal-target="address-edit-modal-1"
                                    data-modal-toggle="address-edit-modal-1"
                                    className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sky-500 hover:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-400/10"
                                  >
                                    <div className="flex items-center gap-x-2">
                                      <MdOutlineEditLocation className="h-6 w-6" />

                                      <span> ویرایش </span>
                                    </div>
                                  </button>
                                </li>
                                <li>
                                  <button
                                    type="button"
                                    data-modal-target="address-delete-modal-1"
                                    data-modal-toggle="address-delete-modal-1"
                                    className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-red-500 hover:bg-warning/10 dark:text-red-400 dark:hover:bg-red-400/10"
                                  >
                                    <div className="flex items-center gap-x-2">
                                      <MdOutlineWrongLocation className="h-6 w-6" />
                                      <span> حذف </span>
                                    </div>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-x-2">
                          <p className="line-clamp-1 text-sm text-text/60">تایماز اکبری</p>
                          <div className="flex items-center gap-x-2 md:hidden">
                            <button
                              data-modal-target="address-delete-modal-1"
                              data-modal-toggle="address-delete-modal-1"
                              className="btn-red-nobg px-3 py-1 text-sm xs:px-4 xs:py-2"
                            >
                              حذف
                            </button>
                            <button
                              data-modal-target="address-edit-modal-1"
                              data-modal-toggle="address-edit-modal-1"
                              className="btn-secondary-nobg px-3 py-1 text-sm xs:px-4 xs:py-2"
                            >
                              ویرایش
                            </button>
                          </div>
                        </div>
                      </label>
                    </div>
                  </fieldset>
                </div>
                {/* <!-- Delivery Section --> */}

                <div>
                  <div className="flex items-center justify-between gap-x-2 pb-4">
                    <h2 className="flex items-center gap-x-4 text-sm xs:text-base md:text-lg">شیوه ارسال</h2>
                  </div>

                  <fieldset className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <legend className="sr-only">Delivery</legend>

                    <div>
                      <input type="radio" name="delivery" value="delivery-1" id="delivery-1" className="peer hidden" />

                      <label
                        htmlFor="delivery-1"
                        className="relative block h-[116px] cursor-pointer rounded-lg border p-4 shadow-base peer-checked:border-emerald-500 hover:border-border/50 dark:peer-checked:border-emerald-400 dark:hover:border-white/10"
                      >
                        <div className="mb-4 flex items-center justify-between gap-x-2 sm:mb-2">
                          <p className="line-clamp-1 text-sm text-text/90 xs:text-base">تیپاکس</p>
                          <Image src="/images/others/tipax.png" alt="تیپاکس" className="w-25" width={100} height={100} />
                        </div>

                        <div className="mb-1 text-primary">
                          <span>60,000</span>
                          <span className="text-sm"> تومان</span>
                        </div>

                        <div className="text-sm text-primary">
                          <span> رایگان بالای 500,000 </span>
                        </div>
                      </label>
                    </div>

                    <div>
                      <input type="radio" name="delivery" value="delivery-2" id="delivery-2" className="peer hidden" />

                      <label
                        htmlFor="delivery-2"
                        className="relative block h-[116px] cursor-pointer rounded-lg border p-4 shadow-base peer-checked:border-emerald-500 hover:border-border/50 dark:peer-checked:border-emerald-400 dark:hover:border-white/10"
                      >
                        <div className="mb-4 flex items-center justify-between gap-x-2 sm:mb-2">
                          <p className="line-clamp-1 text-sm text-text/90 xs:text-base">تیپاکس</p>
                          <Image src="/images/others/tipax.png" alt="تیپاکس" className="w-25" width={100} height={100} />
                        </div>

                        <div className="text-primary">
                          <span className="text-sm">پرداخت در مقصد</span>
                        </div>
                      </label>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
            {/* <!-- Cart Price Detail --> */}
            <div className="col-span-12 md:col-span-4">
              {/* <!-- Desktop --> */}
              <div className="hidden rounded-lg bg-muted p-4 md:block">
                <div className="mb-2 divide-y">
                  {/* <!-- cart items price before discount - coupon --> */}
                  <div className="flex items-center justify-between gap-x-2 py-6">
                    <div className="text-sm text-text/90 lg:text-base">قیمت کالا ها (2)</div>

                    <div className="text-sm text-primary lg:text-base">
                      <span className="font-bold">2,400,000</span>
                      <span className="text-xs lg:text-sm"> تومان</span>
                    </div>
                  </div>
                  {/* <!-- Discount --> */}
                  <div className="flex items-center justify-between gap-x-2 py-6">
                    <div className="text-sm text-text/90 lg:text-base">تخفیف</div>

                    <div className="text-sm font-medium text-red-500 dark:text-red-400 lg:text-base">
                      <span className="font-bold">1,220,000</span>
                      <span className="text-xs lg:text-sm"> تومان</span>
                    </div>
                  </div>
                  {/* <!-- delivery price --> */}
                  <div className="flex items-center justify-between gap-x-2 py-6">
                    <div className="text-sm text-text/90 lg:text-base">هزینه ارسال</div>

                    {/* <!-- <div className="text-sky-500 dark:text-sky-400  text-sm lg:text-base">
                    <span className="font-bold">60,000</span>
                    <span className="text-xs lg:text-sm"> تومان</span>
                  </div> --> */}

                    {/* <!-- <div className="text-sky-500 dark:text-sky-400  text-sm lg:text-base">
                    <span className="font-bold">
                      پرداخت در مقصد
                    </span>
                  </div> --> */}
                    <div className="text-sm text-sky-500 dark:text-sky-400 lg:text-base">
                      <span className="font-bold"> رایگان </span>
                    </div>
                  </div>

                  {/* <!-- Order final price --> */}

                  <div className="flex items-center justify-between gap-x-2 py-6">
                    <div className="text-sm text-text/90 lg:text-base">مبلغ قابل پرداخت</div>

                    <div className="text-sm text-primary lg:text-base">
                      <span className="font-bold">2,400,000</span>
                      <span className="text-xs lg:text-sm"> تومان</span>
                    </div>
                  </div>
                </div>
                <div>
                  <a href="./checkout-payment.html" className="btn-primary py-3">
                    ادامه فرایند خرید
                  </a>
                </div>
              </div>
              {/* <!-- Mobile --> */}
              <div className="fixed inset-x-0 bottom-0 flex items-center gap-x-6 rounded-t-2xl bg-muted p-4 md:hidden">
                <a className="btn-primary grow py-3" href="./checkout-payment.html">
                  ادامه فرایند خرید
                </a>
                <div className="flex flex-col items-center gap-y-1">
                  <div className="text-sm text-text/60">مبلغ قابل پرداخت</div>
                  <div className="text-text/90">
                    <span className="font-bold">1,200,000</span>
                    <span className="text-sm"> تومان</span>
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
