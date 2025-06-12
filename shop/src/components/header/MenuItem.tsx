// components/MenuItem.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

interface MenuItemProps {
  menu: {
    id: number;
    name: string;
    href: string;
    subItems?: { id: number; name: string; href: string }[];
    color?: { light: string; dark: string };
  };
}

const MenuItem = ({ menu }: MenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="group relative" dir="rtl" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="relative flex items-center">
        <Link
          href={menu.href}
          className="flex cursor-pointer items-center gap-x-2 p-2 text-sm text-neutral-600 dark:text-white hover:text-primary"
          style={menu.color ? ({ '--color-light': menu.color.light, '--color-dark': menu.color.dark } as React.CSSProperties) : undefined}
        >
          {menu.name}
          {menu.name === 'سایر' && <span className="text-primary">...</span>}
        </Link>
        <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`} />
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
