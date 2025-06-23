'use client';

import React, { Fragment, ReactNode, useEffect, useRef } from 'react';
import { Transition, TransitionChild } from '@headlessui/react';

type DialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  icon?: ReactNode;
  size?: DialogSize;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
}

export default function Dialog({
  isOpen,
  onClose,
  onOpen,
  title,
  children,
  actions,
  size = 'sm',
  closeOnEsc = true,
  closeOnOverlayClick = true,
  initialFocusRef,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';

        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape') {
        onClose();
        if (initialFocusRef?.current) {
          initialFocusRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeOnEsc, onClose, initialFocusRef]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && dialogRef.current && event.target instanceof Node && !dialogRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      firstFocusableRef.current = focusableElements[0] || null;

      const elementToFocus = initialFocusRef?.current || firstFocusableRef.current;
      if (elementToFocus) {
        elementToFocus.focus();
      }
    }
  }, [isOpen, initialFocusRef]);

  // تعریف کلاس‌های اندازه
  const sizeClasses: Record<DialogSize, string> = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  const dialogClass = `w-full ${sizeClasses[size]}`;

  return (
    <Transition show={isOpen} as={Fragment}>
      <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="dialog-title" onClick={handleOverlayClick}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" aria-hidden="true" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
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
                className={`relative ${dialogClass} rounded-lg bg-white shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto`}
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

                {actions && <div className="bg-gray-50 px-6 py-4 flex gap-3 border-t">{actions}</div>}
              </div>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Transition>
  );
}
