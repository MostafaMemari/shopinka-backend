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
          className="flex items-center justify-between w-full rounded-lg p-4 text-red-500 hover:bg-warning/10 cursor-pointer"
          aria-label="خروج از حساب کاربری"
        >
          <div className="flex items-center gap-x-2">
            <HiOutlineLogout className="h-6 w-6" />
            <span>{isLoggingOut ? 'در حال خروج...' : 'خروج'}</span>
          </div>
        </button>
      </li>
    </ul>
  );
}

export default ProfileMenu;
