'use client';

import React, { useState } from 'react';
import { HiOutlineShare } from 'react-icons/hi';

function ShareProductAction() {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const handleShare = () => {
    setShowShareMenu((prev) => !prev);
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setShowShareMenu(false);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        className="text-gray-700 hover:text-blue-500 dark:text-white transition-colors duration-200"
        aria-label="اشتراک‌گذاری"
      >
        <HiOutlineShare className="h-6 w-6" />
      </button>
      <Tooltip text="اشتراک‌گذاری" />
      {showShareMenu && (
        <div className="absolute top-10 right-0 z-10 w-48 rounded-lg border bg-white p-2 shadow-md dark:bg-zinc-800 transition-opacity duration-200">
          <button
            className="flex w-full items-center gap-2 rounded px-2 py-2 text-sky-500 hover:bg-sky-100 dark:hover:bg-zinc-700"
            onClick={handleCopyLink}
          >
            <HiOutlineShare className="h-5 w-5" />
            <span>کپی لینک</span>
          </button>
          {isCopied && <div className="mt-2 text-xs text-center text-green-600 dark:text-green-400">کپی شد!</div>}
        </div>
      )}
    </>
  );
}

function Tooltip({ text }: { text: string }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden w-max rounded bg-zinc-900 px-3 py-1 text-sm text-white group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {text}
    </div>
  );
}

export default ShareProductAction;
