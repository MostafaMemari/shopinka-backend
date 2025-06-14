import CardBox from '@/components/ui/CardBox';
import { FaUserEdit, FaLock, FaHeart, FaBell } from 'react-icons/fa';
interface UserAccountSectionProps {
  favoriteCount: number;
  notificationCount: number;
}

const items = (favoriteCount: number, notificationCount: number) => [
  {
    href: '/profile-edit',
    icon: <FaUserEdit />,
    color: 'from-sky-400 via-sky-500 to-sky-600',
    title: 'تکمیل مشخصات',
    value: undefined,
  },
  {
    href: '/profile-edit',
    icon: <FaLock />,
    color: 'from-rose-400 via-rose-500 to-red-500',
    title: 'ثبت کلمه عبور',
    value: undefined,
  },
  {
    href: '/profile-favorite',
    icon: <FaHeart />,
    color: 'from-pink-400 via-rose-500 to-rose-600',
    title: 'علاقه‌مندی',
    value: favoriteCount,
  },
  {
    href: '/profile-notification',
    icon: <FaBell />,
    color: 'from-green-400 via-emerald-500 to-emerald-600',
    title: 'اعلان جدید',
    value: notificationCount,
  },
];

const UserAccountSection: React.FC<UserAccountSectionProps> = ({ favoriteCount, notificationCount }) => (
  <section className="mb-10">
    <h2 className="mb-8 flex items-center gap-x-4 text-xl font-semibold text-gray-700 dark:text-white">
      <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
      حساب کاربری
    </h2>
    <div className="grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-4">
      {items(favoriteCount, notificationCount).map((item, idx) => (
        <CardBox key={item.href + idx} icon={item.icon} color={item.color} title={item.title} value={item.value} href={item.href} />
      ))}
    </div>
  </section>
);

export default UserAccountSection;
