"use client";

import { FC } from "react";

import { IProduct } from "@/lib/types/products";
import BoxedBreadcrumb from "../ui/BoxedBreadcrumb";
import ProductActions from "./ActionButtons";
import ProductGuarantees from "./ProductGuarantees";
import CompactBreadcrumb from "../ui/CompactBreadcrumb";
import ProductImageSwiper from "./ProductImageSwiper";
import MobileDetails from "./MobileDetails";
import ProductGallery from "./ProductGallery/ProductGallery";
import DesktopDetails from "./DesktopDetails";
import BreadcrumbContainer from "../product/BreadcrumbContainer";

interface Props {
  product: IProduct;
}

const ProductDetails: FC<Props> = ({ product }) => {
  const breadcrumbItems = [
    { label: "روتی کالا", href: "/" },
    { label: "مردانه", href: "/men" },
    { label: "کتونی مردانه", href: product.productLink },
  ];

  const galleryImages = [{ src: product.imageSrc, alt: product.title }];

  return (
    <>
      <div className="container">
        <div className="hidden lg:block">
          <BreadcrumbContainer variant="boxed" items={breadcrumbItems} />
          <div className="mb-6 rounded-lg bg-muted p-6 shadow-base">
            <div className="mb-10 grid grow grid-cols-12 gap-4">
              <div className="col-span-4">
                <ProductActions productId={product.id} />
                <ProductGallery images={galleryImages} title={`تصاویر محصول ${product.title}`} />
              </div>
              <div className="col-span-8 flex min-h-full flex-col">
                <BreadcrumbContainer variant="compact" items={breadcrumbItems} />
                <DesktopDetails product={product} />
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <ProductGuarantees />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <CompactBreadcrumb items={breadcrumbItems} />
        <div className="mb-6 relative rounded-lg bg-muted p-4 shadow-base">
          <div className="mb-4">
            <ProductImageSwiper images={galleryImages} />
          </div>
          <ProductActions productId={product.id} />
          <MobileDetails product={product} />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
