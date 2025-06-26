'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useState, useMemo } from 'react';
import { Transition } from '@headlessui/react';
import { PiPhoneCall } from 'react-icons/pi';
import { LuList, LuUser, LuCheck } from 'react-icons/lu';
import { RiHome3Line } from 'react-icons/ri';
import MobileMenu from '../mobileLayout/MobileMenu';
import CartIconTotalQuantity from '../cart/CartIconTotalQuantity';
import MobileLogo from './Logo/MobileLogo';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';
import { HiOutlineXMark } from 'react-icons/hi2';
import { HiOutlineMenu } from 'react-icons/hi';

interface MobileLayoutProps {
  showHeader?: boolean;
  showNav?: boolean;
}

const MobileLayout = ({ showHeader = true, showNav = true }: MobileLayoutProps) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLogin } = useAuth();

  const navItems = useMemo(
    () => [
      {
        href: isLogin ? '/profile' : '/login',
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
    ],
    [isLogin],
  );

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  if (pathname.startsWith('/product') && !pathname.startsWith('/product-category')) return null;

  return (
    <div className="lg:hidden">
      <Transition
        show={isMenuOpen}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as={Fragment}
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" aria-hidden="true" />
      </Transition>

      {showHeader && (
        <header className="fixed top-3 right-3 left-3 z-50 bg-white shadow-md rounded-2xl">
          <div className="flex items-center justify-between py-2 px-4 h-[60px]">
            <button onClick={toggleMenu} className="cursor-pointer">
              {isMenuOpen ? <HiOutlineXMark className="h-6 w-6" /> : <HiOutlineMenu className="h-6 w-6" />}
            </button>
            <MobileLogo />
            <PiPhoneCall className="h-6 w-6" />
          </div>
        </header>
      )}

      <MobileMenu isMenuOpen={isMenuOpen} onToggleMenu={setIsMenuOpen} />

      {showNav && (
        <nav className="fixed bottom-3 right-3 left-3 z-50 bg-white shadow-md rounded-2xl">
          <ul className="flex justify-between items-center text-xs flex-row-reverse h-[60px]">
            {navItems.map(({ href, icon, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href} className="flex-1">
                  <Link
                    href={href}
                    className={`flex flex-col items-center justify-center py-2 transition-all ${
                      isActive ? 'text-primary font-bold' : 'text-gray-500'
                    }`}
                  >
                    {icon}
                    <span className="mt-1">{label}</span>
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
