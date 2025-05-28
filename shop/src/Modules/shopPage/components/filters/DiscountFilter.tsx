import React from 'react';

function DiscountFilter() {
  return (
    <li>
      <label className="flex cursor-pointer items-center justify-between py-3" htmlFor="onlySpecialDesktop">
        <div>فقط محصولات ویژه</div>
        <div className="relative inline-flex cursor-pointer items-center">
          <input className="peer sr-only" id="onlySpecialDesktop" type="checkbox" />
          <div className="peer h-6 w-11 rounded-full bg-background after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-muted after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:ring-emerald-500 dark:bg-zinc-800 peer-focus:dark:ring-emerald-400"></div>
        </div>
      </label>
    </li>
  );
}

export default DiscountFilter;
