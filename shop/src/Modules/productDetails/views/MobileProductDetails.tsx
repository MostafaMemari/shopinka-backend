import React from 'react';
import ProductImageSwiper from '../components/ProductImageSwiper';
import BreadcrumbContainer from '../components/BreadcrumbContainer';
import ProductActions from '../components/ActionButtons';
import MobileDetails from '../components/MobileDetails';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface MobileProductDetailsProps {
  productId: number;
  breadcrumbItems: { label: string; href: string }[];
}

function MobileProductDetails({ productId, breadcrumbItems }: MobileProductDetailsProps) {
  const { product } = useSelector((state: RootState) => state.product);

  if (!product) return null;

  return (
    <div className="mb-6 relative rounded-lg bg-muted p-4 shadow-base">
      <div className="mb-4">
        <ProductImageSwiper />
        <BreadcrumbContainer variant="compact" items={breadcrumbItems} />
      </div>
      <ProductActions productId={productId} />
      <MobileDetails product={product} />
    </div>
  );
}

export default MobileProductDetails;
