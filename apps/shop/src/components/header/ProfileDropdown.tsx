"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineBell, HiOutlineChevronLeft, HiOutlineClock, HiOutlineHeart, HiOutlineLogout, HiOutlineUser } from "react-icons/hi";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isHoverSupported = window.matchMedia("(hover: hover)").matches;
    setIsDesktop(isHoverSupported);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openDropdown = () => {
    if (isDesktop) setIsOpen(true);
  };

  const closeDropdown = () => {
    if (isDesktop) setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!isDesktop) setIsOpen((prev) => !prev);
    else setIsOpen(true);
  };

  return (
    <div className="relative" ref={dropdownRef} onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
      <button
        type="button"
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
        onClick={toggleDropdown}
      >
        <HiOutlineUser className="h-6 w-6" />
      </button>

      {/* Dropdown with animation */}
      <div
        className={`absolute left-0 z-10 w-60 rounded-lg border-t-2 border-t-primary bg-muted shadow-lg dark:bg-gray-800 transition-all duration-300 origin-top ${
          isOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <ul className="space-y-1 p-2">
          <li>
            <Link
              href="/profile"
              className="flex items-center justify-between gap-x-2 rounded-lg p-4 hover:text-primary dark:hover:text-emerald-400"
            >
              <span className="flex items-center gap-x-4">
                <Image src="/images/user.png" alt="profile" width={32} height={32} className="rounded-full" />
                <span className="line-clamp-1">نام تستی تستی</span>
              </span>
              <HiOutlineChevronLeft className="h-6 w-6" />
            </Link>
          </li>
          <li>
            <Link
              href="/profile-orders"
              className="flex items-center gap-x-2 rounded-lg p-4 hover:text-primary dark:hover:text-emerald-400"
            >
              <HiOutlineClock className="h-6 w-6" />
              <span>سفارش ها</span>
            </Link>
          </li>
          <li>
            <Link
              href="/profile-favorite"
              className="flex items-center gap-x-2 rounded-lg p-4 hover:text-primary dark:hover:text-emerald-400"
            >
              <HiOutlineHeart className="h-6 w-6" />
              <span>علاقه‌مندی ها</span>
            </Link>
          </li>
          <li>
            <Link
              href="/profile-notification"
              className="flex items-center justify-between rounded-lg p-4 hover:text-primary dark:hover:text-emerald-400"
            >
              <span className="flex items-center gap-x-2">
                <HiOutlineBell className="h-6 w-6" />
                <span>پیام ها</span>
              </span>
              <span className="relative flex h-5 w-5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-btn text-sm text-white">
                  2
                </span>
              </span>
            </Link>
          </li>
          <li>
            <div className="my-2 h-px w-full rounded-full bg-border" />
          </li>
          <li>
            <Link
              href="/logout"
              className="flex items-center gap-x-2 rounded-lg p-4 text-red-500 hover:bg-warning/10 dark:text-red-400 dark:hover:bg-red-400/10"
            >
              <HiOutlineLogout className="h-6 w-6" />
              <span>خروج</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDropdown;

{
  /* <Link href="./login.html">
<div
  className="flex h-8 cursor-pointer items-center justify-center rounded-lg border  px-4 text-sm font-medium  transition-colors duration-200 hover:bg-primary hover:text-white    dark:hover:bg-primary dark:hover:text-white"
>
  ورود \ ثبت نام
</div>
      </Link>  */
}

{
  /* <Link href="./login.html">
                    <div
                      className="flex h-8 cursor-pointer items-center justify-center rounded-lg border  px-4 text-xs font-medium  transition-colors duration-200 hover:bg-primary hover:text-white    dark:hover:bg-primary dark:hover:text-white xs:text-sm"
                    >
                      ورود \ ثبت نام
                    </div>
                  </Link> */
}
{
  /* <!-- Cart --> */
}
