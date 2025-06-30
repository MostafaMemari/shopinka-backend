'use client';

import { useQueryState } from 'nuqs';
import { BsSortDown } from 'react-icons/bs';

const SORT_OPTIONS = {
  default: { label: 'پیش‌فرض', value: '' },
  newest: { label: 'جدیدترین', value: 'newest' },
} as const;

function SortBarBlog() {
  const [sortBy, setSortBy] = useQueryState('sortBy', {
    defaultValue: '',
    parse: (value) => value as keyof typeof SORT_OPTIONS,
    serialize: (value) => value,
    history: 'replace',
    shallow: false,
  });

  const handleSortClick = (value: keyof typeof SORT_OPTIONS) => {
    if (value === 'default') {
      setSortBy('');
    } else {
      setSortBy(value);
    }
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
              (key === 'default' && !sortBy) || sortBy === key ? 'sort-button-active' : ''
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

export default SortBarBlog;
