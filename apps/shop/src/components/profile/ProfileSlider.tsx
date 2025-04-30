"use client";

import { usePathname } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { menuItems } from "@/data/data";
import { BiExit } from "react-icons/bi";

interface ProfileSidebarProps {
  fullName: string;
  phoneNumber: string;
  profileImage: string;
  notificationCount: number;
}

export default function ProfileSidebar({ fullName, phoneNumber, profileImage, notificationCount }: ProfileSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="sticky top-32 hidden w-full overflow-hidden rounded-lg bg-muted shadow-base lg:block">
      <div dir="ltr" className="max-h-[calc(90vh_-_100px)] overflow-y-auto p-4 xl:p-6">
        <div dir="rtl">
          <div className="mb-2 flex items-center justify-between border-b border-gray-200 pb-6 dark:border-white/10">
            <div className="flex items-center gap-x-4">
              <div>
                <Image src={profileImage || "/images/user.png"} className="h-12 w-12 rounded-full" alt="Profile" width={100} height={100} />
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

          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`profile-menu flex items-center justify-between rounded-lg px-2 py-4 xl:px-4 ${
                    pathname === item.href ? "profile-menu-active" : ""
                  }`}
                >
                  <div className="flex items-center gap-x-4">
                    <item.icon className="h-6 w-6" />
                    <div>{item.label}</div>
                  </div>
                  {item.hasBadge && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white dark:bg-emerald-600">
                      {notificationCount}
                    </div>
                  )}
                </Link>
              </li>
            ))}
            <li>
              <Link
                className="flex items-center justify-between rounded-lg p-4 text-red-500 hover:bg-warning/10 dark:text-red-400 dark:hover:bg-red-400/10"
                href="#"
              >
                <div className="flex items-center gap-x-2">
                  <BiExit className="h-6 w-6" />
                  <span>خروج</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
