"use client";

import { useState } from "react";
import { ColorSelector } from "./ColorSelector";
import ProductTitle from "./ProductTitle";
import SizeSelector from "./SizeSelector";
import { QuantitySelector } from "./QuantitySelector";
import ProductGuarantees from "../ProductGuarantees";

type Color = {
  id: string;
  name: string;
  color: string;
};

type ProductDetailsProps = {
  title?: string;
  englishTitle?: string;
  sku?: string;
  commentsCount?: number;
  userSuggestion?: string;
  properties?: {
    material?: string;
    soleMaterial?: string;
    closureType?: string;
  };
  colors?: Color[];
  sizes?: string[];
  price?: number;
};

const ProductDetailsMobile = ({
  title,
  englishTitle,
  sku,
  commentsCount,
  userSuggestion,
  properties,
  colors,
  sizes,
  price,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>("color-desktop-1");
  const [selectedSize, setSelectedSize] = useState<string>("size-desktop-1");

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div>
      <div className="space-y-4">
        {title && <ProductTitle title={title} />}
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
            <>
              <div className="mb-3 space-y-6">
                <ColorSelector colors={colors ?? []} selectedColor={selectedColor} onColorChange={setSelectedColor} />
              </div>
            </>
          )}
          {sizes && (
            <>
              <div className="mb-3 space-y-6">
                <SizeSelector sizes={sizes ?? []} selectedSize={selectedSize} onSizeChange={setSelectedSize} />
              </div>
            </>
          )}
          <QuantitySelector quantity={quantity} onIncrement={handleIncrement} onDecrement={handleDecrement} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ProductGuarantees />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsMobile;
