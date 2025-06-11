import Image from 'next/image';
import Link from 'next/link';

export default function DesktopLogo() {
  return (
    <div>
      <Link href="/">
        <Image src="/images/logo-shopinka.webp" alt="" width={176} height={63} className="w-44 text-red-700" />
      </Link>
    </div>
  );
}
