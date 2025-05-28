import React from 'react';

function SearchInput() {
  return (
    <li>
      <label className="sr-only">جستجوی فروشگاه</label>
      <input
        className="w-full rounded-lg border-none bg-background px-2 py-3 text-text/90 outline-none placeholder:text-sm placeholder:text-text/60 focus:ring-0"
        placeholder="جستجو در بین نتایج ..."
        type="text"
      />
    </li>
  );
}

export default SearchInput;
