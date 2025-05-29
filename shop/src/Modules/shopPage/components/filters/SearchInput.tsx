'use client';

import React, { useState, useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { useDebouncedCallback } from 'use-debounce';

function SearchInput() {
  const [searchQuery, setSearchQuery] = useQueryState('search', {
    defaultValue: '',
    history: 'replace',
    shallow: false, // کل صفحه رو سرور-ساید نَو می‌کنه
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
    <li>
      <label className="sr-only">جستجوی فروشگاه</label>
      <input
        className="w-full rounded-lg border-none bg-background px-2 py-3 text-text/90 outline-none placeholder:text-sm placeholder:text-text/60 focus:ring-0"
        placeholder="جستجو در بین نتایج ..."
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
    </li>
  );
}

export default SearchInput;
