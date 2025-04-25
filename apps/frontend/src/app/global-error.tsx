"use client";

import Image from "next/image";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { SiAparat } from "react-icons/si";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="container flex flex-col items-center justify-center gap-y-8">
        <Image
          src="/images/others/maintenance.png"
          alt="maintenance"
          className="w-80"
          width={100}
          height={100}
        />
        <div className="text-3xl">بزودی برمیگردیم ...</div>
        <div className="text-center leading-loose text-text/90">
          {error.message ||
            "برای اطلاع از بروزرسانی ها مارا در شبکه های اجتماعی دنبال کنید"}
        </div>
        <button onClick={() => reset()} className="btn-primary px-6 py-2">
          تلاش مجدد
        </button>
        <div className="flex items-center justify-center gap-x-10">
          <div className="transition-colors duration-200 hover:text-rose-600 dark:hover:text-rose-500">
            <a aria-label="Follow us on instagram" href="#" target="_blank">
              <div className="sr-only">instagram link</div>
              <FaInstagram className="h-8 w-8" />
            </a>
          </div>
          <div className="transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-500">
            <a aria-label="Follow us on twitter" href="#" target="_blank">
              <div className="sr-only">x - twitter link</div>
              <FaTwitter className="h-8 w-8" />
            </a>
          </div>
          <div className="transition-colors duration-200 hover:text-red-600 dark:hover:text-red-500">
            <a aria-label="Follow us on aparat" href="#" target="_blank">
              <div className="sr-only">aparat link</div>
              <SiAparat className="h-8 w-8" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
