'use client';

import { FC } from 'react';
import { HiOutlineShieldCheck } from 'react-icons/hi';

import QuantitySelector from '../../../shared/components/ui/QuantitySelector';
import { useProductSelection } from '@/Modules/product/hooks/useProductSelection';
import AddToCartButtonDesktop from './AddToCartButton/AddToCartButtonDesktop';
import PriceDisplay from './PriceDisplay';
import { ProductDetails } from '../../product/types/productType';
import ProductVariants from './VariantSelector';

interface Props {
  product: ProductDetails;
}

const DesktopDetails: FC<Props> = ({ product }) => {
  const { quantity, handleIncrement, handleDecrement } = useProductSelection();

  return (
    <div className="col-span-8 flex min-h-full flex-col">
      {product.name && <h1 className="text-lg font-semibold pb-2">{product.name}</h1>}

      <div className="grid grow grid-cols-2 gap-x-4">
        <div className="col-span-1">
          {/* {product.englishTitle && (
            <div className="mb-4 flex items-center gap-x-2">
              <h2 className="line-clamp-1 text-sm font-light text-text/60">{product.englishTitle}</h2>
              <span className="h-px grow bg-background dark:bg-muted/10"></span>
            </div>
          )} */}

          <div className="mb-4 flex items-center gap-x-4 text-sm font-light text-primary">
            {product.sku && (
              <div>
                <a href="#">کد کالا {product.sku}</a>
              </div>
            )}
            <span className="h-4 w-px rounded-full bg-background dark:bg-muted/10"></span>
            <div>
              <a href="#">{0} دیدگاه</a>
            </div>
          </div>

          <div className="mb-4 flex gap-x-2">
            <svg className="h-4 w-4 text-primary">
              <use xlinkHref="#like" />
            </svg>
            <p className="text-sm font-light text-text/60">{product.shortDescription}</p>
          </div>

          {/* {product.properties && product.properties.length > 0 && <ProductProperties properties={product.properties} />} */}
        </div>

        <div className="col-span-1 flex flex-col">
          {product.type === 'VARIABLE' && <ProductVariants attributes={product.attributes} variants={product.variants} />}

          <div className="mb-6 flex items-center gap-x-2 rounded-lg bg-primary/10 p-4 text-sm text-primary">
            <HiOutlineShieldCheck className="h-6 w-6" />
            تضمین سلامت فیزیکی و اصالت کالا
          </div>

          <div className="mb-6 flex items-center justify-between">
            <QuantitySelector quantity={quantity} onIncrement={handleIncrement} onDecrement={handleDecrement} />
            <div className="flex items-center gap-x-1 text-primary">
              <PriceDisplay newPrice={20000} />
            </div>
          </div>

          <AddToCartButtonDesktop />
        </div>
      </div>
    </div>
  );
};

export default DesktopDetails;
