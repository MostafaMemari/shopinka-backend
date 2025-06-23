'use client';

import Link from 'next/link';
import { HiOutlineLogout } from 'react-icons/hi';
import { usePathname } from 'next/navigation';
import Toast from '@/utils/swalToast';
import { logout } from '@/service/authService';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';
import { useState } from 'react';
import { profileMenuItems } from '@/data/menuData';

interface ProfileMenuProps {
  closeDropdown: () => void;
}

const ProfileMenu = ({ closeDropdown }: ProfileMenuProps) => {
  const pathname = usePathname();
  const { logoutUser } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleUserLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await logout();
      if (res?.status === 201 || res?.status === 200) {
        closeDropdown();
        logoutUser();
        Toast.fire({ icon: 'success', title: 'خروج با موفقیت انجام شد' });
      }
    } catch (err) {
      console.error('Logout error:', err);
      Toast.fire({ icon: 'error', title: 'خروج با خطا مواجه شد' });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="absolute left-0 top-full z-10 w-60 rounded-lg border-t-2 border-t-primary bg-muted shadow-lg dark:bg-gray-800 transition-all duration-200 origin-top scale-100 opacity-100 translate-y-0 pointer-events-auto">
      <ul className="space-y-1 p-2">
        {profileMenuItems.map((item) => (
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
            disabled={isLoggingOut}
          >
            <HiOutlineLogout className="h-6 w-6 group-hover:text-red-600 dark:group-hover:text-red-300" />
            <span className="group-hover:text-red-600 dark:group-hover:text-red-300">{isLoggingOut ? 'در حال خروج...' : 'خروج'}</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
