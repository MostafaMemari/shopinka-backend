import PopularProducts from "@/components/templates/index/PopularProducts";
import ProductActions from "@/components/ui/ActionButtons";
import BoxedBreadcrumb from "@/components/ui/Breadcrumb/BoxedBreadcrumb";
import CompactBreadcrumb from "@/components/ui/Breadcrumb/CompactBreadcrumb";
import ProductDetails from "@/components/ui/ProductDetails/ProductDetailsDesktop";
import ProductDetailsMobile from "@/components/ui/ProductDetails/ProductDetailsMobile";
import ProductGallery from "@/components/ui/ProductGallery/ProductGallery";
import ProductGuarantees from "@/components/ui/ProductGuarantees";
import ProductImageSwiper from "@/components/ui/ProductImageSwiper";
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

  return (
    <>
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
              <ProductDetails
                colors={[
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
                ]}
                sizes={["28", "18"]}
              />
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <ProductGuarantees />
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
          <ProductDetailsMobile
            title="محصول شماره 10 تستی کتونی"
            sku="654465"
            colors={[
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
            ]}
            sizes={["28", "18"]}
          />
        </div>
        <div className="mb-6 rounded-lg bg-muted p-4 shadow-base lg:hidden">
          <p className="mb-6">ویژگی های محصول</p>

          <ul className="space-y-4">
            <li className="flex gap-x-2">
              <div className="min-w-fit text-sm text-text/60">جنس :</div>
              <div className="text-sm text-text/90">پارچه</div>
            </li>
            <li className="flex gap-x-2">
              <div className="min-w-fit text-sm text-text/60">جنس زیره :</div>
              <div className="text-sm text-text/90">لاستیک</div>
            </li>
            <li className="flex gap-x-2">
              <div className="min-w-fit text-sm text-text/60">نحوه بسته شدن کفش :</div>
              <div className="text-sm text-text/90">بندی</div>
            </li>
          </ul>
        </div>
        <div className="fixed inset-x-0 bottom-0 z-10 bg-muted p-5">
          <div className="flex items-center justify-between gap-x-6">
            <div className="flex grow">
              <button className="btn-primary w-full px-4 py-3 text-sm">افزودن به سبد خرید</button>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-x-2">
                <div>
                  <del className="text-sm text-text/60 decoration-warning md:text-base">10,000,000</del>
                </div>
                <div className="flex w-10 items-center justify-center rounded-full bg-warning py-0.5 text-sm font-bold text-white dark:bg-red-600">
                  50%
                </div>
              </div>
              <div className="text-primary">
                <span className="font-semibold">1,200,000</span>
                <span className="text-sm font-light">تومان</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
