import SortDrawer from '@/shared/components/SortDrawer';
import { useState } from 'react';
import { BsSortDown } from 'react-icons/bs';

const SORT_OPTIONS = {
  default: { label: 'پیش‌فرض', value: '' },
  newest: { label: 'جدیدترین', value: 'newest' },
  price_asc: { label: 'ارزان‌ترین', value: 'price_asc' },
  price_desc: { label: 'گران‌ترین', value: 'price_desc' },
};

function MobileSortDrawer() {
  const [sortBy, setSortBy] = useState('');

  return (
    <SortDrawer
      title="مرتب‌سازی محصولات"
      triggerButton={
        <div className="flex w-full items-center gap-x-4 rounded-lg bg-muted px-4 py-3 text-sm xs:text-base">
          <BsSortDown className="h-6 w-6" />
          <div>{Object.values(SORT_OPTIONS).find((opt) => opt.value === sortBy)?.label || 'مرتب‌سازی'}</div>
        </div>
      }
      options={Object.values(SORT_OPTIONS)}
      selectedOption={sortBy}
      onOptionChange={(value) => setSortBy(value)}
    />
  );
}

export default MobileSortDrawer;
