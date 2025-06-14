import { TbSmartHome } from 'react-icons/tb';
import { HiOutlineShoppingBag, HiOutlineHeart } from 'react-icons/hi';
import { GrLocation } from 'react-icons/gr';
import { RiAccountCircle2Line } from 'react-icons/ri';

export const profileMenuItem = [
  { href: '/profile', icon: TbSmartHome, label: 'پیشخوان' },
  { href: '/profile/orders', icon: HiOutlineShoppingBag, label: 'سفارش ها' },
  { href: '/profile/favorite', icon: HiOutlineHeart, label: 'علاقه‌مندی ها' },
  { href: '/profile/address', icon: GrLocation, label: 'آدرس ها' },
  {
    href: '/profile/personal-info',
    icon: RiAccountCircle2Line,
    label: 'حساب کاربری',
  },
];
