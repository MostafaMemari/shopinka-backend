'use client';

import { useState, useEffect, useCallback } from 'react';
import { Category } from '@/types/categoryType';
import CategoryMenu from './CategoryMenu';
import MenuItem from './MenuItem';
import { menuItems } from '@/data/menuData';

interface DesktopNavbarProps {
  categories: Category[];
}

const DesktopNavbar = ({ categories }: DesktopNavbarProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setIsVisible(currentScrollY <= 0 || currentScrollY < lastScrollY);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <nav
      className={`sticky top-0 z-30 bg-white dark:bg-neutral-950 border-b shadow-sm max-lg:hidden transition-transform duration-700 px-4 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto max-w-[1640px] flex items-center gap-x-2">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-x-2">
            <CategoryMenu categories={categories || []} />
            <div className="flex items-center gap-x-2">
              {menuItems.map((menu) => (
                <MenuItem key={menu.id} menu={menu} />
              ))}
            </div>
          </div>
          <MenuItem menu={{ id: 1, name: 'فروش ویژه', href: '/shop?hasDiscount=true' }} isAlwaysActive />
        </div>
        <div
          id="header-desktop-navbar-indicator"
          className="absolute bottom-0 h-0.5 z-0 rounded-2xl end-0 transition-all duration-350 w-0"
        />
      </div>
    </nav>
  );
};

export default DesktopNavbar;
