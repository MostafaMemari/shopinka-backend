import Image from 'next/image';
import Link from 'next/link';

export default function MobileLogo() {
  return (
    <div>
      <Link href="/">
        <Image src="/images/logo.svg" alt="" width={176} height={40} className="h-6 w-full rounded-lg xs:h-10" />
      </Link>
    </div>
  );
}
