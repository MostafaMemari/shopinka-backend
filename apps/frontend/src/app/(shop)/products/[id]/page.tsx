import ProductActions from "@/components/ui/ActionButtons";
import AddToCartButtonMobile from "@/components/ui/AddToCartButton/AddToCartButtonMobile";
import BoxedBreadcrumb from "@/components/ui/Breadcrumb/BoxedBreadcrumb";
import CompactBreadcrumb from "@/components/ui/Breadcrumb/CompactBreadcrumb";
import ProductDetails from "@/components/ui/ProductDetails/ProductDetailsDesktop";
import ProductDetailsMobile from "@/components/ui/ProductDetails/ProductDetailsMobile";
import ProductGallery from "@/components/ui/ProductGallery/ProductGallery";
import ProductGuarantees from "@/components/ui/ProductGuarantees";
import ProductImageSwiper from "@/components/ui/ProductImageSwiper";
import ProductProperties from "@/components/ui/ProductProperties";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const breadcrumbItems = [
    { label: "روتی کالا", href: "/" },
    { label: "مردانه", href: "/men" },
    { label: "کتونی مردانه", href: `/products/${id}` },
  ];
  const breadcrumbProduct = [
    { label: "کفش", href: `/products/${id}` },
    { label: "نایک", href: `/products/${id}` },
  ];

  const productTitle = "کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2";
  const galleryImages = [
    { src: "/images/products/p1.png", alt: "تصویر اصلی محصول" },
    { src: "/images/products/p2.png", alt: "تصویر محصول 2" },
    { src: "/images/products/p3.png", alt: "تصویر محصول 3" },
    { src: "/images/products/p4.png", alt: "تصویر محصول 4" },
    { src: "/images/products/p5.png", alt: "تصویر محصول 5" },
  ];

  const colors = [
    {
      id: "1",
      name: "زرد",
      color: "yellow",
    },
    {
      id: "2",
      name: "قرمز",
      color: "red",
    },
    {
      id: "3",
      name: "آبی",
      color: "blue",
    },
  ];

  const sizes = ["28", "18"];

  const properties = [
    { key: "جنس زیره", value: "چرم مصنوعی" },
    { key: "نحوه بسته شدن", value: "بند دار" },
    { key: "جنس", value: "پارچه‌ای" },
  ].map(({ key, value }) => ({ [key]: value }));

  return (
    <>
      <div className="container">
        <div className="hidden lg:block">
          <BoxedBreadcrumb items={breadcrumbItems} />
          <div className="mb-6 rounded-lg bg-muted p-6 shadow-base">
            <div className="mb-10 grid grow grid-cols-12 gap-4">
              <div className="col-span-4">
                <ProductActions productId={id} />
                <ProductGallery images={galleryImages} title={`تصاویر محصول ${productTitle}`} />
              </div>
              <div className="col-span-8 flex min-h-full flex-col">
                <CompactBreadcrumb items={breadcrumbProduct} />
                <ProductDetails title={productTitle} colors={colors} sizes={sizes} properties={properties} />
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
            <CompactBreadcrumb items={breadcrumbProduct} />
          </div>
          <ProductActions productId={id} />
          <ProductDetailsMobile title={productTitle} sku="654465" colors={colors} sizes={sizes} />
        </div>

        <div className="mb-6 rounded-lg bg-muted p-4 shadow-base">{properties && <ProductProperties properties={properties} />}</div>
        <AddToCartButtonMobile />
      </div>
    </>
  );
}
