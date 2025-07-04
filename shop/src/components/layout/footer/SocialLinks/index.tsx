'use client';

import { FaInstagram, FaTelegram, FaYoutube } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { socialLinks } from '@/data/footerData';
import Link from 'next/link';

const socialConfig: Record<string, { icon: IconType; hoverColor: string }> = {
  instagram: { icon: FaInstagram, hoverColor: 'hover:text-rose-600' },
  telegram: { icon: FaTelegram, hoverColor: 'hover:text-blue-500' },
};

const SocialLinks = () => {
  return (
    <div className="flex items-center justify-center gap-x-6 md:gap-x-6">
      {socialLinks?.map((link) => {
        const { icon: Icon, hoverColor } = socialConfig[link.name.toLowerCase()] || {
          icon: FaYoutube,
          hoverColor: 'hover:text-gray-500',
        };

        return (
          <div key={link.id} className={`transition-colors duration-200 ${hoverColor}`}>
            <a aria-label={`Follow us on ${link.name}`} href={link.href} target="_blank" rel="noopener noreferrer">
              <span className="sr-only">{`${link.name} link`}</span>
              <Icon className="h-6 w-6" />
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default SocialLinks;
