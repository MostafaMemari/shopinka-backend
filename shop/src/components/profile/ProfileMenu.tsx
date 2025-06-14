'use client';

import { profileMenuItem } from '@/data/profileMenuItem';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { BiExit } from 'react-icons/bi';

type ProfileMenuProps = {
  onClose?: () => void;
};

function ProfileMenu({ onClose }: ProfileMenuProps) {
  const pathname = usePathname();

  return (
    <ul className="space-y-1">
      {profileMenuItem.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={`profile-menu flex items-center justify-between rounded-lg px-2 py-4 xl:px-4 ${
              pathname === item.href ? 'profile-menu-active' : ''
            }`}
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
        <Link
          className="flex items-center justify-between rounded-lg p-4 text-red-500 hover:bg-warning/10 dark:text-red-400 dark:hover:bg-red-400/10"
          href="#"
        >
          <div className="flex items-center gap-x-2">
            <BiExit className="h-6 w-6" />
            <span>خروج</span>
          </div>
        </Link>
      </li>
    </ul>
  );
}

export default ProfileMenu;
