'use client';

import { useState } from 'react';
import { BiSort } from 'react-icons/bi';
import { useQueryState } from 'nuqs';

import MobileDrawer from '@/components/ui/MobileDrawer';

type SortOption = {
  label: string;
  value: string;
};

interface MobileSortProps {
  options: Record<string, SortOption>;
  queryKey?: string;
  title?: string;
}

const MobileSort = ({ options, queryKey = 'sort', title = 'مرتب‌سازی' }: MobileSortProps) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const [sortBy, setSortBy] = useQueryState(queryKey, {
    defaultValue: '',
    history: 'replace',
    shallow: false,
  });

  const handleOptionClick = (value: string) => {
    setSortBy(value);
    setIsOpenDrawer(false);
  };

  return (
    <>
      <MobileDrawer
        isOpen={isOpenDrawer}
        onOpen={() => setIsOpenDrawer(true)}
        onClose={() => setIsOpenDrawer(false)}
        title={title}
        triggerButton={
          <div className="flex w-full cursor-pointer items-center gap-x-4 rounded-lg bg-muted px-4 py-3 text-sm xs:text-base">
            <BiSort className="h-6 w-6" />
            <div>{title}</div>
          </div>
        }
      >
        <div className="main-scroll h-full space-y-2 divide-y overflow-y-auto p-4">
          <fieldset className="flex flex-col space-y-2" dir="rtl">
            <legend className="sr-only">{title}</legend>
            {Object.entries(options).map(([key, option]) => (
              <div key={key}>
                <input
                  className="peer hidden"
                  id={`sort-${option.value}`}
                  name="sort"
                  type="radio"
                  value={option.value}
                  checked={sortBy === option.value}
                  onChange={() => handleOptionClick(option.value)}
                />
                <label
                  className="relative block w-full cursor-pointer rounded-lg border p-4 shadow-base peer-checked:border-primary peer-checked:dark:border-primary"
                  htmlFor={`sort-${option.value}`}
                >
                  <p className="text-center text-text/90">{option.label}</p>
                </label>
              </div>
            ))}
          </fieldset>
        </div>
      </MobileDrawer>
    </>
  );
};

export default MobileSort;
