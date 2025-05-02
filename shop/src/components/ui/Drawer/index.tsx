import React, { useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Drawer({ isOpen, onClose, title, children }: Props) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 h-full w-full bg-muted transition-transform duration-300 ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between gap-x-4 border-b p-4 pb-5">
        <h5 className="text-lg text-text/90">{title || "پنل"}</h5>
        <button
          onClick={onClose}
          className="inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-text/90 hover:bg-zinc-100 hover:text-gray-900 dark:hover:bg-black dark:hover:text-white"
        >
          <HiOutlineX className="h-5 w-5" />
          <span className="sr-only">بستن</span>
        </button>
      </div>
      <div className="h-full overflow-y-auto p-4 pb-32">{children}</div>
    </div>
  );
}
