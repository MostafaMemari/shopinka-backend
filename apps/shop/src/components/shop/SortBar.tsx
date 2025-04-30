"use client";

import { FC, useState } from "react";
import { BsSortDown } from "react-icons/bs";

interface SortBarProps {
  onSortChange?: (sortOption: string) => void;
}

const SortBar: FC<SortBarProps> = ({ onSortChange }) => {
  const [activeSort, setActiveSort] = useState("جدید ترین");
  const sortOptions = ["جدید ترین", "پرفروش ترین", "گران ترین", "ارزان ترین"];

  const handleSortClick = (option: string) => {
    setActiveSort(option);
    if (onSortChange) {
      onSortChange(option);
    }
  };

  return (
    <div className="hidden md:block">
      <div className="flex h-14 items-center gap-x-2 rounded-lg bg-muted px-2 text-text/90 shadow-base lg:px-4">
        <div className="flex items-center gap-x-2 text-sm lg:text-base">
          <BsSortDown className="h-6 w-6" />
          <p>مرتب سازی بر اساس</p>
        </div>
        {sortOptions.map((option) => (
          <button
            key={option}
            className={`rounded-lg px-1 py-2 text-sm hover:bg-background lg:px-4 ${activeSort === option ? "sort-button-active" : ""}`}
            onClick={() => handleSortClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortBar;
