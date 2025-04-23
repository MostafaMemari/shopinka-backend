"use client";

import React, { useState } from "react";
import { HiOutlinePlus, HiOutlineMinus, HiOutlineShieldCheck } from "react-icons/hi";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>("color-desktop-1");
  const [selectedSize, setSelectedSize] = useState<string>("size-desktop-1");

  const colors = [
    { id: "color-desktop-1", name: "مشکی", color: "black" },
    { id: "color-desktop-2", name: "طوسی", color: "gray" },
    { id: "color-desktop-3", name: "سفید", color: "white" },
  ];

  const sizes = ["37", "40", "44", "43", "42"];

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="col-span-8 flex min-h-full flex-col">
      {/* Main Title */}
      <h1 className="mb-4 text-lg font-semibold">کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2</h1>

      <div className="grid grow grid-cols-2 gap-x-4">
        {/* Right Side */}
        <div className="col-span-1">
          {/* English Title */}
          <div className="mb-4 flex items-center gap-x-2">
            <h2 className="line-clamp-1 text-sm font-light text-text/60">New Balance Mens Walking Shoes Model Mdrftlm2</h2>
            <span className="h-px grow bg-background dark:bg-muted/10"></span>
          </div>

          {/* SKU & Comments */}
          <div className="mb-4 flex items-center gap-x-4 text-sm font-light text-primary">
            <div>
              <a href="#"> کد کالا 6457# </a>
            </div>
            <span className="h-4 w-px rounded-full bg-background dark:bg-muted/10"></span>
            <div>
              <a href="#"> 20 دیدگاه </a>
            </div>
          </div>

          {/* User Suggestion */}
          <div className="mb-4 flex gap-x-2">
            <svg className="h-4 w-4 text-primary">
              <use xlinkHref="#like" />
            </svg>
            <p className="text-sm font-light text-text/60">80% از خریداران، خرید این کالا را پیشنهاد کرده‌اند</p>
          </div>

          {/* Product Properties */}
          <div>
            <p className="mb-6 font-medium">ویژگی های محصول</p>
            <ul className="space-y-4">
              <li className="flex gap-x-2">
                <div className="min-w-fit text-text/60">جنس :</div>
                <div className="text-text/90">پارچه</div>
              </li>
              <li className="flex gap-x-2">
                <div className="min-w-fit text-text/60">جنس زیره :</div>
                <div className="text-text/90">لاستیک</div>
              </li>
              <li className="flex gap-x-2">
                <div className="min-w-fit text-text/60">نحوه بسته شدن کفش :</div>
                <div className="text-text/90">بندی</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Left Side */}
        <div className="col-span-1 flex flex-col">
          <div className="grow">
            {/* Variants */}
            <div className="mb-6 space-y-6">
              {/* Color Selection */}
              <div>
                <div className="mb-4">انتخاب رنگ</div>
                <fieldset className="flex flex-wrap items-center gap-1">
                  <legend className="sr-only">Color</legend>
                  {colors.map((color) => (
                    <div key={color.id}>
                      <input
                        type="radio"
                        name="color-desktop"
                        value={color.id}
                        id={color.id}
                        checked={selectedColor === color.id}
                        onChange={() => setSelectedColor(color.id)}
                        className="peer hidden"
                      />
                      <label
                        htmlFor={color.id}
                        className="relative block cursor-pointer rounded-full border-2 p-2 shadow-base peer-checked:border-emerald-500 hover:border-border/50 dark:peer-checked:border-emerald-400 dark:hover:border-white/10"
                      >
                        <div className="flex items-center gap-x-2">
                          <div
                            className="h-6 w-6 rounded-full border-2 shadow-base dark:border-white/30"
                            style={{ backgroundColor: color.color }}
                          ></div>
                          <p className="text-text/90">{color.name}</p>
                        </div>
                      </label>
                    </div>
                  ))}
                </fieldset>
              </div>

              {/* Size Selection */}
              <div>
                <div className="mb-4">انتخاب سایز</div>
                <fieldset className="flex flex-wrap items-center gap-2">
                  <legend className="sr-only">Size</legend>
                  {sizes.map((size, index) => (
                    <div key={size}>
                      <input
                        type="radio"
                        name="size-desktop"
                        value={`size-desktop-${index + 1}`}
                        id={`size-desktop-${index + 1}`}
                        checked={selectedSize === `size-desktop-${index + 1}`}
                        onChange={() => setSelectedSize(`size-desktop-${index + 1}`)}
                        className="peer hidden"
                      />
                      <label
                        htmlFor={`size-desktop-${index + 1}`}
                        className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 p-1 shadow-base peer-checked:border-emerald-500 hover:border-border/50 dark:peer-checked:border-emerald-400 dark:hover:border-white/10"
                      >
                        <p className="text-sm font-bold text-text/90 md:text-base">{size}</p>
                      </label>
                    </div>
                  ))}
                </fieldset>
              </div>
            </div>
          </div>

          {/* Verified Text */}
          <div className="mb-6 flex items-center gap-x-2 rounded-lg bg-primary/10 p-4 text-sm text-primary /5">
            <span className="h-6 w-6">
              <HiOutlineShieldCheck className="h-full w-full" />
            </span>
            تضمین سلامت فیزیکی و اصالت کالا
          </div>

          {/* Price & Quantity */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex h-12 w-32 items-center justify-between rounded-lg border px-4 py-1">
              <button type="button" onClick={handleIncrement}>
                <span className="h-6 w-6 text-primary cursor-pointer">
                  <HiOutlinePlus />
                </span>
              </button>
              <input
                value={quantity}
                disabled
                type="number"
                className="flex h-6 w-6 select-none items-center justify-center bg-transparent text-center outline-none"
              />
              <button type="button" onClick={handleDecrement}>
                <span className="h-6 w-6 text-red-600 dark:text-red-500 cursor-pointer">
                  <HiOutlineMinus />
                </span>
              </button>
            </div>
            <div className="flex items-center gap-x-1 text-primary">
              <span className="text-xl font-bold">1,800,000</span>
              <span>تومان</span>
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

export default ProductDetails;
