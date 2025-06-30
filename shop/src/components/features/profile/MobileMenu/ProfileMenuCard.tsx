'use client';

import MobileDrawer from '@/components/ui/MobileDrawer';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosMenu } from 'react-icons/io';
import ProfileMenu from '../ProfileMenu';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';

function ProfileMenuCard() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <>
      <div className="rounded-lg bg-muted p-6 shadow-base lg:hidden mb-4">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-y-4">
            <div className="relative">
              <FaUserCircle className="h-20 w-20 only:rounded-full" />
            </div>
            <div>
              <p className="line-clamp-1">{!!user?.full_name ? user.full_name : 'کاربر گرامی'}</p>
              <p className="text-text/60">{user?.mobile}</p>
            </div>
            <div>
              <button onClick={() => setIsOpen(true)} className="btn-primary px-4 py-2" type="button">
                <IoIosMenu className="h-6 w-6 text-white" />
                منوی پنل کاربری
              </button>
            </div>
          </div>
        </div>
      </div>

      <MobileDrawer title="منوی پنل کاربری" isOpen={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)}>
        <div className="pt-3">
          <ProfileMenu onClose={() => setIsOpen(false)} />
        </div>
      </MobileDrawer>
    </>
  );
}

export default ProfileMenuCard;
