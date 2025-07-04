import { FC } from 'react';
import Image from 'next/image';
import { TrustBadge } from '@/data/footerData';
import Link from 'next/link';

interface Props {
  trustBadges: TrustBadge[];
}

const TrustBadges: FC<Props> = ({ trustBadges }) => {
  return (
    <>
      {trustBadges?.map((badge) => (
        <Link key={badge.id} href={badge.href} className="relative" target="_blank" rel="noopener noreferrer">
          <Image
            alt={badge.name}
            className="h-[130px] w-[130px]"
            src={badge.imageSrc}
            width={130}
            height={130}
            loading="lazy"
            unoptimized
          />
          {badge.isTest && (
            <span className="absolute inset-x-0 top-0 mx-auto w-fit rounded-lg bg-warning px-4 py-2 text-white dark:bg-red-600">تستی</span>
          )}
        </Link>
      ))}
    </>
  );
};

export default TrustBadges;
