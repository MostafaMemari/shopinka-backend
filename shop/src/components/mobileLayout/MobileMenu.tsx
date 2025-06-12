'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';
import { FiInfo, FiMail, FiHelpCircle } from 'react-icons/fi';
import { HiOutlineMenu } from 'react-icons/hi';

interface MobileMenuProps {
  onToggleMenu?: (isOpen: boolean) => void;
}

const MobileMenu = ({ onToggleMenu }: MobileMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    onToggleMenu?.(newState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        onToggleMenu?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [onToggleMenu]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <div ref={menuRef} className="mt-2">
        <button onClick={toggleMenu} className="cursor-pointer">
          {isMenuOpen ? <HiOutlineXMark className="h-6 w-6" /> : <HiOutlineMenu className="h-6 w-6" />}
        </button>
      </div>

      <div
        ref={menuRef}
        className={`fixed w-[265px] top-[5rem] bottom-[5rem] right-3 rounded-2xl z-40 bg-white shadow-md transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-[110%]'
        }`}
      >
        <div className="flex flex-col h-full p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">منو</span>
          </div>

          <ul className="space-y-2 mb-4">
            <li>
              <Link href="/about" onClick={toggleMenu} className="flex items-center gap-x-2 py-2 px-4 hover:bg-gray-100 rounded">
                <FiInfo className="h-5 w-5" />
                <span>درباره ما</span>
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={toggleMenu} className="flex items-center gap-x-2 py-2 px-4 hover:bg-gray-100 rounded">
                <FiMail className="h-5 w-5" />
                <span>تماس با ما</span>
              </Link>
            </li>
            <li>
              <Link href="/faq" onClick={toggleMenu} className="flex items-center gap-x-2 py-2 px-4 hover:bg-gray-100 rounded">
                <FiHelpCircle className="h-5 w-5" />
                <span>سوالات متداول</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
