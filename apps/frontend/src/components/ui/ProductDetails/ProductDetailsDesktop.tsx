"use client";

import React, { useState } from "react";
import { HiOutlineShieldCheck } from "react-icons/hi";
import SizeSelector from "./SizeSelector";
import { ColorSelector } from "./ColorSelector";
import { QuantitySelector } from "./QuantitySelector";
import ProductTitle from "./ProductTitle";

// Types
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

const ProductDetailsDesktop = ({
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
    <div className="col-span-8 flex min-h-full flex-col">
      {title && <ProductTitle title={title} />}

      <div className="grid grow grid-cols-2 gap-x-4">
        <div className="col-span-1">
          {englishTitle && (
            <div className="mb-4 flex items-center gap-x-2">
              <h2 className="line-clamp-1 text-sm font-light text-text/60">{englishTitle}</h2>
              <span className="h-px grow bg-background dark:bg-muted/10"></span>
            </div>
          )}

          <div className="mb-4 flex items-center gap-x-4 text-sm font-light text-primary">
            {sku && (
              <div>
                <a href="#"> کد کالا {sku}# </a>
              </div>
            )}

            <span className="h-4 w-px rounded-full bg-background dark:bg-muted/10"></span>
            <div>
              <a href="#"> {commentsCount ? commentsCount : 0} دیدگاه </a>
            </div>
          </div>

          {/* User Suggestion */}
          <div className="mb-4 flex gap-x-2">
            <svg className="h-4 w-4 text-primary">
              <use xlinkHref="#like" />
            </svg>
            <p className="text-sm font-light text-text/60">{userSuggestion}</p>
          </div>

          {/* Product Properties */}

          {properties && Object.keys(properties).length > 0 && (
            <div>
              <p className="mb-6 font-medium">ویژگی های محصول</p>
              <ul className="space-y-4">
                <li className="flex gap-x-2">
                  <div className="min-w-fit text-text/60">جنس :</div>
                  <div className="text-text/90">{properties?.material}</div>
                </li>
                <li className="flex gap-x-2">
                  <div className="min-w-fit text-text/60">جنس زیره :</div>
                  <div className="text-text/90">{properties?.soleMaterial}</div>
                </li>
                <li className="flex gap-x-2">
                  <div className="min-w-fit text-text/60">نحوه بسته شدن کفش :</div>
                  <div className="text-text/90">{properties?.closureType}</div>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="col-span-1 flex flex-col">
          <div className="mb-4">
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
          </div>

          {/* Verified Text */}
          <div className="mb-6 flex items-center gap-x-2 rounded-lg bg-primary/10 p-4 text-sm text-primary /5">
            <span className="h-6 w-6">
              <HiOutlineShieldCheck className="h-full w-full" />
            </span>
            تضمین سلامت فیزیکی و اصالت کالا
          </div>

          <div className="mb-6 flex items-center justify-between">
            <QuantitySelector quantity={quantity} onIncrement={handleIncrement} onDecrement={handleDecrement} />
            <div className="flex items-center gap-x-1 text-primary">
              {price && price > 0 ? (
                <>
                  <span className="text-xl font-bold">{price?.toLocaleString("IR-fa")}</span>
                  <span>تومان</span>
                </>
              ) : (
                <span>رایگان</span>
              )}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mb-6">
            <button className="btn-primary w-full py-3">افزودن به سبد خرید</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsDesktop;
