'use client';

import { useQueryState } from 'nuqs';
import { BsSortDown } from 'react-icons/bs';

const SORT_OPTIONS = {
  default: { label: 'پیش‌فرض', value: '' },
  newest: { label: 'جدیدترین', value: 'newest' },
  price_asc: { label: 'ارزان‌ترین', value: 'price_asc' },
  price_desc: { label: 'گران‌ترین', value: 'price_desc' },
} as const;

function SortBar() {
  const [sortBy, setSortBy] = useQueryState('sortBy', {
    defaultValue: '',
    parse: (value) => value as keyof typeof SORT_OPTIONS,
    serialize: (value) => value,
  });

  const handleSortClick = (value: keyof typeof SORT_OPTIONS) => {
    setSortBy(value);
  };

  return (
    <div className="hidden md:block">
      <div className="flex h-14 items-center gap-x-2 rounded-lg bg-muted px-2 text-text/90 shadow-base lg:px-4">
        <div className="flex items-center gap-x-2 text-sm lg:text-base">
          <BsSortDown className="h-6 w-6" />
          <p>مرتب‌سازی بر اساس</p>
        </div>
        {Object.entries(SORT_OPTIONS).map(([key, { label }]) => (
          <button
            key={key}
            className={`rounded-lg px-1 py-2 text-sm hover:bg-background lg:px-4 cursor-pointer ${
              sortBy === key ? 'sort-button-active' : ''
            }`}
            onClick={() => handleSortClick(key as keyof typeof SORT_OPTIONS)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SortBar;
