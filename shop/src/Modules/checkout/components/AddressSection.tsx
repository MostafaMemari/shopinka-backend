'use client';

import React, { useState } from 'react';
import { MdOutlineEditLocation, MdOutlineWrongLocation } from 'react-icons/md';
import CartStatus from '@/shared/components/CartStatus';
import { useAddress } from '@/shared/hooks/reactQuery/useAddress';
import { HiDotsVertical } from 'react-icons/hi';
import AddressFormDrawer from './AddressFormDrawer';

interface AddressItem {
  province: string;
  city: string;
  address: string;
  postalCode: string;
  receiverMobile: string;
}

export default function AddressSection() {
  const { addressItems, isLoading, error } = useAddress({});

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <>
      {isLoading || error ? (
        <CartStatus
          cartItems={[]}
          error={error}
          isLoading={isLoading}
          emptyMessage="هیچ آدرسی ثبت نشده است!"
          errorMessage="خطا در بارگذاری آدرس‌ها"
          shopButtonText="رفتن به فروشگاه"
          shopLink="/shop"
        />
      ) : (
        <div className="mb-6">
          <div className="flex items-center justify-between gap-x-2 pb-4">
            <h1 className="flex items-center gap-x-2 text-sm xs:text-base md:text-lg font-medium text-gray-800">
              <MdOutlineEditLocation className="h-5 w-5 text-primary" />
              آدرس تحویل سفارش
            </h1>
            <AddressFormDrawer onSubmit={() => console.log('object')} />
          </div>
          <fieldset className="space-y-4">
            <legend className="sr-only">Address Options</legend>
            {addressItems?.map((item, index) => (
              <div key={index}>
                <input type="radio" name="address" value={`address-${index}`} id={`address-${index}`} className="peer hidden" />
                <label
                  htmlFor={`address-${index}`}
                  className="relative block cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gray-300 peer-checked:border-primary peer-checked:shadow-md"
                >
                  <div className="mb-4 flex items-center justify-between gap-x-2 sm:mb-2">
                    <p className="line-clamp-2 text-sm text-gray-900 xs:text-base sm:line-clamp-1 dark:text-gray-100">
                      {`${item.province}، ${item.city} - ${item.address} - کد پستی: ${item.postalCode}`}
                    </p>
                    <div className="relative hidden md:block">
                      <button
                        type="button"
                        onClick={() => toggleDropdown(`address-${index}`)}
                        className="rounded-full p-1 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        <HiDotsVertical className="h-6 w-6" />
                      </button>
                      {openDropdown === `address-${index}` && (
                        <div className="absolute left-0 z-10 mt-2 w-48 overflow-hidden rounded-lg border bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700">
                          <ul className="space-y-1 p-2">
                            <li>
                              <button
                                type="button"
                                data-modal-target={`address-edit-modal-${index}`}
                                data-modal-toggle={`address-edit-modal-${index}`}
                                className="flex w-full items-center gap-x-2 rounded-lg px-4 py-2 text-sky-500 hover:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-400/10"
                              >
                                <MdOutlineEditLocation className="h-5 w-5" />
                                <span>ویرایش</span>
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                data-modal-target={`address-delete-modal-${index}`}
                                data-modal-toggle={`address-delete-modal-${index}`}
                                className="flex w-full items-center gap-x-2 rounded-lg px-4 py-2 text-red-500 hover:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-400/10"
                              >
                                <MdOutlineWrongLocation className="h-5 w-5" />
                                <span>حذف</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-x-2">
                    <p className="line-clamp-1 text-sm text-gray-500 dark:text-gray-400">{`گیرنده: ${item.receiverMobile}`}</p>
                    <div className="flex items-center gap-x-2 md:hidden">
                      <button
                        data-modal-target={`address-delete-modal-${index}`}
                        data-modal-toggle={`address-delete-modal-${index}`}
                        className="rounded-md bg-red-100 px-3 py-1 text-sm text-red-600 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-400 dark:hover:bg-red-900"
                      >
                        حذف
                      </button>
                      <button
                        data-modal-target={`address-edit-modal-${index}`}
                        data-modal-toggle={`address-edit-modal-${index}`}
                        className="rounded-md bg-blue-100 px-3 py-1 text-sm text-blue-600 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-900"
                      >
                        ویرایش
                      </button>
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </fieldset>
        </div>
      )}
    </>
  );
}
