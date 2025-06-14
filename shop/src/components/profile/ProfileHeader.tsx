'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';

interface ProfileHeaderProps {
  fullName: string;
  phoneNumber: string;
  profileImage: string;
}

function ProfileHeader({ fullName, phoneNumber, profileImage }: ProfileHeaderProps) {
  return (
    <div className="mb-2 flex items-center justify-between border-b border-gray-200 pb-6 dark:border-white/10">
      <div className="flex items-center gap-x-4">
        <div>
          <Image src={profileImage || '/images/user.png'} className="h-12 w-12 rounded-full" alt="Profile" width={100} height={100} />
        </div>
        <div className="flex flex-col">
          <div className="line-clamp-1">{fullName}</div>
          <div className="line-clamp-1 text-text/90">{phoneNumber}</div>
        </div>
      </div>
      <Link href="/profile-edit">
        <FaRegEdit className="h-6 w-6 text-primary" />
      </Link>
    </div>
  );
}

export default ProfileHeader;
