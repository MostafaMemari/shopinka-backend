'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseDropdownProps {
  closeOnOutsideClick?: boolean;
  openOnHover?: boolean;
}

export const useDropdown = ({ closeOnOutsideClick = true, openOnHover = false }: UseDropdownProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const openDropdown = useCallback(() => setIsOpen(true), []);
  const closeDropdown = useCallback(() => setIsOpen(false), []);
  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    if (!closeOnOutsideClick) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeOnOutsideClick, closeDropdown]);

  const handleMouseEnter = useCallback(() => {
    if (openOnHover) openDropdown();
  }, [openOnHover, openDropdown]);

  const handleMouseLeave = useCallback(() => {
    if (openOnHover) closeDropdown();
  }, [openOnHover, closeDropdown]);

  return {
    isOpen,
    dropdownRef,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    handleMouseEnter,
    handleMouseLeave,
  };
};
