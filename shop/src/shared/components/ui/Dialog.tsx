'use client';

import React, { Fragment, ReactNode, useEffect, useRef } from 'react';
import { Transition, TransitionChild } from '@headlessui/react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  icon?: ReactNode;
  maxWidth?: string;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>; // برای فوکوس اولیه
}

export default function Dialog({
  isOpen,
  onClose,
  title,
  children,
  actions,
  icon,
  maxWidth = 'sm:max-w-lg',
  closeOnEsc = true,
  closeOnOverlayClick = true,
  initialFocusRef, // رفرنس برای المنتی که باید فوکوس بشه
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);

  // مدیریت فوکوس و بستن با Esc
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape') {
        onClose(); // بستن dialog
        if (initialFocusRef?.current) {
          initialFocusRef.current.focus(); // برگرداندن فوکوس
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeOnEsc, onClose, initialFocusRef]);

  // مدیریت کلیک روی overlay
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  // پیدا کردن اولین المنت قابل فوکوس در dialog
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      firstFocusableRef.current = focusableElements[0] || null;

      // اگر initialFocusRef مشخص شده، اولویت با اونه
      const elementToFocus = initialFocusRef?.current || firstFocusableRef.current;
      if (elementToFocus) {
        elementToFocus.focus();
      }
    }
  }, [isOpen, initialFocusRef]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={handleOverlayClick} />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:scale-95"
            >
              <div
                ref={dialogRef}
                className={`relative w-full ${maxWidth} rounded-lg bg-white shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto`}
              >
                <div className="flex items-start gap-4 p-6">
                  {/* {icon && <div className="flex-shrink-0">{icon}</div>} */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900" id="dialog-title">
                      {title}
                    </h3>
                    <div className="mt-3 text-gray-600">{children}</div>
                  </div>
                  <button
                    type="button"
                    className="absolute left-4 top-4 text-gray-400 hover:text-gray-600"
                    onClick={onClose}
                    aria-label="بستن دیالوگ"
                  >
                    <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {actions && <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">{actions}</div>}
              </div>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Transition>
  );
}
