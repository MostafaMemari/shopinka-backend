'use client';

import { FC, useState } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import SearchInput from '../FilterDesktop/SearchInput';
import PriceSelector from '../PriceSelector';
import CategorySelector from '../FilterDesktop/CategorySelector';
import StockStatusFilter from '../FilterDesktop/StockStatusFilter';
import DiscountFilter from '../FilterDesktop/DiscountFilter';
import { useSearchParams } from 'next/navigation';

interface MobileFilterProps {
  totalCount: number;
}

const MobileFilter: FC<MobileFilterProps> = ({ totalCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasFilters = searchParams?.toString().length > 0;

  const handleApplyFilters = () => {
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    router.replace('/shop', { scroll: false }); // فرض می‌کنیم مسیر پایه /shop است
  };

  return (
    <>
      <div className="relative w-full">
        <div
          role="button"
          tabIndex={0}
          className="flex w-full cursor-pointer items-center gap-x-4 rounded-lg bg-muted px-4 py-3 text-sm xs:text-base"
          onClick={() => setIsOpen(true)}
          aria-controls="shop-filter-drawer-navigation"
          onKeyDown={(e) => e.key === 'Enter' && setIsOpen(true)}
        >
          <FiFilter className="h-6 w-6" />
          <div>فیلتر</div>
        </div>

        {hasFilters && (
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            onClick={(e) => {
              e.stopPropagation(); // جلوگیری از باز شدن فیلتر
              handleClearFilters(); // حذف فیلترها
            }}
            type="button"
          >
            <FiX className="h-5 w-5 text-red-500" />
            <span className="sr-only">حذف فیلترها</span>
          </button>
        )}
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 z-40 h-full w-full bg-muted transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        aria-labelledby="shop-filter-drawer-navigation-label"
        tabIndex={-1}
        id="shop-filter-drawer-navigation"
      >
        <div className="flex items-center justify-between gap-x-4 border-b p-4 pb-5">
          <h5 className="text-lg text-text/90">فیلتر محصولات</h5>
          <button
            className="inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-text/90 hover:bg-zinc-100 hover:text-gray-900 dark:hover:bg-black dark:hover:text-white"
            onClick={() => setIsOpen(false)}
            type="button"
            aria-controls="shop-filter-drawer-navigation"
            data-drawer-hide="shop-filter-drawer-navigation"
          >
            <FiX className="h-5 w-5" />
            <span className="sr-only">بستن منو</span>
          </button>
        </div>

        <div className="h-full pb-[150px]">
          <ul className="h-full space-y-6 overflow-y-auto p-4" dir="rtl">
            <SearchInput />
            <PriceSelector />
            <CategorySelector />
            <StockStatusFilter />
            <DiscountFilter />
          </ul>
        </div>

        <div className="sticky bottom-0 left-0 right-0 flex items-center justify-between border-t bg-muted p-4 px-6 py-4">
          <button className="btn-primary w-full py-3 text-sm" type="button" onClick={handleApplyFilters}>
            مشاهده {totalCount} محصول
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileFilter;
