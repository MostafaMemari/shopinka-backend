import { HiOutlineHeart, HiOutlineShoppingBag } from 'react-icons/hi';
import { RiAccountCircle2Line } from 'react-icons/ri';
import { TbSmartHome } from 'react-icons/tb';
import { FiShoppingCart, FiPhoneCall, FiBookOpen, FiMessageCircle } from 'react-icons/fi';

export interface MenuItem {
  id: number;
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  subItems?: { id: number; name: string; href: string }[];
  color?: { light: string; dark: string };
}

export interface ProfileMenuItem {
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: React.ReactNode;
}

export const menuItems: MenuItem[] = [
  {
    id: 10,
    name: 'فروشگاه',
    href: '/shop',
    icon: FiShoppingCart,
    color: { light: '#ef4444', dark: '#f87171' },
  },
  {
    id: 2,
    name: 'بلاگ',
    href: '/blog',
    icon: FiBookOpen,
  },
  {
    id: 3,
    name: 'سوال دارید',
    href: '/faq',
    icon: FiMessageCircle,
  },
  {
    id: 4,
    name: 'تماس با ما',
    href: '/contact',
    icon: FiPhoneCall,
  },
];

export const profileMenuItems = [
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
  href: '/shop?hasDiscount=true',
  color: { light: '#ef4444', dark: '#f87171' },
};
