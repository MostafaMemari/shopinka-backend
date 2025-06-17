import { GrLocation } from 'react-icons/gr';
import { HiOutlineBell, HiOutlineClock, HiOutlineHeart, HiOutlineShoppingBag } from 'react-icons/hi';
import { RiAccountCircle2Line } from 'react-icons/ri';
import { TbSmartHome } from 'react-icons/tb';

export interface MenuItem {
  id: number;
  name: string;
  href: string;
  subItems?: { id: number; name: string; href: string }[];
  color?: { light: string; dark: string };
}

export interface ProfileMenuItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: React.ReactNode;
}

export const navbarMenuItems: MenuItem[] = [
  {
    id: 10,
    name: 'فروشگاه',
    href: '/shop',
    color: { light: '#ef4444', dark: '#f87171' },
  },
  {
    id: 2,
    name: 'چرا شاپینکا',
    href: './why-us.html',
  },
  {
    id: 3,
    name: 'راهنمای خرید',
    href: './how-to-buy.html',
  },
  {
    id: 4,
    name: 'سایر',
    href: '#',
    subItems: [
      { id: 1, name: 'تماس با ما', href: './contact.html' },
      { id: 2, name: 'درباره ما', href: './about.html' },
      { id: 3, name: 'سوالات متداول', href: './faq.html' },
    ],
  },
];

export const profileMenuItems: ProfileMenuItem[] = [
  { href: '/profile', icon: TbSmartHome, label: 'پیشخوان' },
  { href: '/profile/orders', icon: HiOutlineShoppingBag, label: 'سفارش ها' },
  { href: '/profile/favorite', icon: HiOutlineHeart, label: 'علاقه‌مندی ها' },
  {
    href: '/profile/personal-info',
    icon: RiAccountCircle2Line,
    label: 'حساب کاربری',
  },
];

export const specialSaleMenuItem: MenuItem = {
  id: 1,
  name: 'فروش ویژه',
  href: './special-sale.html',
  color: { light: '#ef4444', dark: '#f87171' },
};
