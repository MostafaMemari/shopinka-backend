'use client';

import { useState, useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useDebouncedCallback } from 'use-debounce';

interface SearchInputProps {
  queryKey?: string;
  placeholder?: string;
  label?: string;
  className?: string;
  wrapperClassName?: string;
  autoFocus?: boolean;
}

const SearchInput = ({
  queryKey = 'search',
  placeholder = 'جستجو...',
  label = 'جستجو',
  className = '',
  wrapperClassName = '',
  autoFocus = false,
}: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useQueryState(queryKey, {
    defaultValue: '',
    history: 'replace',
    shallow: false,
  });

  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  return (
    <li className={wrapperClassName}>
      <label className="sr-only">{label}</label>
      <input
        className={`w-full rounded-lg border-none bg-background px-2 py-3 text-text/90 outline-none placeholder:text-sm placeholder:text-text/60 focus:ring-0 ${className}`}
        placeholder={placeholder}
        type="text"
        value={inputValue}
        onChange={handleChange}
        autoFocus={autoFocus}
      />
    </li>
  );
};

export default SearchInput;
