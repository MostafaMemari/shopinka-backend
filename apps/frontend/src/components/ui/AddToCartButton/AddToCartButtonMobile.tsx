"use client";

import React from "react";

interface Props {
  originalPrice?: number;
  discountPrice?: number;
  discountPercentage?: number;
}

export default function AddToCartButtonMobile({ originalPrice, discountPrice, discountPercentage }: Props) {
  const handleAddToCart = () => {
    console.log("محصول به سبد خرید اضافه شد");
  };
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 bg-muted p-5">
      <div className="flex items-center justify-between gap-x-6">
        <div className="flex grow">
          <button onClick={handleAddToCart} className="btn-primary w-full px-4 py-3 text-sm">
            افزودن به سبد خرید
          </button>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <div>
              <del className="text-sm text-text/60 decoration-warning md:text-base">{originalPrice?.toLocaleString("IR-fa")}</del>
            </div>
            <div className="flex w-10 items-center justify-center rounded-full bg-warning py-0.5 text-sm font-bold text-white dark:bg-red-600">
              {discountPercentage}%
            </div>
          </div>
          <div className="text-primary">
            <span className="font-semibold">{discountPrice?.toLocaleString("IR-fa")}</span>
            <span className="text-sm font-light">تومان</span>
          </div>
        </div>
      </div>
    </div>
  );
}
