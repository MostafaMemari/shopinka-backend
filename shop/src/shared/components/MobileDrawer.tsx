'use client';

import { FC, ReactNode, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

interface MobileDrawerProps {
  title?: string;
  triggerButton: ReactNode;
  footerActions?: ReactNode;
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const MobileDrawer: FC<MobileDrawerProps> = ({
  title = 'منو',
  triggerButton,
  footerActions,
  children,
  className = '',
  isOpen,
  onOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className="w-full cursor-pointer outline-none"
        onClick={onOpen}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen()}
        aria-controls="mobile-drawer-navigation"
        aria-expanded={isOpen}
      >
        {triggerButton}
      </div>

      <div
        className={`fixed inset-0 min-h-screen w-full bg-muted transition-transform duration-300 z-[60] flex flex-col ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } ${className}`}
        aria-labelledby="mobile-drawer-navigation-label"
        tabIndex={-1}
        id="mobile-drawer-navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-x-4 border-b p-4 pb-5 shrink-0">
          <h5 className="text-lg font-medium text-text/90">{title}</h5>
          <button
            className="inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-text/90 hover:bg-zinc-100 hover:text-gray-900 dark:hover:bg-black dark:hover:text-white"
            onClick={onClose}
            type="button"
            aria-label="بستن منو"
          >
            <FiX className="h-5 w-5" />
            <span className="sr-only">بستن منو</span>
          </button>
        </div>

        <div className={`flex-1 overflow-y-auto px-4 ${footerActions ? 'pb-1' : 'pb-4'}`}>{children}</div>

        {/* Footer */}
        {footerActions && (
          <div className="sticky bottom-0 left-0 right-0 border-t bg-muted px-6 py-4">
            <div className="flex items-center justify-between">{footerActions}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileDrawer;
