'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { BsSortDown } from 'react-icons/bs';
import { FiX } from 'react-icons/fi';

interface MobileSortDrawerProps {
  onSortChange?: (sortOption: string) => void;
}

const sortOptions = [
  { id: 'sort-new', label: 'جدید ترین', value: 'new' },
  { id: 'sort-sale', label: 'پرفروش ترین', value: 'sale' },
  { id: 'sort-expensive', label: 'گران ترین', value: 'expensive' },
  { id: 'sort-chip', label: 'ارزان ترین', value: 'cheap' },
];

const MobileSortDrawer: FC<MobileSortDrawerProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="flex w-full items-center gap-x-4 rounded-lg bg-muted px-4 py-3 text-sm xs:text-base"
        onClick={() => setIsOpen(true)}
        aria-controls="shop-sort-drawer-navigation"
        type="button"
      >
        <BsSortDown className="h-6 w-6" />
        <div>مرتب سازی</div>
      </button>

      <div
        className={`fixed bottom-0 left-0 right-0 z-40 h-auto w-full rounded-t-3xl bg-muted transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        aria-labelledby="shop-sort-drawer-navigation-label"
        tabIndex={-1}
        id="shop-sort-drawer-navigation"
      >
        <div className="flex items-center justify-between gap-x-4 border-b p-4 pb-5">
          <h5 className="text-lg text-text/90">مرتب سازی بر اساس</h5>
          <button
            className="inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-text/90 hover:bg-zinc-100 hover:text-gray-900 dark:hover:bg-black dark:hover:text-white"
            onClick={() => setIsOpen(false)}
            type="button"
            aria-controls="shop-sort-drawer-navigation"
            data-drawer-hide="shop-sort-drawer-navigation"
          >
            <FiX className="h-5 w-5" />
            <span className="sr-only">بستن منو</span>
          </button>
        </div>

        <div className="main-scroll h-full space-y-2 divide-y overflow-y-auto p-4">
          <fieldset className="flex flex-col space-y-2" dir="rtl">
            <legend className="sr-only">مرتب‌سازی</legend>
            {sortOptions.map((option) => (
              <div key={option.id}>
                <input className="peer hidden" id={option.id} name="sort" type="radio" value={option.value} />
                <label
                  className="relative block w-full cursor-pointer rounded-lg border p-4 shadow-base peer-checked:border-emerald-500 peer-checked:dark:border-emerald-400"
                  htmlFor={option.id}
                >
                  <p className="text-center text-text/90">{option.label}</p>
                </label>
              </div>
            ))}
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default MobileSortDrawer;
