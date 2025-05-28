'use client';

import { FC } from 'react';
import { FiFilter } from 'react-icons/fi';
import { BsSortDown } from 'react-icons/bs';

interface MobileOptionsProps {
  onFilterClick?: () => void;
  onSortClick?: () => void;
}

const MobileOptions: FC<MobileOptionsProps> = ({ onFilterClick, onSortClick }) => {
  return (
    <div className="mb-6 flex items-center justify-center gap-x-4 md:hidden">
      <button
        className="flex w-full items-center gap-x-4 rounded-lg bg-muted px-4 py-3 text-sm xs:text-base"
        onClick={onFilterClick}
        aria-controls="shop-filter-drawer-navigation"
        type="button"
      >
        <FiFilter className="h-6 w-6" />
        <div>فیلتر</div>
      </button>
      <button
        className="flex w-full items-center gap-x-4 rounded-lg bg-muted px-4 py-3 text-sm xs:text-base"
        onClick={onSortClick}
        aria-controls="shop-sort-drawer-navigation"
        type="button"
      >
        <BsSortDown className="h-6 w-6" />
        <div>مرتب سازی</div>
      </button>
    </div>
  );
};

export default MobileOptions;
