"use client";

import { useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import DesktopBasketDropdown from "./DesktopBasket";
import MobileBasketDrawer from "./MobileBasket";
import { mockCartItems } from "@/mock/cart";

export default function BasketDropdown() {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const totalQuantity = mockCartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="group relative">
      <button
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
        onClick={() => setIsMobileDrawerOpen(true)}
      >
        <span className="cursor-pointer">
          <HiOutlineShoppingCart className="h-6 w-6" />
        </span>
        {totalQuantity > 0 && (
          <span className="absolute -right-2.5 -top-2.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-primary-btn text-sm font-bold text-white">
            {totalQuantity}
          </span>
        )}
      </button>

      <div className="relative group hidden md:block">
        <DesktopBasketDropdown cartItems={mockCartItems} />
      </div>

      <div className="md:hidden">
        <MobileBasketDrawer cartItems={mockCartItems} isOpen={isMobileDrawerOpen} onClose={() => setIsMobileDrawerOpen(false)} />
      </div>
    </div>
  );
}
