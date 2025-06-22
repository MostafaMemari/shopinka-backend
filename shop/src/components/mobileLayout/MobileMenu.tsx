'use client';

import Link from 'next/link';
import { useEffect, useRef, type FC } from 'react';
import { menuItems } from '@/data/menuData';
import { Transition } from '@headlessui/react';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
  isMenuOpen: boolean;
  onToggleMenu: (isOpen: boolean) => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isMenuOpen, onToggleMenu }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onToggleMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, onToggleMenu]);

  return (
    <>
      <Transition
        show={isMenuOpen}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />
      </Transition>

      <Transition
        show={isMenuOpen}
        enter="transition-transform duration-300"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-200"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div ref={menuRef} className="fixed top-[5rem] bottom-[5rem] right-3 z-50 w-[265px] overflow-y-auto rounded-2xl bg-white shadow-md">
          <div className="flex h-full flex-col p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-bold">منو</span>
            </div>

            <ul className="mb-4 space-y-2">
              {menuItems.map(({ id, name, href, icon: Icon }) => (
                <li key={id}>
                  <Link
                    href={href}
                    onClick={() => onToggleMenu(false)}
                    className={`flex items-center gap-x-2 rounded px-4 py-2 hover:bg-gray-100 ${
                      pathname === href ? 'bg-gray-100 font-bold text-primary' : ''
                    }`}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                    <span>{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default MobileMenu;
