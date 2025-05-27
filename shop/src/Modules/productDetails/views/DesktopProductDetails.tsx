import React from 'react';
import BreadcrumbContainer from '../components/BreadcrumbContainer';
import ProductActions from '../components/ActionButtons';
import ProductGallery from '../components/ProductGallery/ProductGallery';
import DesktopDetails from '../components/DesktopDetails';
import ProductGuarantees from '../components/ProductGuarantees';

interface DesktopProductDetailsProps {
  productId: number;
  breadcrumbItems: { label: string; href: string }[];
}

function DesktopProductDetails({ productId, breadcrumbItems }: DesktopProductDetailsProps) {
  return (
    <>
      <BreadcrumbContainer variant="boxed" items={breadcrumbItems} />
      <div className="mb-6 rounded-lg bg-muted p-6 shadow-base">
        <div className="mb-10 grid grow grid-cols-12 gap-4">
          <div className="col-span-4">
            <ProductActions productId={productId} />
            <ProductGallery />
          </div>
          <div className="col-span-8 flex min-h-full flex-col">
            <BreadcrumbContainer variant="compact" items={breadcrumbItems} />
            <DesktopDetails />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <ProductGuarantees />
        </div>
      </div>
    </>
  );
}

export default DesktopProductDetails;
