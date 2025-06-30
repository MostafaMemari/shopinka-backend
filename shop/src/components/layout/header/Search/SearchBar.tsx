'use client';

import { HiOutlineSearch } from 'react-icons/hi';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Product } from '@/types/productType';
import { useProducts } from '@/hooks/reactQuery/product/useProduct';
import SearchItem from './SearchItem';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch] = useDebounce(searchInput.trim(), 500);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data, isFetching, isLoading } = useProducts({
    params: { page: 1, take: 10, search: debouncedSearch },
    enabled: !!debouncedSearch,
    staleTime: 5 * 60 * 1000,
  });

  const productItems: Product[] = data?.items || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-3xl flex-1">
      <div
        className={`flex items-center rounded-lg border px-3 py-2 transition-all ${
          isOpen ? 'border-primary bg-white shadow-md dark:bg-muted' : 'border-border bg-background'
        }`}
      >
        <HiOutlineSearch className="h-6 w-6 text-text/60 flex-shrink-0" />
        <label htmlFor="search" className="sr-only">
          جستجو
        </label>
        <input
          id="search"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          placeholder="جستجو کنید ..."
          className="flex w-[500px] bg-transparent border-none px-3 py-2 outline-none placeholder:text-sm placeholder:text-text/60 focus:ring-0 text-text/90"
        />
      </div>

      {isOpen && debouncedSearch && (
        <div className="absolute inset-x-0 top-full w-full overflow-hidden rounded-b-lg border border-t-transparent bg-muted shadow-lg dark:border-white/10 z-50">
          <div className="max-h-[400px] overflow-y-auto p-4">
            {isFetching && isLoading ? (
              <p className="text-center text-text/60">در حال بارگذاری...</p>
            ) : productItems.length === 0 ? (
              <p className="text-center text-text/60">نتیجه‌ای یافت نشد</p>
            ) : (
              <ul className="space-y-2">
                {productItems.map((product) => (
                  <SearchItem key={product.id} product={product} />
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
