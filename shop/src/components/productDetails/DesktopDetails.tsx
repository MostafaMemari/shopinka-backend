'use client';

import { FC } from 'react';
import { HiOutlineShieldCheck } from 'react-icons/hi';
import SizeSelector from './SizeSelector';

import { IProductDetails } from '@/lib/types/products';
import ColorSelector from './ColorSelector';
import ProductProperties from '@/components/productDetails/ProductProperties';
import QuantitySelector from '../ui/QuantitySelector';
import { useProductSelection } from '@/hooks/useProductSelection';
import AddToCartButtonDesktop from './AddToCartButton/AddToCartButtonDesktop';
import PriceDisplay from './PriceDisplay';

interface Props {
  product: IProductDetails;
}

const DesktopDetails: FC<Props> = ({ product }) => {
  const { quantity, selectedColor, setSelectedColor, selectedSize, setSelectedSize, handleIncrement, handleDecrement } =
    useProductSelection();

  return (
    <div className="col-span-8 flex min-h-full flex-col">
      {product.title && <h1 className="text-lg font-semibold pb-2">{product.title}</h1>}

      <div className="grid grow grid-cols-2 gap-x-4">
        <div className="col-span-1">
          {product.englishTitle && (
            <div className="mb-4 flex items-center gap-x-2">
              <h2 className="line-clamp-1 text-sm font-light text-text/60">{product.englishTitle}</h2>
              <span className="h-px grow bg-background dark:bg-muted/10"></span>
            </div>
          )}

          <div className="mb-4 flex items-center gap-x-4 text-sm font-light text-primary">
            {product.sku && (
              <div>
                <a href="#">کد کالا {product.sku}#</a>
              </div>
            )}
            <span className="h-4 w-px rounded-full bg-background dark:bg-muted/10"></span>
            <div>
              <a href="#">{product.commentsCount || 0} دیدگاه</a>
            </div>
          </div>

          <div className="mb-4 flex gap-x-2">
            <svg className="h-4 w-4 text-primary">
              <use xlinkHref="#like" />
            </svg>
            <p className="text-sm font-light text-text/60">{product.userSuggestion}</p>
          </div>

          {product.properties && product.properties.length > 0 && <ProductProperties properties={product.properties} />}
        </div>

        <div className="col-span-1 flex flex-col">
          <div className="mb-4">
            {product.colors && (
              <div className="mb-3 space-y-6">
                <ColorSelector label="انتخاب رنگ" colors={product.colors} selectedColor={selectedColor} onColorChange={setSelectedColor} />
              </div>
            )}
            {product.sizes && (
              <div className="mb-3 space-y-6">
                <SizeSelector label="انتخاب سایز" sizes={product.sizes} selectedSize={selectedSize} onSizeChange={setSelectedSize} />
              </div>
            )}
          </div>

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
