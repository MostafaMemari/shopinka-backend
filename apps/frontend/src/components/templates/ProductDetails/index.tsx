"use client";

import BoxedBreadcrumb from "@/components/ui/Breadcrumb/BoxedBreadcrumb";
import CompactBreadcrumb from "@/components/ui/Breadcrumb/CompactBreadcrumb";
import ProductDetailsDesktop from "@/components/templates/ProductDetails/ProductDetailsDesktop";
import ProductDetailsMobile from "@/components/templates/ProductDetails/ProductDetailsMobile";
import ProductGallery from "@/features/product/ProductGallery/ProductGallery";
import ProductGuarantees from "@/features/product/ProductGuarantees";
import ProductImageSwiper from "@/features/product/ProductImageSwiper";
import React from "react";
import { IProduct } from "@/lib/types/products";
import ProductActions from "@/features/product/ActionButtons";

export default function ProductDetails({ product }: { product: IProduct }) {
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
          <BoxedBreadcrumb items={breadcrumbItems} />
          <div className="mb-6 rounded-lg bg-muted p-6 shadow-base">
            <div className="mb-10 grid grow grid-cols-12 gap-4">
              <div className="col-span-4">
                <ProductActions productId={product.id} />
                <ProductGallery images={galleryImages} title={`تصاویر محصول ${product.title}`} />
              </div>
              <div className="col-span-8 flex min-h-full flex-col">
                <CompactBreadcrumb items={breadcrumbItems} />
                <ProductDetailsDesktop title={product.title} price={product.newPrice} />
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <ProductGuarantees />
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Mobile -------------- */}
      <div className="lg:hidden">
        <CompactBreadcrumb items={breadcrumbItems} />
        <div className="mb-6 relative rounded-lg bg-muted p-4 shadow-base">
          <div className="mb-4">
            <ProductImageSwiper images={galleryImages} />
            <CompactBreadcrumb items={breadcrumbItems} />
          </div>
          <ProductActions productId={product.id} />
          <ProductDetailsMobile title={product.title} price={product.newPrice} />
        </div>
      </div>
    </>
  );
}
