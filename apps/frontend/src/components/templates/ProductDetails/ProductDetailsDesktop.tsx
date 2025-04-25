"use client";

import React, { useState } from "react";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { IProductDetails } from "@/lib/types/products";
import ProductProperties from "@/components/ui/ProductProperties";
import ColorSelector from "@/components/ui/ColorSelector";
import SizeSelector from "@/components/ui/SizeSelector";
import QuantitySelector from "@/components/ui/QuantitySelector";
import AddToCartButtonDesktop from "@/components/ui/AddToCartButton/AddToCartButtonDesktop";

export default function ProductDetailsDesktop({
  title,
  englishTitle,
  sku,
  commentsCount,
  userSuggestion,
  properties,
  colors,
  sizes,
  price,
}: IProductDetails) {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>("color-desktop-1");
  const [selectedSize, setSelectedSize] = useState<string>("size-desktop-1");

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="col-span-8 flex min-h-full flex-col">
      {title && <h1 className="text-lg font-semibold pb-2">{title}</h1>}

      <div className="grid grow grid-cols-2 gap-x-4">
        <div className="col-span-1">
          {englishTitle && (
            <div className="mb-4 flex items-center gap-x-2">
              <h2 className="line-clamp-1 text-sm font-light text-text/60">
                {englishTitle}
              </h2>
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

          {properties && properties.length > 0 && (
            <ProductProperties properties={properties} />
          )}
        </div>

        <div className="col-span-1 flex flex-col">
          <div className="mb-4">
            {colors && (
              <>
                <div className="mb-3 space-y-6">
                  <ColorSelector
                    label="انتخاب رنگ"
                    colors={colors ?? []}
                    selectedColor={selectedColor}
                    onColorChange={setSelectedColor}
                  />
                </div>
              </>
            )}
            {sizes && (
              <>
                <div className="mb-3 space-y-6">
                  <SizeSelector
                    label="انتخاب سایز"
                    sizes={sizes ?? []}
                    selectedSize={selectedSize}
                    onSizeChange={setSelectedSize}
                  />
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
            <QuantitySelector
              quantity={quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
            <div className="flex items-center gap-x-1 text-primary">
              {price && price > 0 ? (
                <>
                  <span className="text-xl font-bold">
                    {price?.toLocaleString("IR-fa")}
                  </span>
                  <span>تومان</span>
                </>
              ) : (
                <span>رایگان</span>
              )}
            </div>
          </div>

          <AddToCartButtonDesktop />
        </div>
      </div>
    </div>
  );
}
