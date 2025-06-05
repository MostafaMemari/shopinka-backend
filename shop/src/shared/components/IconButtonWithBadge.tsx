'use client';

import { FC, ReactNode } from 'react';
import SkeletonLoader from './SkeletonLoader';

interface IconButtonWithBadgeProps {
  icon: ReactNode;
  badgeCount?: number;
  onClick?: () => void;
  ariaLabel: string;
  isLoading?: boolean;
  badgeClassName?: string;
}

const IconButtonWithBadge: FC<IconButtonWithBadgeProps> = ({
  icon,
  badgeCount = 0,
  onClick,
  ariaLabel,
  isLoading = false,
  badgeClassName,
}) => {
  return (
    <button
      className="relative rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {isLoading ? (
        <SkeletonLoader width="2rem" height="2rem" shape="circle" />
      ) : (
        <>
          {icon}
          {badgeCount > 0 && (
            <span
              className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-md bg-primary-btn text-sm font-bold text-white border border-white dark:border-gray-800 ${badgeClassName}`}
            >
              {badgeCount}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default IconButtonWithBadge;
