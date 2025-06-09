'use client';

import { FC, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import SearchInput from '../FilterDesktop/SearchInput';
import PriceSelector from '../PriceSelector';
import CategorySelector from '../FilterDesktop/CategorySelector';
import StockStatusFilter from '../FilterDesktop/StockStatusFilter';
import DiscountFilter from '../FilterDesktop/DiscountFilter';
import MobileDrawer from '@/shared/components/MobileDrawer';

interface MobileFilterProps {
  totalCount: number;
}

const MobileFilter: FC<MobileFilterProps> = ({ totalCount }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  return (
    <>
      <MobileDrawer
        isOpen={isOpenDrawer}
        onOpen={() => setIsOpenDrawer(true)}
        onClose={() => setIsOpenDrawer(false)}
        title="فیلتر محصولات"
        triggerButton={
          <div className="flex w-full cursor-pointer items-center gap-x-4 rounded-lg bg-muted px-4 py-3 text-sm xs:text-base">
            <FiFilter className="h-6 w-6" />
            <div>فیلتر</div>
          </div>
        }
        footerActions={
          <button className="btn-primary w-full py-3 text-sm" type="button">
            مشاهده {totalCount} محصول
          </button>
        }
      >
        <ul className="space-y-6 p-4" dir="rtl">
          <SearchInput />
          <PriceSelector />
          <CategorySelector />
          <StockStatusFilter />
          <DiscountFilter />
        </ul>
      </MobileDrawer>
    </>
  );
};

export default MobileFilter;
