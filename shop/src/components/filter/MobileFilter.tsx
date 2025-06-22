'use client';

import { FC, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import MobileDrawer from '@/components/ui/MobileDrawer';
import CategorySelector from '@/components/category/CategorySelector';
import SearchInput from './SearchInput';

interface MobileFilterProps {
  totalCount: number;
  type?: 'BLOG' | 'SHOP';
  title?: string;
}

const MobileFilter: FC<MobileFilterProps> = ({ totalCount, type, title }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  return (
    <>
      <MobileDrawer
        isOpen={isOpenDrawer}
        onOpen={() => setIsOpenDrawer(true)}
        onClose={() => setIsOpenDrawer(false)}
        title={title || 'فیلتر محصولات'}
        triggerButton={
          <div className="flex w-full cursor-pointer items-center gap-x-4 rounded-lg bg-muted px-4 py-3 text-sm xs:text-base">
            <FiFilter className="h-6 w-6" />
            <div>فیلتر</div>
          </div>
        }
        footerActions={
          <button onClick={() => setIsOpenDrawer(false)} className="btn-primary w-full py-3 text-sm" type="button">
            مشاهده {totalCount} محصول
          </button>
        }
      >
        <ul className="space-y-6 p-4" dir="rtl">
          <SearchInput />
          <CategorySelector type={type} title="فیلتر بر اساس دسته‌بندی" />
        </ul>
      </MobileDrawer>
    </>
  );
};

export default MobileFilter;
