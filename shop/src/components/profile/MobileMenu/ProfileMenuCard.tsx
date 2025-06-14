'use client';

import MobileDrawer from '@/components/MobileDrawer';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosMenu } from 'react-icons/io';
import ProfileMenu from '../ProfileMenu';

function ProfileMenuCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="rounded-lg bg-muted p-6 shadow-base lg:hidden mb-4">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-y-4">
            <div className="relative">
              <FaUserCircle className="h-20 w-20 only:rounded-full" />
            </div>
            <div>
              <p className="line-clamp-1">تایماز اکبری</p>
              <p className="text-text/60">09000000000</p>
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
          <ProfileMenu />
        </div>
      </MobileDrawer>
    </>
  );
}

export default ProfileMenuCard;
