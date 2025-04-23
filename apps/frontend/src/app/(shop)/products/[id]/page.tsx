import ProductActions from "@/components/ui/ActionButtons";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductGallery from "@/components/ui/ProductGallery/ProductGallery";
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

  const productTitle = "کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2";
  const galleryImages = [
    { src: "/images/products/p1.png", alt: "تصویر اصلی محصول" },
    { src: "/images/products/p2.png", alt: "تصویر محصول 2" },
    { src: "/images/products/p3.png", alt: "تصویر محصول 3" },
    { src: "/images/products/p4.png", alt: "تصویر محصول 4" },
    { src: "/images/products/p5.png", alt: "تصویر محصول 5", isBlurred: true },
  ];

  return (
    <div className="container">
      <Breadcrumb items={breadcrumbItems} />
      <div className="mb-6 rounded-lg bg-muted p-6 shadow-base">
        <div className="mb-6 grid grow grid-cols-12 gap-4">
          <div className="col-span-4">
            <div className="min-w-fit space-y-4">
              <ProductActions productId={id} />
              <ProductGallery images={galleryImages} title={`تصاویر محصول ${productTitle}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
