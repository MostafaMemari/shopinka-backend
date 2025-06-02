'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineBell, HiOutlineChevronLeft, HiOutlineClock, HiOutlineHeart, HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';
import { BiLogIn } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/Modules/auth/hooks/useAuth';
import { logout } from '@/Modules/auth/services/auth.api';
import Toast from '@/shared/utils/swalToast';
import { BeatLoader, PulseLoader } from 'react-spinners';

const ProfileDropdown = () => {
  const currentPath = usePathname();
  const { isLogin, user, logoutUser, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const isHoverSupported = window.matchMedia('(hover: hover)').matches;
    setIsDesktop(isHoverSupported);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openDropdown = () => {
    if (isDesktop) setIsOpen(true);
  };

  const closeDropdown = () => {
    if (isDesktop) setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleUserLogout = async () => {
    try {
      const res = await logout();
      if (res?.status === 201) {
        logoutUser();
        Toast.fire({ icon: 'success', title: 'خروج با موفقیت انجام شد' });
        router.refresh();
        setIsOpen(false);
      }
    } catch (err) {
      console.error(err);
      Toast.fire({ icon: 'error', title: 'خروج با خطا مواجه شد' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-9 items-center justify-center gap-2 rounded-full bg-transparent px-4">
        <PulseLoader color="var(--color-primary, #10b981)" size={6} loading={true} aria-label="در حال بارگذاری" />
      </div>
    );
  }

  return (
    <>
      {!isLogin ? (
        <Link href={`/login/?backUrl=${currentPath}`}>
          <div className="flex h-9 items-center justify-center gap-2 rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-700 dark:border-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <BiLogIn size={18} className="transform scale-x-[-1]" />
            ورود | ثبت‌نام
          </div>
        </Link>
      ) : (
        <div className="relative" ref={dropdownRef} onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
          <button
            type="button"
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={toggleDropdown}
            aria-label="باز کردن منوی پروفایل"
          >
            <HiOutlineUser className="h-6 w-6" />
          </button>

          <div
            className={`absolute left-0 z-10 w-60 rounded-lg border-t-2 border-t-primary bg-muted shadow-lg dark:bg-gray-800 transition-all duration-200 origin-top ${
              isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}
          >
            <ul className="space-y-1 p-2">
              <li>
                <Link
                  href="/profile"
                  className="flex items-center justify-between gap-x-2 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition group"
                  aria-current={currentPath === '/profile' ? 'page' : undefined}
                >
                  <span className="flex items-center gap-x-4">
                    <Image src="/images/user.png" alt="پروفایل کاربر" width={32} height={32} className="rounded-full" priority />
                    <span className="line-clamp-1 group-hover:text-primary dark:group-hover:text-emerald-400">
                      {user?.full_name ?? 'کاربر گرامی'}
                    </span>
                  </span>
                  <HiOutlineChevronLeft className="h-6 w-6 group-hover:text-primary dark:group-hover:text-emerald-400" />
                </Link>
              </li>
              <li>
                <Link
                  href="/profile-orders"
                  className="flex items-center gap-x-2 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition group"
                  aria-current={currentPath === '/profile-orders' ? 'page' : undefined}
                >
                  <HiOutlineClock className="h-6 w-6 group-hover:text-primary dark:group-hover:text-emerald-400" />
                  <span className="group-hover:text-primary dark:group-hover:text-emerald-400">سفارش‌ها</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/profile-favorite"
                  className="flex items-center gap-x-2 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition group"
                  aria-current={currentPath === '/profile-favorite' ? 'page' : undefined}
                >
                  <HiOutlineHeart className="h-6 w-6 group-hover:text-primary dark:group-hover:text-emerald-400" />
                  <span className="group-hover:text-primary dark:group-hover:text-emerald-400">علاقه‌مندی‌ها</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/profile-notification"
                  className="flex items-center justify-between rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition group"
                  aria-current={currentPath === '/profile-notification' ? 'page' : undefined}
                >
                  <span className="flex items-center gap-x-2">
                    <HiOutlineBell className="h-6 w-6 group-hover:text-primary dark:group-hover:text-emerald-400" />
                    <span className="group-hover:text-primary dark:group-hover:text-emerald-400">پیام‌ها</span>
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
                <button
                  onClick={handleUserLogout}
                  className="w-full flex items-center gap-x-2 rounded-lg p-4 text-red-500 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20 transition group"
                  aria-label="خروج از حساب کاربری"
                >
                  <HiOutlineLogout className="h-6 w-6 group-hover:text-red-600 dark:group-hover:text-red-300" />
                  <span className="group-hover:text-red-600 dark:group-hover:text-red-300">خروج</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDropdown;
