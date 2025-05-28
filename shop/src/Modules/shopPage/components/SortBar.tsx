'use client';

import { useQueryParam } from '@/shared/hooks/useQueryParam';
import { FC } from 'react';
import { BsSortDown } from 'react-icons/bs';

interface SortBarProps {
  onSortChange?: (sortOption: string) => void;
}

const SortBar: FC<SortBarProps> = ({ onSortChange }) => {
  const sortMap: Record<string, string> = {
    جدیدترین: 'newest',
    ارزان‌ترین: 'price_asc',
    گران‌ترین: 'price_desc',
  };

  const reverseSortMap: Record<string, string> = Object.fromEntries(Object.entries(sortMap).map(([key, value]) => [value, key]));

  const [activeSort, setActiveSort] = useQueryParam({
    paramKey: 'sortBy',
    defaultValue: 'جدیدترین',
    toQueryString: (value) => sortMap[value] || '',
    fromQueryString: (value) => (value && reverseSortMap[value] ? reverseSortMap[value] : 'جدیدترین'),
  });

  const sortOptions = ['جدیدترین', 'ارزان‌ترین', 'گران‌ترین'];

  const handleSortClick = (option: string) => {
    setActiveSort(option);
    if (onSortChange) {
      onSortChange(sortMap[option] || 'newest');
    }
  };

  return (
    <div className="hidden md:block">
      <div className="flex h-14 items-center gap-x-2 rounded-lg bg-muted px-2 text-text/90 shadow-base lg:px-4">
        <div className="flex items-center gap-x-2 text-sm lg:text-base">
          <BsSortDown className="h-6 w-6" />
          <p>مرتب‌سازی بر اساس</p>
        </div>
        {sortOptions.map((option) => (
          <button
            key={option}
            className={`rounded-lg px-1 py-2 text-sm hover:bg-background lg:px-4 cursor-pointer ${activeSort === option ? 'sort-button-active' : ''}`}
            onClick={() => handleSortClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortBar;
