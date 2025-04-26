import { useState } from "react";
import { HiOutlineShare } from "react-icons/hi";

type Props = {
  productId: string;
  onCopyLink: () => void;
  isMobile?: boolean;
};

export default function ShareButton({ productId, onCopyLink, isMobile = false }: Props) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = () => {
    setShowShareMenu((prev) => !prev);
    console.log(`اشتراک‌گذاری محصول ${productId}`);
  };

  const handleCopy = () => {
    onCopyLink();
    setIsCopied(true);
    setShowShareMenu(false);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative">
      {isMobile ? (
        <>
          <button
            type="button"
            onClick={handleCopy}
            className="text-gray-700 hover:text-blue-500 dark:text-white transition-colors duration-200"
            aria-label="اشتراک‌گذاری"
          >
            <HiOutlineShare className="h-6 w-6" />
          </button>
          {isCopied && (
            <div
              id="notify-copied-social-share-link-mobile"
              className="absolute left-0 top-full mt-2 w-24 rounded-lg bg-zinc-900 px-3 py-2 text-center text-sm font-medium text-white shadow-xs transition-opacity duration-300 dark:bg-zinc-800"
            >
              کپی شد !
            </div>
          )}
        </>
      ) : (
        <>
          <div className="relative group">
            <button
              type="button"
              onClick={handleShare}
              className="text-gray-700 hover:text-blue-500 dark:text-white transition-colors duration-200"
              aria-label="اشتراک‌گذاری"
            >
              <HiOutlineShare className="h-6 w-6" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden w-max rounded bg-zinc-900 px-3 py-1 text-sm text-white group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              اشتراک‌گذاری
            </div>
          </div>
          {showShareMenu && (
            <div className="absolute top-10 right-0 z-10 w-48 rounded-lg border bg-white p-2 shadow-md dark:bg-zinc-800 transition-opacity duration-200">
              <button
                className="flex w-full items-center gap-2 rounded px-2 py-2 text-sky-500 hover:bg-sky-100 dark:hover:bg-zinc-700"
                onClick={handleCopy}
              >
                <HiOutlineShare className="h-5 w-5" />
                <span>کپی لینک</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
