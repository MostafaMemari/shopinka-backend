import { SocialLink } from '@/lib/types/footer';
import { FC } from 'react';

interface Props {
  socialLinks: SocialLink[];
}

const SocialLinks: FC<Props> = ({ socialLinks }) => {
  return (
    <div className="flex items-center justify-center gap-x-6 md:gap-x-6">
      {socialLinks.map((link) => (
        <div
          key={link.id}
          className={`transition-colors duration-200 ${
            link.name === 'instagram' ? 'hover:text-rose-600' : link.name === 'twitter' ? 'hover:text-blue-500' : 'hover:text-red-600'
          }`}
        >
          <a aria-label={`Follow us on ${link.name}`} href={link.href} target="_blank" rel="noopener noreferrer">
            <div className="sr-only">{`${link.name} link`}</div>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  link.name === 'instagram'
                    ? 'M7 7h10v10H7V7zm5 6a1 1 0 100-2 1 1 0 000 2zm3-5h2v2h-2V8z'
                    : link.name === 'twitter'
                      ? 'M22 4s-.7.3-1.5.5c.8-.5 1.4-1.3 1.6-2.3-.7.4-1.5.7-2.3.8-1.3-1.4-3.5-1.5-4.8-.3-1 1-1.3 2.5-.8 3.8C10.5 6 5.7 3.5 2.5 1.3 1.3 3.3 1.8 5.8 3.5 7.3c-.7 0-1.3-.2-1.8-.5 0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.8 0 .5 1.6 2 2.8 3.8 2.8-1.4 1.1-3.2 1.8-5.1 1.8-.3 0-.7 0-1-.1 1.9 1.2 4.1 1.9 6.5 1.9 7.8 0 12.1-6.5 12.1-12.1V4z'
                      : 'M3 3h18v18H3V3zm6 12h6v-2h-6v2zm0-4h6V9h-6v2zm0-4h6V5h-6v2z'
                }
              />
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
};

export default SocialLinks;
