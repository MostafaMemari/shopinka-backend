import { FaUserEdit, FaLock, FaHeart, FaBell } from "react-icons/fa";
import Link from "next/link";

interface UserAccountSectionProps {
  favoriteCount: number;
  notificationCount: number;
}

const UserAccountSection: React.FC<UserAccountSectionProps> = ({ favoriteCount, notificationCount }) => (
  <div className="mb-8">
    <h2 className="mb-8 flex items-center gap-x-4 text-lg text-text/90">
      <span className="h-2 w-2 rounded-full bg-primary" />
      حساب کاربری
    </h2>
    <div className="grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-4">
      <Link href="/profile-edit" className="flex flex-col items-center gap-4 rounded-base bg-sky-500 p-2 dark:bg-sky-600 md:flex-row">
        <div className="relative rounded-base bg-sky-600/50 p-2 dark:bg-sky-500/50">
          <FaUserEdit className="h-8 w-8 text-white" />
        </div>
        <div className="text-sm font-medium text-white md:text-base">تکمیل مشخصات</div>
      </Link>
      <Link href="/profile-edit" className="flex flex-col items-center gap-4 rounded-base bg-warning p-2 dark:bg-red-600 md:flex-row">
        <div className="relative rounded-base bg-red-600/50 p-2">
          <FaLock className="h-8 w-8 text-white" />
        </div>
        <div className="text-sm font-medium text-white md:text-base">ثبت کلمه عبور</div>
      </Link>
      <Link href="/profile-favorite" className="flex flex-col items-center gap-4 rounded-base bg-rose-500 p-2 dark:bg-rose-600 md:flex-row">
        <div className="relative rounded-base bg-rose-600/50 p-2 dark:bg-rose-500/50">
          <FaHeart className="h-8 w-8 text-white" />
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-sm font-medium text-white dark:bg-rose-500 md:hidden">
            {favoriteCount}
          </span>
        </div>
        <div className="flex items-center gap-x-2 text-sm font-medium text-white md:text-base">
          <span className="hidden md:block">{favoriteCount}</span> علاقه مندی
        </div>
      </Link>
      <Link
        href="/profile-notification"
        className="flex flex-col items-center gap-4 rounded-base bg-primary p-2 dark:bg-emerald-600 md:flex-row"
      >
        <div className="relative rounded-base bg-emerald-600/50 p-2 dark:bg-primary/50">
          <FaBell className="h-8 w-8 text-white" />
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-sm font-medium text-white dark:bg-primary md:hidden">
            {notificationCount}
          </span>
        </div>
        <div className="flex items-center gap-x-2 text-sm font-medium text-white md:text-base">
          <span className="hidden md:block">{notificationCount}</span> اعلان جدید
        </div>
      </Link>
    </div>
  </div>
);

export default UserAccountSection;
