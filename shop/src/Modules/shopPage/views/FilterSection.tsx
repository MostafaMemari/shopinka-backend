'use client';

import CategorySelector from '../components/filters/CategorySelector';
import SearchInput from '../components/filters/SearchInput';
import StockStatusFilter from '../components/filters/StockStatusFilter';
import DiscountFilter from '../components/filters/DiscountFilter';
import PriceSelector from '../components/filters/PriceSelector';
import { Category } from '@/Modules/category/types/categoryType';
import { useState } from 'react';

const FilterSection = () => {
  return (
    <div className="col-span-4 row-span-2 hidden md:block lg:col-span-3">
      <div className="sticky top-32 mb-4 overflow-hidden rounded-lg bg-muted shadow-base">
        <div dir="ltr" className="flex max-h-[calc(95vh_-_100px)] flex-col overflow-y-auto overflow-x-hidden px-4 py-3">
          <div dir="rtl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="xl:text-lg">فیلتر محصولات</h3>
              <button className="btn-primary-nobg py-2 text-sm">حذف همه</button>
            </div>
            <ul className="space-y-6">
              <SearchInput />
              <PriceSelector />
              <CategorySelector />
              {/* <BrandSelector /> */}
              {/* <AttributeSelector /> */}
              <StockStatusFilter />
              <DiscountFilter />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
