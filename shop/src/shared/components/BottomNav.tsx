'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuList, LuShoppingCart, LuUser } from 'react-icons/lu'; // Lucide icons (مینیمال و شبیه دیجی‌کالا)
import { RiHome3Line } from 'react-icons/ri';

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/account', icon: <LuUser size={22} />, label: 'حساب کاربری' },
    { href: '/cart', icon: <LuShoppingCart size={22} />, label: 'سبد خرید' },
    { href: '/categories', icon: <LuList size={22} />, label: 'دسته‌بندی' },
    { href: '/', icon: <RiHome3Line size={22} />, label: 'خانه' },
  ];

  return (
    <nav className="fixed bottom-0 right-0 left-0 z-50 bg-white border-t shadow-md sm:hidden">
      <ul className="flex justify-between items-center text-xs rtl flex-row-reverse">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 transition-all ${
                  isActive ? 'text-primary font-bold' : 'text-gray-500'
                }`}
              >
                {item.icon}
                <span className="mt-1">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;
