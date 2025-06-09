'use client';

import { FC } from 'react';
import Copyright from './Copyright';
import { MenuLink, SocialLink, TrustBadge } from '@/lib/types/footer';
import SupportInfo from './SupportInfo';
import ScrollTopButton from './ScrollTopButton';
import SubscribeForm from './SubscribeForm';
import SocialLinks from './SocialLinks';
import MenuLinks from './MenuLinks';
import TrustBadges from './TrustBadges';

interface Props {
  supportPhone?: string;
  supportText?: string;
  subscribeText?: string;
  menuLinks1?: MenuLink[];
  menuLinks2?: MenuLink[];
  socialLinks?: SocialLink[];
  trustBadges?: TrustBadge[];
  copyright?: boolean;
  copyrightText?: string;
}

const Footer: FC<Props> = ({
  supportPhone = '021-0000000',
  supportText = '۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم',
  subscribeText = 'از جدیدترین تخفیف ها با خبر شوید',
  menuLinks1 = [
    { id: '1', label: 'شرایط مرجوعی', href: '/return-terms' },
    { id: '2', label: 'راهنمای خرید', href: '/how-to-buy' },
    { id: '3', label: 'قوانین و مقررات', href: '/rules-and-terms' },
    { id: '4', label: 'چرا روتی کالا', href: '/why-us' },
  ],
  menuLinks2 = [
    { id: '1', label: 'پیگیری سفارشات', href: '/profile-orders' },
    { id: '2', label: 'تماس با ما', href: '/contact' },
    { id: '3', label: 'سوالات متداول', href: '/faq' },
    { id: '4', label: 'درباره ما', href: '/about' },
  ],
  socialLinks = [
    { id: '1', name: 'instagram', href: '#', icon: 'instagram' },
    { id: '2', name: 'twitter', href: '#', icon: 'twitter' },
    { id: '3', name: 'aparat', href: '#', icon: 'aparat' },
  ],
  trustBadges = [
    { id: '1', name: 'namad', imageSrc: '/images/namad.png', href: '#', isTest: true },
    { id: '2', name: 'samandehi', imageSrc: '/images/samandehi.png', href: '#', isTest: true },
  ],
  copyright = true,
  copyrightText = 'کلیه حقوق این سایت متعلق به فروشگاه روتی کالا می‌باشد.',
}) => {
  return (
    <footer className="relative border-t bg-muted">
      <div className="absolute inset-x-0 -top-3 flex items-center justify-center">
        <div className="relative flex h-10 w-14 justify-center">
          <div className="absolute inset-0 -top-[2px] h-full w-full rounded-full bg-muted blur-[6px]" />
          <svg className="relative h-5 w-5 text-gray-200" xmlns="http://www.w3.org/2000/svg" width="135" height="90" viewBox="0 0 14 14">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="7" cy="7" r="6.5" />
              <path d="M.5 7h13m-4 0A11.22 11.22 0 0 1 7 13.5A11.22 11.22 0 0 1 4.5 7A11.22 11.22 0 0 1 7 .5A11.22 11.22 0 0 1 9.5 7Z" />
            </g>
          </svg>
        </div>
      </div>

      <div className="container">
        <div className="mt-10 flex flex-col items-center justify-between gap-y-4 md:flex-row">
          <SupportInfo supportPhone={supportPhone} supportText={supportText} />
          <ScrollTopButton />
        </div>

        <div className="relative mb-10 mt-10 flex flex-col items-center justify-between gap-x-4 gap-y-8 rounded-xl bg-background px-10 py-4 shadow-base backdrop-blur-3xl md:flex-row">
          <SubscribeForm subscribeText={subscribeText} />
          <SocialLinks socialLinks={socialLinks} />
        </div>

        <div className="grid grid-cols-12 gap-y-10">
          <div className="col-span-12 md:col-span-6">
            <MenuLinks menuLinks1={menuLinks1} menuLinks2={menuLinks2} />
          </div>
          <div className="col-span-12 flex items-center justify-center gap-x-2 md:col-span-6 md:justify-end">
            <TrustBadges trustBadges={trustBadges} />
          </div>
        </div>

        <Copyright copyrightText={copyrightText} />
      </div>
    </footer>
  );
};

export default Footer;
