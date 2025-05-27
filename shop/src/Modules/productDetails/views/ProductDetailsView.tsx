'use client';

import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type ProductDetails } from '../../product/types/productType';
import { RootState } from '@/store';
import { clearProduct, setProduct } from '@/store/slices/productSlice';
import DesktopProductDetails from './DesktopProductDetails';
import MobileProductDetails from './MobileProductDetails';

interface ProductDetailsViewProps {
  product: ProductDetails;
}

const ProductDetailsView: FC<ProductDetailsViewProps> = ({ product }) => {
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
    <div className="container">
      <div className="hidden lg:block">
        <DesktopProductDetails productId={product.id} breadcrumbItems={breadcrumbItems} />
      </div>
      <div className="lg:hidden">
        <MobileProductDetails productId={product.id} breadcrumbItems={breadcrumbItems} />
      </div>
    </div>
  );
};

export default ProductDetailsView;
