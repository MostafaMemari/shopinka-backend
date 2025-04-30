"use client";

import { IProduct } from "@/lib/types/products";
import { FC } from "react";
import ProductCard from "../ProductCard";

interface ProductGridProps {
  products: IProduct[];
}

const ProductGrid: FC<ProductGridProps> = ({ products }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-px gap-y-2 xs:gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductGrid;
