import React, { ReactNode } from 'react';

interface CartMobileContainerProps {
  children: ReactNode;
}

function CartMobileFixContainer({ children }: CartMobileContainerProps) {
  return (
    <div className="lg:hidden">
      <div className="fixed bottom-3 right-3 left-3 rounded-2xl z-50 bg-white shadow-md">
        <div className="flex justify-between items-center text-xs rtl flex-row-reverse h-[60px]">{children}</div>
      </div>
    </div>
  );
}

export default CartMobileFixContainer;
