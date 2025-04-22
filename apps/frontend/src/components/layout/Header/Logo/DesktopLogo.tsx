import Image from "next/image";
import Link from "next/link";

const DesktopLogo = () => {
  return (
    <div>
      <Link href="/">
        <Image src="/images/logo.svg" alt="" width={176} height={40} className="w-44 text-red-700" />
      </Link>
    </div>
  );
};

export default DesktopLogo;
