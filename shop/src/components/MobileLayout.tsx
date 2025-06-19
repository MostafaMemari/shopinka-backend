'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useState } from 'react';
import MobileMenu from './mobileLayout/MobileMenu';
import { PiPhoneCall } from 'react-icons/pi';
import { LuList, LuUser, LuCheck } from 'react-icons/lu';
import { RiHome3Line } from 'react-icons/ri';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';
import MobileLogo from './ui/Logo/MobileLogo';
import { Transition, TransitionChild } from '@headlessui/react';
import CartIconTotalQuantity from './cart/CartIconTotalQuantity';

interface MobileLayoutProps {
  showHeader?: boolean;
  showNav?: boolean;
}

const MobileLayout = ({ showHeader = true, showNav = true }: MobileLayoutProps) => {
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
          {isLogin && <LuCheck size={14} className="absolute -bottom-1 -right-1 text-blue-600 bg-white rounded-full p-0.5" />}
        </div>
      ),
      label: 'حساب کاربری',
    },
    {
      href: '/checkout/cart',
      icon: <CartIconTotalQuantity isLogin={isLogin} />,
      label: 'سبد خرید',
    },
    { href: '/shop', icon: <LuList size={22} />, label: 'دسته‌بندی' },
    { href: '/', icon: <RiHome3Line size={22} />, label: 'خانه' },
  ];

  return (
    <div className="lg:hidden">
      {isMenuOpen && (
        <Transition show={isMenuOpen} as={Fragment}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-50" aria-hidden="true" />
          </TransitionChild>
        </Transition>
      )}

      {showHeader && (
        <div className="fixed top-3 right-3 left-3 rounded-2xl z-50 bg-white shadow-md">
          <div className="flex items-center justify-between py-2 px-4 h-[60px]">
            <MobileMenu onToggleMenu={setIsMenuOpen} />

            <MobileLogo />
            <PiPhoneCall className="h-6 w-6" />
          </div>
        </div>
      )}

      {showNav && (
        <nav className="fixed bottom-3 right-3 left-3 rounded-2xl z-50 bg-white shadow-md">
          <ul className="flex justify-between items-center text-xs flex-row-reverse h-[60px]">
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
      )}
    </div>
  );
};

export default MobileLayout;
