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
  { id: '1', label: 'نحوه ثبت سفارش', href: '/info/how-to-order' },
  { id: '2', label: 'رویه ارسال سفارش', href: '/info/shipping-policy' },
  { id: '3', label: 'شیوه های پرداخت', href: '/info/payment-methods' },
  { id: '4', label: 'رویه های بازگردانی کالا', href: '/info/return-policy' },
];

export const menuLinks2: MenuLink[] = [
  { id: '1', label: 'حریم خصوصی', href: '/info/privacy-policy' },
  { id: '2', label: 'شرایط استفاده از خدمات سایت', href: '/info/terms-of-service' },
  { id: '3', label: 'فرصت های شغلی', href: '/info/careers' },
  { id: '4', label: 'پاسخ به پرسش های متداول', href: '/faq' },
];

export const socialLinks: SocialLink[] = [
  { id: '1', name: 'instagram', href: 'https://instagram.com/shopinka.ir', icon: 'instagram' },
  { id: '2', name: 'telegram', href: 'https://t.me/shopinka', icon: 'telegram' },
];

export const trustBadges: TrustBadge[] = [
  {
    id: '1',
    name: 'namad',
    imageSrc: '/images/namad.png',
    href: "<a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=622800&Code=cLIJRY4HL3Y3AYOJXBHINBZIOaGquUDf'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=622800&Code=cLIJRY4HL3Y3AYOJXBHINBZIOaGquUDf' alt='' style='cursor:pointer' code='cLIJRY4HL3Y3AYOJXBHINBZIOaGquUDf'></a>",
    isTest: false,
  },
  { id: '2', name: 'samandehi', imageSrc: '/images/samandehi.png', href: '#', isTest: true },
];
