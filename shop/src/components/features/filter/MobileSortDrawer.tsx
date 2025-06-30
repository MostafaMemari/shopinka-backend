'use client';

import MobileDrawer from '@/components/ui/MobileDrawer';
import { useState } from 'react';
import { BiSort } from 'react-icons/bi';

interface SortOption {
  label: string;
  value: string;
}
const SORT_OPTIONS = {
  default: { label: 'پیش‌فرض', value: '' },
  newest: { label: 'جدیدترین', value: 'newest' },
  price_asc: { label: 'ارزان‌ترین', value: 'price_asc' },
  price_desc: { label: 'گران‌ترین', value: 'price_desc' },
};

function MobileSortDrawer() {
  const [sortBy, setSortBy] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const handleOptionClick = (value: string) => {
    setSortBy(value);
    setIsOpenDrawer(false);
  };

  return (
    <>
      <MobileDrawer
        isOpen={isOpenDrawer}
        onOpen={() => setIsOpenDrawer(true)}
        onClose={() => setIsOpenDrawer(false)}
        title="مرتب سازی"
        triggerButton={
          <div className="flex w-full cursor-pointer items-center gap-x-4 rounded-lg bg-muted px-4 py-3 text-sm xs:text-base">
            <BiSort className="h-6 w-6" />
            <div>مرتب سازی</div>
          </div>
        }
      >
        <div className="main-scroll h-full space-y-2 divide-y overflow-y-auto p-4">
          <fieldset className="flex flex-col space-y-2" dir="rtl">
            <legend className="sr-only">{'مرتب سازی'}</legend>
            {Object.values(SORT_OPTIONS).map((option: SortOption) => (
              <div key={option.value}>
                <input
                  className="peer hidden"
                  id={`sort-${option.value}`}
                  name="sort"
                  type="radio"
                  value={option.value}
                  checked={sortBy === option.value}
                  onChange={() => handleOptionClick(option.value)}
                />
                <label
                  className="relative block w-full cursor-pointer rounded-lg border p-4 shadow-base peer-checked:border-primary peer-checked:dark:border-primary"
                  htmlFor={`sort-${option.value}`}
                >
                  <p className="text-center text-text/90">{option.label}</p>
                </label>
              </div>
            ))}
          </fieldset>
        </div>
      </MobileDrawer>
    </>
  );
}

export default MobileSortDrawer;
