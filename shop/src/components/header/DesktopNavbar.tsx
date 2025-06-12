// components/DesktopNavbar.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Category } from '@/types/categoryType';
import CategoryMenu from './CategoryMenu';
import MenuItemComponent from './MenuItem';

interface MenuItem {
  id: number;
  name: string;
  href: string;
  subItems?: { id: number; name: string; href: string }[];
  color?: { light: string; dark: string };
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'فروش ویژه',
    href: './special-sale.html',
    color: { light: '#ef4444', dark: '#f87171' },
  },
  {
    id: 10,
    name: 'فروشگاه',
    href: '/shop',
    color: { light: '#ef4444', dark: '#f87171' },
  },
  {
    id: 2,
    name: 'چرا روتی کالا',
    href: './why-us.html',
  },
  {
    id: 3,
    name: 'راهنمای خرید',
    href: './how-to-buy.html',
  },
  {
    id: 4,
    name: 'سایر',
    href: '#',
    subItems: [
      { id: 1, name: 'تماس با ما', href: './contact.html' },
      { id: 2, name: 'درباره ما', href: './about.html' },
      { id: 3, name: 'سوالات متداول', href: './faq.html' },
    ],
  },
];

const MenuItems = () => {
  return (
    <div className="flex items-center gap-x-2">
      {menuItems.map((menu) => (
        <MenuItemComponent key={menu.id} menu={menu} />
      ))}
    </div>
  );
};

interface DesktopNavbarProps {
  categories: Category[];
}

const DesktopNavbar = ({ categories }: DesktopNavbarProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 0) {
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <nav
      className={`sticky top-0 z-30 bg-white dark:bg-neutral-950 border-b shadow-sm max-lg:hidden transition-all duration-700 px-4 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container relative flex max-w-[1640px] items-center gap-x-2">
        <CategoryMenu categories={categories} />
        <MenuItems />
        <div
          id="header-desktop-navbar-indicator"
          className="absolute bottom-0 h-[0.15625rem] z-0 rounded-2xl end-0 transition-all duration-[350ms] w-0"
        />
      </div>
    </nav>
  );
};

export default DesktopNavbar;
