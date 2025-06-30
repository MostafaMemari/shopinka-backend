'use client';

import { useQueryState } from 'nuqs';
import { BsSortDown } from 'react-icons/bs';

type SortOption = {
  label: string;
  value: string;
};

interface SortBarProps {
  options: Record<string, SortOption>;
  queryKey?: string;
  title?: string;
  className?: string;
}

const SortBar = ({ options, queryKey = 'sortBy', title = 'مرتب‌سازی بر اساس', className = '' }: SortBarProps) => {
  const [sortBy, setSortBy] = useQueryState(queryKey, {
    defaultValue: '',
    parse: (value) => value,
    serialize: (value) => value,
    history: 'replace',
    shallow: false,
  });

  const handleSortClick = (key: string) => {
    if (key === 'default' || !options[key]?.value) {
      setSortBy('');
    } else {
      setSortBy(key);
    }
  };

  return (
    <div className={`hidden md:block ${className}`}>
      <div className="flex h-14 items-center gap-x-2 rounded-lg bg-muted px-2 text-text/90 shadow-base lg:px-4">
        <div className="flex items-center gap-x-2 text-sm lg:text-base">
          <BsSortDown className="h-6 w-6" />
          <p>{title}</p>
        </div>
        {Object.entries(options).map(([key, { label }]) => (
          <button
            key={key}
            className={`rounded-lg px-1 py-2 text-sm hover:bg-background lg:px-4 cursor-pointer ${
              (key === 'default' && !sortBy) || sortBy === key ? 'sort-button-active' : ''
            }`}
            onClick={() => handleSortClick(key)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortBar;
