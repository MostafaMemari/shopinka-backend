"use client";

import { useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import DesktopBasketDropdown from "./DesktopBasket";
import MobileBasketDrawer from "./MobileBasket";

const BasketDropdown = () => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <div className="group relative">
      {/* Basket Button */}
      <button
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
        onClick={() => setIsMobileDrawerOpen(true)}
      >
        <span className="cursor-pointer">
          <HiOutlineShoppingCart className="h-6 w-6" />
        </span>
        <span className="absolute -right-2.5 -top-2.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-primary-btn text-sm font-bold text-white">
          10
        </span>
      </button>

      {/* Desktop Dropdown */}
      <div className="relative group hidden md:block">
        <DesktopBasketDropdown />
      </div>

      {/* Mobile Drawer */}
      <div className="md:hidden">
        <MobileBasketDrawer isOpen={isMobileDrawerOpen} onClose={() => setIsMobileDrawerOpen(false)} />
      </div>
    </div>
  );
};

export default BasketDropdown;
