'use client';

import React from 'react';
import { FaTimes, FaHome, FaShoppingCart, FaHeart, FaEye, FaBell, FaMapMarkerAlt, FaUserEdit, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';

interface ProfileMenuItem {
  id: string;
  title: string;
  link: string;
  icon: React.ReactElement;
  badge?: number;
  isActive?: boolean;
}

interface ProfileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileMenuDrawer: React.FC<ProfileMenuDrawerProps> = ({ isOpen, onClose }) => {
  const menuItems: ProfileMenuItem[] = [
    { id: 'dashboard', title: 'پیشخوان', link: '/profile', icon: <FaHome className="h-6 w-6" /> },
    { id: 'orders', title: 'سفارش ها', link: '/profile/orders', icon: <FaShoppingCart className="h-6 w-6" /> },
    { id: 'favorites', title: 'علاقه‌مندی ها', link: '/profile/favorites', icon: <FaHeart className="h-6 w-6" /> },
    { id: 'recent', title: 'بازدید های اخیر', link: '/profile/recent', icon: <FaEye className="h-6 w-6" /> },
    {
      id: 'notifications',
      title: 'پیام ها',
      link: '/profile/notifications',
      icon: <FaBell className="h-6 w-6" />,
      badge: 10,
    },
    {
      id: 'addresses',
      title: 'آدرس ها',
      link: '/profile/addresses',
      icon: <FaMapMarkerAlt className="h-6 w-6" />,
      isActive: true,
    },
    {
      id: 'profile-edit',
      title: 'اطلاعات حساب کاربری',
      link: '/profile/edit',
      icon: <FaUserEdit className="h-6 w-6" />,
    },
    {
      id: 'logout',
      title: 'خروج',
      link: '#',
      icon: <FaSignOutAlt className="h-6 w-6" />,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 w-full rounded-t-3xl bg-muted transition-transform duration-300">
      <div className="flex items-center justify-between gap-x-4 border-b p-4 pb-5">
        <h5 className="text-lg text-text/90">منوی پنل کاربری</h5>
        <button
          onClick={onClose}
          className="inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-text/90 hover:bg-zinc-100 hover:text-gray-900 dark:hover:bg-black dark:hover:text-white"
        >
          <FaTimes className="h-5 w-5" />
          <span className="sr-only">Close menu</span>
        </button>
      </div>
      <div className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link}
                className={`profile-menu flex items-center justify-between rounded-lg px-2 py-4 xl:px-4 ${
                  item.isActive
                    ? 'profile-menu-active'
                    : item.id === 'logout'
                      ? 'text-red-500 hover:bg-warning/10 dark:text-red-400 dark:hover:bg-red-400/10'
                      : ''
                }`}
              >
                <div className="flex items-center gap-x-4">
                  {item.icon}
                  <div>{item.title}</div>
                </div>
                {item.badge && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white dark:bg-emerald-600">
                    {item.badge}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileMenuDrawer;
