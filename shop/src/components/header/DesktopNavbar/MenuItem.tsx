'use client';

import { type MenuItem } from '@/data/menuData';
import { useIsMounted } from '@/hooks/useIsMounted';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface MenuItemProps {
  menu: MenuItem;
  isAlwaysActive?: boolean;
}

const MenuItem = ({ menu, isAlwaysActive = false }: MenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  const isActive = isAlwaysActive || pathname === menu.href || (menu.href !== '/' && pathname.startsWith(menu.href));

  return (
    <div className="group relative" dir="rtl" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="relative flex items-center">
        <Link
          href={menu.href}
          className={`flex cursor-pointer items-center gap-x-2 p-2 text-sm hover:text-primary ${
            isActive ? 'text-primary font-bold' : 'text-neutral-600 dark:text-white'
          }`}
          style={menu.color ? ({ '--color-light': menu.color.light, '--color-dark': menu.color.dark } as React.CSSProperties) : undefined}
        >
          {menu.icon && <menu.icon className="text-lg" />}
          {menu.name}
          {menu.name === 'سایر' && <span className="text-primary">...</span>}
        </Link>

        <span
          className={`absolute bottom-0 right-0 h-0.5 bg-primary transition-all duration-500 ${isActive || isHovered ? 'w-full' : 'w-0'}`}
        />
      </div>

      {menu.subItems && (
        <div className="absolute right-0 top-full hidden w-44 overflow-hidden rounded-b-lg bg-muted shadow-base group-hover:block">
          <ul className="space-y-1 p-2">
            {menu.subItems.map((subItem) => (
              <li key={subItem.id}>
                <Link className="flex rounded-lg px-4 py-3 text-sm text-neutral-600 dark:text-white hover:text-primary" href={subItem.href}>
                  {subItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
