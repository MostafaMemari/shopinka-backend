'use client';

import { FC, ReactNode, Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { FiX } from 'react-icons/fi';

interface MobileDrawerProps {
  title?: string;
  triggerButton?: ReactNode;
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

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[60]" onClose={onClose}>
          {/* Overlay */}
          <TransitionChild
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </TransitionChild>

          {/* Bottom Drawer */}
          <div className="fixed inset-0 flex items-end">
            <TransitionChild
              as={Fragment}
              enter="transform transition duration-300"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transform transition duration-200"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <DialogPanel className={`w-full bg-white dark:bg-muted shadow-xl rounded-t-2xl flex flex-col max-h-[90vh] ${className}`}>
                {/* Header */}
                <div className="flex items-center justify-between gap-x-4 border-b p-4 pb-5 shrink-0">
                  <DialogTitle className="text-lg font-medium text-text/90">{title}</DialogTitle>
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

                {/* Content */}
                <div className={`flex-1 overflow-y-auto px-4 ${footerActions ? 'pb-1' : 'pb-4'}`}>{children}</div>

                {/* Footer */}
                {footerActions && (
                  <div className="sticky bottom-0 left-0 right-0 border-t bg-muted px-6 py-4">
                    <div className="flex items-center justify-between">{footerActions}</div>
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MobileDrawer;
