'use client';

import { useAuth } from '@/hooks/auth/useAuth';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import SkeletonLoader from '../ui/SkeletonLoader';
import { useIsMounted } from '@/hooks/useIsMounted';

function ProfileHeader() {
  const { user, isLoading } = useAuth();
  const isMounted = useIsMounted();

  // if (!isMounted) return null;

  if (!isMounted || isLoading) {
    return (
      <div className="mb-2 flex items-center justify-between border-b border-gray-200 pb-6">
        <div className="flex items-center gap-x-2">
          <SkeletonLoader width="3rem" height="3rem" shape="circle" />

          <div className="flex flex-col gap-1">
            <SkeletonLoader width="6rem" height="0.8rem" className="rounded-xl" />
            <SkeletonLoader width="6rem" height="0.8rem" className="rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="mb-2 flex items-center justify-between border-b border-gray-200 pb-6">
        <div className="flex items-center gap-x-2">
          <FaUserCircle className="h-10 w-10 only:rounded-full" />

          <div className="flex flex-col text-md">
            <div className="line-clamp-1">{!!user?.full_name ? user.full_name : 'کاربر گرامی'}</div>
            <div className="line-clamp-1 text-text/70">{user?.mobile}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
