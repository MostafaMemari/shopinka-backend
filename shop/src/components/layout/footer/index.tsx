'use client';

import { FC } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import Copyright from './Copyright';
import SupportInfo from './SupportInfo';
import ScrollTopButton from './ScrollTopButton';
import SubscribeForm from './SubscribeForm';
import SocialLinks from './SocialLinks';
import MenuLinks from './MenuLinks';
import TrustBadges from './TrustBadges';
import { defaultFooterProps, menuLinks1, menuLinks2, socialLinks, trustBadges } from '@/data/footerData';

interface Props {
  supportPhone?: string;
  supportText?: string;
  subscribeText?: string;
  copyright?: boolean;
  copyrightText?: string;
}

const Footer: FC<Props> = ({
  supportPhone = defaultFooterProps.supportPhone,
  supportText = defaultFooterProps.supportText,
  subscribeText = defaultFooterProps.subscribeText,
  copyright = defaultFooterProps.copyright,
  copyrightText = defaultFooterProps.copyrightText,
}) => {
  return (
    <footer className="relative border-t bg-muted">
      <div className="absolute inset-x-0 -top-3 flex items-center justify-center">
        <div className="relative flex h-10 w-14 justify-center">
          <div className="absolute inset-0 -top-[2px] h-full w-full rounded-full bg-muted blur-[6px]" />
          <FaArrowUp className="relative h-5 w-5 text-gray-200" aria-hidden="true" />
        </div>
      </div>

      <div className="container">
        <div className="mt-10 flex flex-col items-center justify-between gap-y-4 md:flex-row">
          <SupportInfo supportPhone={supportPhone} supportText={supportText} />
          <ScrollTopButton />
        </div>

        <div className="relative mb-10 mt-10 flex flex-col items-center justify-between gap-x-4 gap-y-8 rounded-xl bg-background px-10 py-4 shadow-base backdrop-blur-3xl md:flex-row">
          <SubscribeForm subscribeText={subscribeText} />
          <SocialLinks />
        </div>

        <div className="grid grid-cols-12 gap-y-10">
          <div className="col-span-12 md:col-span-6">
            <MenuLinks menuLinks1={menuLinks1} menuLinks2={menuLinks2} />
          </div>
          <div className="col-span-12 flex items-center justify-center gap-x-2 md:col-span-6 md:justify-end">
            <TrustBadges trustBadges={trustBadges} />
          </div>
        </div>

        {copyright && <Copyright copyrightText={copyrightText} />}
      </div>
    </footer>
  );
};

export default Footer;
