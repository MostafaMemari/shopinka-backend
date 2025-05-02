"use client";

import Link from "next/link";
import { FiHelpCircle, FiInfo, FiMail, FiMoon, FiShoppingBag, FiSun } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import MobileLogo from "../ui/Logo/MobileLogo";
import CategoryAccordion from "./CategoryAccordion";
import { ICategory } from "@/lib/types/categories";
import { HiOutlineMenu } from "react-icons/hi";
import { HiOutlineXMark } from "react-icons/hi2";

interface MobileMenuProps {
  categories: ICategory[];
}

const MobileMenu = ({ categories }: MobileMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
  };

  // بستن منو با کلیک/تاچ بیرون
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // قفل کردن اسکرول بدنه وقتی منو بازه
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Menu Toggle Button */}
      <button aria-controls="mobile-menu-drawer-navigation" className="cursor-pointer" onClick={toggleMenu} type="button">
        <HiOutlineMenu className="h-6 w-6" />
      </button>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu-drawer-navigation"
        className={`fixed top-0 right-0 h-full w-64 bg-background z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        ref={menuRef}
      >
        <div className="flex flex-col h-full">
          {/* Header: Logo and Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <MobileLogo />
            <button onClick={toggleMenu} className="text-text/80">
              <HiOutlineXMark className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-4">
              <div
                className="flex cursor-pointer items-center gap-x-2 rounded-lg px-4 py-3 text-gray-800 dark:text-white"
                id="toggleThemeMobile"
                onClick={toggleTheme}
              >
                <div className="relative w-6 h-6">
                  {isDarkMode ? <FiMoon className="absolute inset-0 h-6 w-6" /> : <FiSun className="absolute inset-0 hidden h-6 w-6" />}
                </div>

                <div className="flex items-center justify-between" id="themeText">
                  <span>{isDarkMode ? "روشن" : "تاریک"}</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <ul className="space-y-4 mb-4">
              <li>
                <Link
                  className="flex items-center justify-between rounded-lg px-4 py-3 hover:text-primary"
                  href="/about"
                  onClick={toggleMenu}
                >
                  <span className="flex items-center gap-x-2">
                    <FiInfo className="h-6 w-6" />
                    <span>درباره ما</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center justify-between rounded-lg px-4 py-3 hover:text-primary"
                  href="/contact"
                  onClick={toggleMenu}
                >
                  <span className="flex items-center gap-x-2">
                    <FiMail className="h-6 w-6" />
                    <span>تماس با ما</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center justify-between rounded-lg px-4 py-3 hover:text-primary"
                  href="/faq"
                  onClick={toggleMenu}
                >
                  <span className="flex items-center gap-x-2">
                    <FiHelpCircle className="h-6 w-6" />
                    <span>سوالات متداول</span>
                  </span>
                </Link>
              </li>

              {/* Divider */}
              <li>
                <div className="flex items-center">
                  <div className="h-px w-full grow rounded-full bg-border"></div>
                  <div className="p-2 text-text/80">
                    <FiShoppingBag className="h-6 w-6" />
                  </div>
                  <div className="h-px w-full grow rounded-full bg-border"></div>
                </div>
              </li>
            </ul>

            {/* Categories Accordion */}
            <CategoryAccordion categories={categories} onItemClick={toggleMenu} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
