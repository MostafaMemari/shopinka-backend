'use client';

import { useAuth } from '@/Modules/auth/hooks/useAuth';
import { logout } from '@/Modules/auth/services/auth.api';
import Toast from '@/shared/utils/swalToast';
import { PulseLoader } from 'react-spinners';
import Link from 'next/link';
import { HiOutlineBell, HiOutlineChevronLeft, HiOutlineClock, HiOutlineHeart, HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';
import { BiLogIn } from 'react-icons/bi';
import { usePathname } from 'next/navigation';
import { useDropdown } from '@/shared/hooks/useDropdown';
import IconButtonWithBadge from '../IconButtonWithBadge';
import SkeletonLoader from '../SkeletonLoader';

const ProfileDropdown = () => {
  const pathname = usePathname();
  const { isLogin, user, logoutUser, isLoading } = useAuth();
  const { isOpen, dropdownRef, handleMouseEnter, handleMouseLeave, closeDropdown } = useDropdown({
    closeOnOutsideClick: false,
    openOnHover: true,
  });

  const handleUserLogout = async () => {
    try {
      const res = await logout();
      if (res?.status === 201 || res?.status === 200) {
        logoutUser();
        Toast.fire({ icon: 'success', title: 'خروج با موفقیت انجام شد' });
        closeDropdown();
      }
    } catch (err) {
      console.error('Logout error:', err);
      Toast.fire({ icon: 'error', title: 'خروج با خطا مواجه شد' });
    }
  };

  const menuItems = [
    {
      href: '/profile',
      icon: HiOutlineUser,
      label: user?.full_name || 'کاربر گرامی',
      isProfile: true,
    },
    { href: '/profile-orders', icon: HiOutlineClock, label: 'سفارش‌ها' },
    { href: '/profile-favorite', icon: HiOutlineHeart, label: 'علاقه‌مندی‌ها' },
    {
      href: '/profile-notification',
      icon: HiOutlineBell,
      label: 'پیام‌ها',
      badge: (
        <span className="relative flex h-5 w-5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-btn text-sm text-white">2</span>
        </span>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex h-9 items-center justify-center gap-2 rounded-full px-4">
        <SkeletonLoader width="2rem" height="2rem" className="rounded-full" />
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isLogin ? (
        <>
          <IconButtonWithBadge
            icon={<HiOutlineUser className="h-6 w-6 cursor-pointer" />}
            badgeCount={0}
            onClick={closeDropdown}
            ariaLabel="باز کردن منوی پروفایل"
          />
          <div
            className={`absolute left-0 z-10 w-60 rounded-lg border-t-2 border-t-primary bg-muted shadow-lg dark:bg-gray-800 transition-all duration-200 origin-top ${
              isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}
          >
            <ul className="space-y-1 p-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-x-2 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition group"
                    aria-current={pathname === item.href ? 'page' : undefined}
                    onClick={closeDropdown}
                  >
                    <span className="flex items-center gap-x-4">
                      <span className="flex items-center gap-x-2">
                        <item.icon className="h-6 w-6 group-hover:text-primary dark:group-hover:text-emerald-400" />
                        <span className="group-hover:text-primary dark:group-hover:text-emerald-400">{item.label}</span>
                      </span>
                    </span>
                    {item.badge ||
                      (item.isProfile && (
                        <HiOutlineChevronLeft className="h-6 w-6 group-hover:text-primary dark:group-hover:text-emerald-400" />
                      ))}
                  </Link>
                </li>
              ))}
              <li>
                <div className="my-2 h-px w-full rounded-full bg-border" />
              </li>
              <li>
                <button
                  onClick={handleUserLogout}
                  className="w-full flex items-center gap-x-2 rounded-lg p-4 text-red-500 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20 transition group cursor-pointer"
                  aria-label="خروج از حساب کاربری"
                >
                  <HiOutlineLogout className="h-6 w-6 group-hover:text-red-600 dark:group-hover:text-red-300" />
                  <span className="group-hover:text-red-600 dark:group-hover:text-red-300">خروج</span>
                </button>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <Link href={`/login/?backUrl=${pathname}`}>
          <div className="flex h-9 items-center justify-center gap-2 rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-700 dark:border-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <BiLogIn size={18} className="transform scale-x-[-1]" />
            ورود | ثبت‌نام
          </div>
        </Link>
      )}
    </div>
  );
};

export default ProfileDropdown;
