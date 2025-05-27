'use client';

import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductActions from './ActionButtons';
import ProductGuarantees from './ProductGuarantees';
import DesktopDetails from './DesktopDetails';
import BreadcrumbContainer from './BreadcrumbContainer';
import { type ProductDetails } from '../../product/types/productType';
import { RootState } from '@/store';
import { clearProduct, setProduct } from '@/store/slices/productSlice';
import ProductGallery from './ProductGallery/ProductGallery';
import ProductImageSwiper from './ProductImageSwiper';
import MobileDetails from './MobileDetails';

interface Props {
  product: ProductDetails;
}

const ProductDetails: FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const { product: currentProduct } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (product.id !== currentProduct?.id) {
      dispatch(clearProduct());
      dispatch(setProduct(product));
    }
  }, [product, currentProduct, dispatch]);

  const breadcrumbItems = [
    { label: 'روتی کالا', href: '/' },
    { label: 'مردانه', href: '/men' },
    { label: 'کتونی مردانه', href: '/' },
  ];

  return (
    <>
      <div className="container">
        <div className="hidden lg:block">
          <BreadcrumbContainer variant="boxed" items={breadcrumbItems} />
          <div className="mb-6 rounded-lg bg-muted p-6 shadow-base">
            <div className="mb-10 grid grow grid-cols-12 gap-4">
              <div className="col-span-4">
                <ProductActions productId={product.id} />
                <ProductGallery />
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
        <div className="mb-6 relative rounded-lg bg-muted p-4 shadow-base">
          <div className="mb-4">
            <ProductImageSwiper />
            <BreadcrumbContainer variant="compact" items={breadcrumbItems} />
          </div>
          <ProductActions productId={product.id} />
          <MobileDetails product={product} />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
