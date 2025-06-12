'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { categories } from '@/mock/categories';
import { PiPhoneCall } from 'react-icons/pi';
import { LuList, LuShoppingCart, LuUser, LuCheck } from 'react-icons/lu';
import { RiHome3Line } from 'react-icons/ri';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';
import MobileMenu from '@/components/header/MobileMenu';
import MobileLogo from '@/components/ui/Logo/MobileLogo';

const ProductLayout = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLogin } = useAuth();

  if (pathname.startsWith('/product')) {
    return null;
  }

  const navItems = [
    {
      href: `${isLogin ? '/profile' : '/login'}`,
      icon: (
        <div className="relative">
          <LuUser size={22} />
          {isLogin && <LuCheck size={14} className="absolute -bottom-1 -right-1 text-primary bg-white rounded-full p-0.5" />}
        </div>
      ),
      label: 'حساب کاربری',
    },
    { href: '/cart', icon: <LuShoppingCart size={22} />, label: 'سبد خرید' },
    { href: '/categories', icon: <LuList size={22} />, label: 'دسته‌بندی' },
    { href: '/', icon: <RiHome3Line size={22} />, label: 'خانه' },
  ];

  return (
    <div className="lg:hidden">
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-md z-30 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div className="fixed top-3 right-3 left-3 rounded-2xl z-50 bg-white shadow-md">
        <div className="flex items-center justify-between py-2 px-4">
          <MobileMenu categories={categories} onToggleMenu={setIsMenuOpen} />
          <MobileLogo />
          <PiPhoneCall className="h-6 w-6" />
        </div>
      </div>

      <nav className="fixed bottom-3 right-3 left-3 rounded-2xl z-50 bg-white shadow-md">
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
    </div>
  );
};

export default ProductLayout;
