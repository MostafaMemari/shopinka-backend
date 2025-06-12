import { HiOutlineBell, HiOutlineClock, HiOutlineHeart } from 'react-icons/hi';

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
    name: 'چرا روتی کالا',
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
  {
    href: '/profile-orders',
    icon: HiOutlineClock,
    label: 'سفارش‌ها',
  },
  {
    href: '/profile-favorite',
    icon: HiOutlineHeart,
    label: 'علاقه‌مندی‌ها',
  },
  {
    href: '/profile-notification',
    icon: HiOutlineBell,
    label: 'پیام‌ها',
    badge: (
      <span className="relative flex h-5 w-5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-btn text-sm text-white">2</span>
      </span>
    ),
  },
];

// منوی فروش ویژه به صورت جداگانه برای استفاده در DesktopNavbar
export const specialSaleMenuItem: MenuItem = {
  id: 1,
  name: 'فروش ویژه',
  href: './special-sale.html',
  color: { light: '#ef4444', dark: '#f87171' },
};
