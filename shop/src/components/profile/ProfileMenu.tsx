'use client';

import { profileMenuItem } from '@/data/profileMenuItem';
import { useAuth } from '@/hooks/auth/useAuth';
import { logout } from '@/service/authService';
import Toast from '@/utils/swalToast';
import { cn } from '@/utils/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiOutlineLogout } from 'react-icons/hi';

type ProfileMenuProps = {
  onClose?: () => void;
};

function ProfileMenu({ onClose }: ProfileMenuProps) {
  const pathname = usePathname();
  const { logoutUser } = useAuth();
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleUserLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await logout();
      if (res?.status === 201 || res?.status === 200) {
        router.push('/');

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
    <ul className="space-y-1">
      {profileMenuItem.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={cn(
              'profile-menu flex items-center justify-between rounded-lg px-2 py-4 xl:px-4',
              pathname === item.href && 'profile-menu-active',
            )}
            onClick={onClose}
          >
            <div className="flex items-center gap-x-4">
              <item.icon className="h-6 w-6" />
              <div>{item.label}</div>
            </div>
          </Link>
        </li>
      ))}
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
  );
}

export default ProfileMenu;
