'use client';

import { useResetPageOnQueryChange } from '@/hooks/useResetPageOnQueryChange';
import { useQueryState } from 'nuqs';
import React from 'react';

function StockStatusFilter() {
  const [isInStock, setIsInStock] = useQueryState<boolean>('stockStatus', {
    parse: (value) => value === 'instock',
    serialize: (value) => (value ? 'instock' : ''),
    defaultValue: false,
    history: 'replace',
    shallow: false,
  });

  useResetPageOnQueryChange(JSON.stringify(isInStock));

  return (
    <li>
      <label className="flex cursor-pointer items-center justify-between py-3" htmlFor="onlyAvailableDesktop">
        <div>فقط کالاهای موجود</div>
        <div className="relative inline-flex cursor-pointer items-center">
          <input
            className="peer sr-only"
            id="onlyAvailableDesktop"
            type="checkbox"
            checked={isInStock}
            onChange={() => setIsInStock(!isInStock)}
          />
          <div className="peer h-6 w-11 rounded-full bg-background after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-muted after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:ring-emerald-500 dark:bg-zinc-800 peer-focus:dark:ring-emerald-400"></div>
        </div>
      </label>
    </li>
  );
}

export default StockStatusFilter;
