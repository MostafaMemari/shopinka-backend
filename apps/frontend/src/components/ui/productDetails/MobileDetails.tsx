"use client";

import { FC } from "react";
import SizeSelector from "./SizeSelector";
import { IProductDetails } from "@/lib/types/products";
import ColorSelector from "./ColorSelector";
import QuantitySelector from "../Common/QuantitySelector";
import ProductGuarantees from "./ProductGuarantees";
import { useProductSelection } from "@/hooks/useProductSelection";
import AddToCartButtonMobile from "./AddToCartButton/AddToCartButtonMobile";
import { mockProductDetails } from "@/mock/productCarousels";

interface Props {
  product: IProductDetails;
}

const MobileDetails: FC<Props> = ({ product }) => {
  const { quantity, selectedColor, setSelectedColor, selectedSize, setSelectedSize, handleIncrement, handleDecrement } =
    useProductSelection();

  return (
    <div>
      <div className="space-y-4">
        {product.title && <h1 className="text-lg font-semibold">{product.title}</h1>}
        <div className="flex gap-x-4 text-sm font-light text-primary md:text-base">
          {product.sku && (
            <div>
              <a href="#">کد کالا {product.sku}#</a>
            </div>
          )}
          <div>
            <a href="#">{product.commentsCount || 0} دیدگاه</a>
          </div>
        </div>
        <div className="my-4 h-px w-full bg-background"></div>
        <div className="mb-6 space-y-4">
          {product.colors && (
            <div className="mb-3 space-y-6">
              <ColorSelector label="انتخاب رنگ" colors={product.colors} selectedColor={selectedColor} onColorChange={setSelectedColor} />
            </div>
          )}
          {product.sizes && (
            <div className="mb-3 space-y-6">
              <SizeSelector label="انتخاب سایز" sizes={product.sizes} selectedSize={selectedSize} onSizeChange={setSelectedSize} />
            </div>
          )}
          <QuantitySelector label="انتخاب تعداد" quantity={quantity} onIncrement={handleIncrement} onDecrement={handleDecrement} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ProductGuarantees />
        </div>
      </div>
      <AddToCartButtonMobile
        discount={mockProductDetails.discount}
        newPrice={mockProductDetails.newPrice}
        oldPrice={mockProductDetails.oldPrice}
      />
    </div>
  );
};

export default MobileDetails;
