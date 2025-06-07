'use client';

import { MdOutlineEditLocation, MdOutlineWrongLocation } from 'react-icons/md';
import { HiDotsVertical } from 'react-icons/hi';
import AddressFormModal from './AddressFormModal';
import CartStatus from '@/shared/components/CartStatus';
import { useAddress } from '@/shared/hooks/reactQuery/useAddress';

export default function AddressSection() {
  const { data, isLoading, error } = useAddress({});

  return (
    <>
      {isLoading ? (
        <CartStatus
          cartItems={data}
          error={error}
          isLoading={isLoading}
          emptyMessage="سبد خرید شما خالی است!"
          errorMessage="خطا در بارگذاری سبد خرید"
          shopButtonText="رفتن به فروشگاه"
          shopLink="/shop"
        />
      ) : (
        <div className="mb-6">
          <div className="flex items-center justify-between gap-x-2 pb-4">
            <h1 className="flex items-center gap-x-4 text-sm xs:text-base md:text-lg">آدرس تحویل سفارش</h1>
            <AddressFormModal />
          </div>
          <fieldset className="space-y-2">
            <legend className="sr-only">Address</legend>
            <div>
              <input type="radio" name="address" value="address-1" id="address-1" className="peer hidden" />
              <label
                htmlFor="address-1"
                className="relative block cursor-pointer rounded-lg border border-gray-200 p-4 shadow-base peer-checked:border-primary hover:border-border/50"
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
                      className="rounded-full p-1 text-text/90 hover:bg-background"
                    >
                      <HiDotsVertical className="h-6 w-6" />
                    </button>
                    <div className="z-10 ml-5 hidden w-50 overflow-hidden rounded-lg border bg-muted" id="address-option-1">
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
      )}
    </>
  );
}
