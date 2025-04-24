"use client";

import { useState } from "react";
import ProductGuarantees from "../ProductGuarantees";
import SizeSelector from "../SizeSelector";
import { QuantitySelector } from "../QuantitySelector";
import { IProductDetails } from "@/lib/types/products";
import ColorSelector from "../ColorSelector";

export default function ProductDetailsMobile({ title, sku, commentsCount, colors, sizes }: IProductDetails) {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>("color-desktop-1");
  const [selectedSize, setSelectedSize] = useState<string>("size-desktop-1");

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div>
      <div className="space-y-4">
        {title && <h1 className="text-lg font-semibold">{title}</h1>}
        <div className="flex gap-x-4 text-sm font-light text-primary md:text-base">
          {sku && (
            <div>
              <a href="#"> کد کالا {sku}# </a>
            </div>
          )}
          <div>
            <a href="#"> {commentsCount ? commentsCount : 0} دیدگاه </a>
          </div>
        </div>
        <div className="my-4 h-px w-full bg-background"></div>
        <div className="mb-6 space-y-4">
          {colors && (
            <div className="mb-3 space-y-6">
              <ColorSelector label="انتخاب رنگ" colors={colors ?? []} selectedColor={selectedColor} onColorChange={setSelectedColor} />
            </div>
          )}
          {sizes && (
            <div className="mb-3 space-y-6">
              <SizeSelector label="انتخاب سایز" sizes={sizes ?? []} selectedSize={selectedSize} onSizeChange={setSelectedSize} />
            </div>
          )}
          <QuantitySelector label="انتخاب تعداد" quantity={quantity} onIncrement={handleIncrement} onDecrement={handleDecrement} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ProductGuarantees />
        </div>
      </div>
    </div>
  );
}
