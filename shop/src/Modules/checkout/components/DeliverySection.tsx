'use client';

import React from 'react';
import { FaTruck, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import CartStatus from '@/shared/components/CartStatus';
import { useShipping } from '@/shared/hooks/reactQuery/useShipping';

interface ShippingItem {
  name: string;
  price: number;
  estimatedDays: number;
}

export default function DeliverySection() {
  const { data, isLoading, error } = useShipping({});

  const shippingItems = data?.data?.items;

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
            {shippingItems?.map((item: ShippingItem, index: number) => (
              <div key={index}>
                <input type="radio" name="delivery" value={`delivery-${index}`} id={`delivery-${index}`} className="peer hidden" />
                <label
                  htmlFor={`delivery-${index}`}
                  className="relative block h-[140px] cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all peer-checked:border-primary peer-checked:shadow-md"
                >
                  <div className="mb-4 flex items-center justify-between gap-x-2">
                    <p className="line-clamp-1 text-sm font-medium text-gray-900 xs:text-base dark:text-gray-100">{item.name}</p>
                    <FaTruck className="h-6 w-6 text-primary" />
                  </div>
                  <div className="mb-2 flex items-center gap-x-2 text-sm text-primary dark:text-primary">
                    <FaMoneyBillWave className="h-4 w-4" />
                    <span>{item.price === 0 ? 'رایگان' : `${item.price.toLocaleString('fa-IR')} تومان`}</span>
                  </div>
                  <div className="flex items-center gap-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <FaClock className="h-4 w-4" />
                    <span>تحویل در {item.estimatedDays} روز</span>
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
