import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import Lucide from "../Lucide";

interface SearchInputProps {
  onSearch: (searchValue: string) => void;
  placeholder?: string;
  searchType?: "change" | "enter";
  debounceDelay?: number;
}

// نوع سفارشی برای ref
export interface SearchInputHandle {
  clearAndFocus: () => void; // متد سفارشی
  setValue: (value: string) => void;
}
const SearchInput = forwardRef<SearchInputHandle, SearchInputProps>(
  ({ onSearch, placeholder = "جستجو...", searchType = "enter", debounceDelay = 300 }, ref) => {
    const [searchValue, setSearchValue] = useState<string>("");

    useEffect(() => {
      if (searchType === "change") {
        const handler = setTimeout(() => {
          onSearch(searchValue);
        }, debounceDelay);

        return () => clearTimeout(handler);
      }
    }, [searchValue, searchType, debounceDelay, onSearch]);

    const handleSearch = () => {
      onSearch(searchValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (searchType === "enter" && e.key === "Enter") {
        handleSearch();
      }
    };

    // رفرنس داخلی برای input
    const inputRef = useRef<HTMLInputElement>(null);

    // تعریف متدهای سفارشی که به رفرنس اضافه می‌شوند
    useImperativeHandle(ref, () => ({
      ...(inputRef.current as HTMLInputElement), // اضافه کردن ویژگی‌های استاندارد HTMLInputElement
      clearAndFocus: () => {
        setSearchValue(""); // پاک کردن مقدار state
        inputRef.current?.focus(); // فوکوس روی input
      },
      setValue: (value: string) => {
        setSearchValue(value);
      },
    }));

    return (
      <div className="w-auto">
        <div className="relative w-56 text-slate-500">
          <input
            type="text"
            ref={inputRef} // اتصال رفرنس داخلی به input
            className="w-56 pr-4 !box"
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Lucide
            icon="Search"
            className={`absolute inset-y-0 left-0 w-4 h-4 my-auto ml-3 cursor-pointer ${searchValue ? "text-slate-700" : "text-slate-500"}`}
            onClick={handleSearch}
          />
        </div>
      </div>
    );
  }
);

export default SearchInput;
