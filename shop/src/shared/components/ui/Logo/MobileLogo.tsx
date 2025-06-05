import Image from 'next/image';
import Link from 'next/link';

export default function MobileLogo() {
  return (
    <div>
      <Link href="/">
        <Image src="/images/logo-shopinka.webp" alt="" width={176} height={40} className="w-full h-10 rounded-lg " />
      </Link>
    </div>
  );
}
