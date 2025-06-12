'use client';

import { HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineUser } from 'react-icons/hi';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';

interface ProfileButtonProps {
  toggleDropdown: () => void;
  isOpen: boolean;
}

const ProfileButton = ({ toggleDropdown, isOpen }: ProfileButtonProps) => {
  const { user } = useAuth();

  return (
    <button
      type="button"
      className="flex h-9 my-1 items-center justify-center gap-2 rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-700 dark:border-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
      onClick={toggleDropdown}
      aria-label="باز کردن منوی پروفایل"
      aria-expanded={isOpen}
    >
      <HiOutlineUser className="h-5 w-5" />
      <span>{user?.full_name || 'کاربر گرامی'}</span>
      {isOpen ? <HiOutlineChevronUp className="h-5 w-5" /> : <HiOutlineChevronDown className="h-5 w-5" />}
    </button>
  );
};

export default ProfileButton;
