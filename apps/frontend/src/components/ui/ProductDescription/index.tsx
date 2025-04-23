"use client";

import React, { useState } from "react";
import Drawer from "../Drawer";

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="py-6" id="description">
      <div className="relative mb-16 w-fit text-xl font-medium">
        معرفی
        <span className="absolute right-0 top-10 h-[3px] w-full rounded-full bg-primary"></span>
      </div>
      <div className="mb-6 max-h-[500px] overflow-hidden md:mb-10" id="descriptionContainer">
        <div className="space-y-4 text-sm leading-loose text-text/90 lg:text-base">{description}</div>
      </div>
      <div className="flex justify-center">
        <button className="btn-secondary-nobg hidden md:flex" id="toggleDescriptionButton">
          مشاهده بیشتر
          <svg className="h-5 w-5">
            <use xlinkHref="#chevron-left" />
          </svg>
        </button>
        <button
          id="descriptionButtonMobile"
          aria-controls="mobile-description-drawer-navigation"
          data-drawer-show="mobile-description-drawer-navigation"
          data-drawer-placement="bottom"
          data-drawer-target="mobile-description-drawer-navigation"
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="btn-secondary-nobg md:hidden"
        >
          مشاهده بیشتر
          <svg className="h-5 w-5">
            <use xlinkHref="#chevron-left" />
          </svg>
        </button>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="توضیحات محصول">
        {description}
      </Drawer>
    </div>
  );
};

export default ProductDescription;
