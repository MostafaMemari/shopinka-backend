'use client';

import Link from 'next/link';
import { BiLogIn } from 'react-icons/bi';
import { usePathname } from 'next/navigation';
import { useDropdown } from '@/hooks/useDropdown';
import SkeletonLoader from '../../SkeletonLoader';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';
import ProfileMenu from './ProfileMenu';
import ProfileButton from './ProfileButton';

import { useEffect, useState } from 'react';

const ProfileDropdown = () => {
  const pathname = usePathname();
  const { isLogin, isLoading } = useAuth();
  const { isOpen, dropdownRef, toggleDropdown, closeDropdown } = useDropdown({
    closeOnOutsideClick: true,
    openOnHover: false,
  });

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // if (!isMounted) return null;

  if (!isMounted) {
    return (
      <div className="flex h-9 items-center justify-center gap-2 rounded-md border border-gray-300 px-4">
        <SkeletonLoader width="2rem" height="1.5rem" className="rounded-md" />
        <SkeletonLoader width="4rem" height="1rem" className="rounded-md" />
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {isLogin ? (
        <>
          <ProfileButton toggleDropdown={toggleDropdown} isOpen={isOpen} />
          {isOpen && <ProfileMenu closeDropdown={closeDropdown} />}
        </>
      ) : (
        <Link href={`/login/?backUrl=${pathname}`}>
          <div className="flex h-9 items-center justify-center gap-2 rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-700 dark:border-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <BiLogIn size={18} className="transform scale-x-[-1]" />
            <span>ورود | ثبت‌نام</span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ProfileDropdown;
