'use client';

import React, { useState } from 'react';
import { FaTruck, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import CartStatus from '@/shared/components/CartStatus';
import { useShipping } from '@/shared/hooks/reactQuery/useShipping';
import { formatPrice } from '@/shared/utils/formatter';

interface ShippingItem {
  name: string;
  price: number;
  estimatedDays: number;
  id?: string | number;
}

export default function DeliverySection() {
  const { data, isLoading, error } = useShipping({});
  const shippingItems = data?.data?.items;
  const [selected, setSelected] = useState<string | number | null>(null);

  const getId = (item: ShippingItem, idx: number) => item.id ?? idx;

  return (
    <>
      {isLoading || error || !shippingItems?.length ? (
        <CartStatus
          cartItems={shippingItems || []}
          error={error}
          isLoading={isLoading}
          errorMessage="خطا در بارگذاری روش‌های ارسال"
          shopButtonText="رفتن به فروشگاه"
          shopLink="/shop"
          emptyMessage="هیچ روش ارسالی در دسترس نیست"
        />
      ) : (
        <div>
          <div className="flex items-center justify-between gap-x-2 pb-4">
            <h2 className="flex items-center gap-x-2 text-sm xs:text-base md:text-lg font-medium text-gray-800">
              <FaTruck className="h-5 w-5 text-primary" />
              شیوه ارسال
            </h2>
          </div>
          <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <legend className="sr-only">Delivery Options</legend>
            {shippingItems?.map((item: ShippingItem, index: number) => {
              const id = getId(item, index);
              const isChecked = selected === id;
              return (
                <div key={id} className="relative">
                  <input
                    type="radio"
                    name="delivery"
                    value={id}
                    id={`delivery-${id}`}
                    className="peer hidden"
                    checked={isChecked}
                    onChange={() => {
                      setSelected(id);
                      console.log('Selected delivery id:', id);
                    }}
                  />
                  <label
                    htmlFor={`delivery-${id}`}
                    className={`
                      relative block h-[140px] cursor-pointer rounded-lg border p-4 shadow-sm transition-all
                      ${isChecked ? 'border-primary bg-primary/10 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}
                    `}
                  >
                    <span className="absolute right-4 top-4 flex items-center justify-center h-6 w-6">
                      <span
                        className={`
                          flex items-center justify-center rounded-full border-2 h-6 w-6 transition-colors
                          ${isChecked ? 'border-primary bg-primary' : 'border-gray-300 bg-white dark:bg-gray-800'}
                        `}
                      >
                        {isChecked && (
                          <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                    </span>

                    <div className="mb-4 flex items-center justify-between gap-x-2">
                      <p className="line-clamp-1 pr-9 text-sm font-medium text-gray-900 xs:text-base dark:text-gray-100">{item.name}</p>
                      <FaTruck className="h-6 w-6 text-primary" />
                    </div>
                    <div className="mb-2 flex items-center gap-x-2 text-sm text-primary dark:text-primary">
                      <FaMoneyBillWave className="h-4 w-4" />
                      <span>{item.price === 0 ? 'رایگان' : `${formatPrice(item.price)} تومان`}</span>
                    </div>
                    <div className="flex items-center gap-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <FaClock className="h-4 w-4" />
                      <span>تحویل در {item.estimatedDays} روز</span>
                    </div>
                  </label>
                </div>
              );
            })}
          </fieldset>
        </div>
      )}
    </>
  );
}
