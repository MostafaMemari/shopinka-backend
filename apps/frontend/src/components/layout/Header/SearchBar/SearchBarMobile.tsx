"use client";

import { HiOutlineClock, HiOutlineSearch, HiOutlineSparkles } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import CustomSwiper from "./Components/CustomSwiper";

const SearchBarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const productItems = [
    {
      id: "1",
      title: "کفش نایک کفش نایک کفش نایک",
      href: "/",
      image: "/images/products/p6.png",
    },
    {
      id: "2",
      title: "کفش آدیداس",
      href: "/",
      image: "/images/products/p4.png",
    },
    {
      id: "3",
      title: "کفش پوما",
      href: "/",
      image: "/images/products/p5.png",
    },
  ];

  const recentSearchItems = [
    {
      id: "1",
      title: "کفش نایک",
      href: "/",
    },
    {
      id: "2",
      title: "کفش آدیداس",
      href: "/",
    },
    {
      id: "3",
      title: "کفش پوما",
      href: "/",
    },
  ];

  const popularSearchItems = [
    {
      id: "1",
      title: "کفش نایک",
      href: "/",
    },
    {
      id: "2",
      title: "کفش آدیداس",
      href: "/",
    },
    {
      id: "3",
      title: "کفش پوما",
      href: "/",
    },
  ];

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
    <div className="relative" id="desktopHeaderSearchBase" ref={wrapperRef}>
      <div
        className={`flex items-center justify-between rounded-t-lg bg-background px-2 transition-all duration-200 ${
          isOpen ? "border border-b-0 border-border bg-white" : ""
        }`}
      >
        <div>
          <HiOutlineSearch className="h-6 w-6" />
        </div>
        <label className="sr-only">desktop header search</label>
        <input
          id="desktopHeaderSearch"
          className="flex grow rounded-lg border-none bg-red px-2 py-3 outline-hidden placeholder:text-sm placeholder:text-text/60 focus:ring-0"
          placeholder="جستجو کنید ..."
          type="text"
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <div
          className={`absolute inset-x-0 top-full w-full overflow-hidden rounded-b-lg border border-t-transparent bg-muted dark:border-white/10 dark:border-t-transparent ${
            isOpen ? "border-border" : ""
          }`}
        >
          <div className="max-h-[450px] overflow-y-auto py-5">
            <div className="mb-8 px-5">
              <CustomSwiper items={productItems} variant="product" />
            </div>

            <div className="space-y-6">
              <div className="px-5">
                <div className="mb-4 flex items-center gap-x-2 text-text/90">
                  <HiOutlineClock className="h-6 w-6" />
                  <p>جستجو های اخیر شما</p>
                </div>
                <CustomSwiper items={recentSearchItems} variant="search" />
              </div>

              <div className="px-5">
                <div className="mb-4 flex items-center gap-x-2 text-text/90">
                  <HiOutlineSparkles className="h-6 w-6" />
                  <p>جستجو های پرطرفدار</p>
                </div>
                <CustomSwiper items={popularSearchItems} variant="search" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBarMobile;
