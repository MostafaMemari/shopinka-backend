'use client';

import { FC, MouseEventHandler, ReactNode } from 'react';

interface IconButtonWithBadgeProps {
  icon: ReactNode;
  badgeCount?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  className?: string;
  badgeClassName?: string;
}

const IconButtonWithBadge: FC<IconButtonWithBadgeProps> = ({
  icon,
  badgeCount = 0,
  onClick,
  ariaLabel = 'دکمه',
  className = '',
  badgeClassName = '',
}) => {
  return (
    <button
      type="button"
      className={`relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon}
      {badgeCount > 0 && (
        <span
          className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-md bg-primary-btn text-sm font-bold text-white border border-white dark:border-gray-800 ${badgeClassName}`}
        >
          {badgeCount}
        </span>
      )}
    </button>
  );
};

export default IconButtonWithBadge;
