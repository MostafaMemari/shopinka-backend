export type MenuLink = {
  id: string;
  label: string;
  href: string;
};
export type SocialLink = {
  id: string;
  name: string;
  href: string;
  icon: string;
};
export type TrustBadge = {
  id: string;
  name: string;
  imageSrc: string;
  href: string;
  isTest?: boolean;
};

export const defaultFooterProps = {
  supportPhone: '021-0000000',
  supportText: '۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم',
  subscribeText: 'از جدیدترین تخفیف ها با خبر شوید',
  copyrightText: 'کلیه حقوق این سایت متعلق به فروشگاه شاپینکا می‌باشد.',
  copyright: true,
};

export const menuLinks1: MenuLink[] = [
  { id: '1', label: 'شرایط مرجوعی', href: '/return-terms' },
  { id: '2', label: 'راهنمای خرید', href: '/how-to-buy' },
  { id: '3', label: 'قوانین و مقررات', href: '/rules-and-terms' },
  { id: '4', label: 'چرا شاپینکا', href: '/why-us' },
];

export const menuLinks2: MenuLink[] = [
  { id: '1', label: 'پیگیری سفارشات', href: '/profile-orders' },
  { id: '2', label: 'تماس با ما', href: '/contact' },
  { id: '3', label: 'سوالات متداول', href: '/faq' },
  { id: '4', label: 'درباره ما', href: '/about' },
];

export const socialLinks: SocialLink[] = [
  { id: '1', name: 'instagram', href: '#', icon: 'instagram' },
  { id: '2', name: 'twitter', href: '#', icon: 'twitter' },
  { id: '3', name: 'aparat', href: '#', icon: 'aparat' },
];

export const trustBadges: TrustBadge[] = [
  { id: '1', name: 'namad', imageSrc: '/images/namad.png', href: '#', isTest: true },
  { id: '2', name: 'samandehi', imageSrc: '/images/samandehi.png', href: '#', isTest: true },
];
