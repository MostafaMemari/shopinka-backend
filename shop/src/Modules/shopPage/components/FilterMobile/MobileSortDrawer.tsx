'use client';

import { useQueryState } from 'nuqs';
import { FC, useState, useEffect, useRef } from 'react';
import { BsSortDown } from 'react-icons/bs';
import { FiX } from 'react-icons/fi';

const SORT_OPTIONS = {
  default: { label: 'پیش‌فرض', value: '' },
  newest: { label: 'جدیدترین', value: 'newest' },
  price_asc: { label: 'ارزان‌ترین', value: 'price_asc' },
  price_desc: { label: 'گران‌ترین', value: 'price_desc' },
} as const;

interface MobileSortDrawerProps {
  onSortChange?: (sortOption: string) => void;
}

const MobileSortDrawer: FC<MobileSortDrawerProps> = ({ onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [sortBy, setSortBy] = useQueryState('sortBy', {
    defaultValue: '',
    parse: (value) => value as keyof typeof SORT_OPTIONS,
    serialize: (value) => value,
    history: 'replace',
    shallow: false,
  });

  // پیدا کردن label گزینه انتخاب‌شده
  const selectedSortLabel = Object.values(SORT_OPTIONS).find((option) => option.value === sortBy)?.label || 'مرتب سازی';

  // بستن drawer با کلیک خارج از آن
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSortClick = (value: keyof typeof SORT_OPTIONS) => {
    if (value === 'default') {
      setSortBy('');
    } else {
      setSortBy(value);
    }
    onSortChange?.(value);
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="flex w-full items-center gap-x-4 rounded-lg bg-muted px-4 py-3 text-sm xs:text-base"
        onClick={() => setIsOpen(true)}
        aria-controls="shop-sort-drawer-navigation"
        type="button"
      >
        <BsSortDown className="h-6 w-6" />
        <div>{selectedSortLabel}</div>
      </button>

      {isOpen && <div className="fixed inset-0 z-30 bg-black/50" />}

      <div
        ref={drawerRef}
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
            {Object.entries(SORT_OPTIONS).map(([key, option]) => (
              <div key={key}>
                <input
                  className="peer hidden"
                  id={`sort-${key}`}
                  name="sort"
                  type="radio"
                  value={option.value}
                  checked={sortBy === option.value}
                  onChange={() => handleSortClick(key as keyof typeof SORT_OPTIONS)}
                />
                <label
                  className="relative block w-full cursor-pointer rounded-lg border p-4 shadow-base peer-checked:border-primary peer-checked:dark:border-primary"
                  htmlFor={`sort-${key}`}
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
