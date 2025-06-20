'use client';

import { FC, ReactNode, useState, useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';

interface SortOption {
  label: string;
  value: string;
}

interface SortDrawerProps {
  title?: string;
  triggerButton: ReactNode;
  options?: SortOption[];
  selectedOption?: string;
  onOptionChange?: (value: string) => void;
  footerActions?: ReactNode;
  className?: string;
  onClose?: () => void;
}

const SortDrawer: FC<SortDrawerProps> = ({
  title = 'مرتب‌سازی',
  triggerButton,
  options = [],
  selectedOption = '',
  onOptionChange,
  footerActions,
  className = '',
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleOptionClick = (value: string) => {
    onOptionChange?.(value);
    setIsOpen(false);
    onClose?.();
  };

  return (
    <>
      <button className="w-full" onClick={() => setIsOpen(true)} aria-controls="sort-drawer-navigation" type="button">
        {triggerButton}
      </button>

      {isOpen && <div className="fixed inset-0 z-30 bg-black/50" />}

      <div
        ref={drawerRef}
        className={`fixed bottom-0 left-0 right-0 z-40 h-auto w-full rounded-t-3xl bg-muted transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } ${className}`}
        aria-labelledby="sort-drawer-navigation-label"
        tabIndex={-1}
        id="sort-drawer-navigation"
      >
        {/* هدر */}
        <div className="flex items-center justify-between gap-x-4 border-b p-4 pb-5">
          <h5 className="text-lg text-text/90">{title}</h5>
          <button
            className="inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-text/90 hover:bg-zinc-100 hover:text-gray-900 dark:hover:bg-black dark:hover:text-white"
            onClick={() => {
              setIsOpen(false);
              onClose?.();
            }}
            type="button"
            aria-controls="sort-drawer-navigation"
            data-drawer-hide="sort-drawer-navigation"
          >
            <FiX className="h-5 w-5" />
            <span className="sr-only">بستن منو</span>
          </button>
        </div>

        <div className="main-scroll h-full space-y-2 divide-y overflow-y-auto p-4">
          <fieldset className="flex flex-col space-y-2" dir="rtl">
            <legend className="sr-only">{title}</legend>
            {options.map((option) => (
              <div key={option.value}>
                <input
                  className="peer hidden"
                  id={`sort-${option.value}`}
                  name="sort"
                  type="radio"
                  value={option.value}
                  checked={selectedOption === option.value}
                  onChange={() => handleOptionClick(option.value)}
                />
                <label
                  className="relative block w-full cursor-pointer rounded-lg border p-4 shadow-base peer-checked:border-primary peer-checked:dark:border-primary"
                  htmlFor={`sort-${option.value}`}
                >
                  <p className="text-center text-text/90">{option.label}</p>
                </label>
              </div>
            ))}
          </fieldset>
        </div>

        {footerActions && (
          <div className="sticky bottom-0 left-0 right-0 flex items-center justify-between border-t bg-muted p-4 px-6 py-4">
            {footerActions}
          </div>
        )}
      </div>
    </>
  );
};

export default SortDrawer;
