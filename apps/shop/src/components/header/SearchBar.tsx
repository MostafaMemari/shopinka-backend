"use client";

import { HiOutlineClock, HiOutlineSearch, HiOutlineSparkles } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import CarouselSearchBar from "@/components/Carousel/CarouselSearchBar";

interface SearchItem {
  id: string;
  title: string;
  href: string;
  image?: string;
}

interface SearchBarProps {
  isMobile?: boolean;
  productItems: SearchItem[];
  recentSearchItems: SearchItem[];
}

const SearchBar = ({ isMobile = false, productItems, recentSearchItems }: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`relative ${isMobile ? "" : "max-w-xl flex-1"}`} id="desktopHeaderSearchBase">
      <div
        className={`flex items-center justify-between rounded-t-lg px-2 transition-all duration-200
        ${isMobile ? "bg-background" : "border-b-transparent bg-background dark:border-white/10"}
        ${isMobile && isOpen ? "border border-b-0 border-border bg-white" : ""}
        `}
      >
        <div>
          <HiOutlineSearch className="h-6 w-6" />
        </div>
        <label className="sr-only">search</label>
        <input
          id="desktopHeaderSearch"
          className={`flex grow rounded-lg border-none px-2 py-3 outline-hidden placeholder:text-sm placeholder:text-text/60 focus:ring-0
          ${isMobile ? "bg-red" : "bg-background text-text/90"}
          `}
          placeholder="جستجو کنید ..."
          type="text"
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <div
          className={`absolute inset-x-0 top-full w-full overflow-hidden rounded-b-lg border border-t-transparent bg-muted dark:border-white/10 dark:border-t-transparent`}
        >
          <div className="max-h-[450px] overflow-y-auto py-5">
            {productItems.length > 0 && (
              <div className="mb-8 px-5">
                <CarouselSearchBar items={productItems} variant="product" />
              </div>
            )}

            <div className="space-y-6">
              {recentSearchItems.length > 0 && (
                <div className="px-5">
                  <div className="mb-4 flex items-center gap-x-2 text-text/90">
                    <HiOutlineClock className="h-6 w-6" />
                    <p>جستجو های اخیر شما</p>
                  </div>
                  <CarouselSearchBar items={recentSearchItems} variant="search" />
                </div>
              )}

              <div className="px-5">
                <div className="mb-4 flex items-center gap-x-2 text-text/90">
                  <HiOutlineSparkles className="h-6 w-6" />
                  <p>جستجو های پرطرفدار</p>
                </div>
                <CarouselSearchBar items={recentSearchItems} variant="search" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
