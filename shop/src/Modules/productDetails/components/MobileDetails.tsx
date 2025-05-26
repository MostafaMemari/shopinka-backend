'use client';

import { ProductDetails } from '@/Modules/product/types/productType';
import PriceDisplay from './PriceDisplay';
import ProductVariants from './VariantSelector';
import AddToCartButton from './AddToCartButton';
import ProductProperties from './ProductProperties';
import { HiOutlineShieldCheck } from 'react-icons/hi';

interface Props {
  product: ProductDetails;
}

export default function MobileDetails({ product }: Props) {
  const isVariableProduct = product.variants.length > 0;

  return (
    <div>
      <div className="space-y-4">
        {product.name && <h1 className="text-lg font-semibold">{product.name}</h1>}
        <div className="flex gap-x-4 text-sm font-light text-primary md:text-base">
          {product.sku && (
            <div>
              <a href="#">کد کالا {product.sku}</a>
            </div>
          )}
          <div>
            <a href="#">{0} دیدگاه</a>
          </div>
        </div>
        <div className="my-4 h-px w-full bg-background"></div>

        <div className="mb-6 space-y-4">
          {isVariableProduct && (
            <div className="mb-6">
              <ProductVariants variants={product.variants} attributes={product.attributes} />
            </div>
          )}

          <div className="mb-6 flex items-center gap-x-2 rounded-lg bg-primary/10 p-4 text-sm text-primary">
            <HiOutlineShieldCheck className="h-6 w-6" />
            تضمین سلامت فیزیکی و اصالت کالا
          </div>

          <div className="mb-6">
            <PriceDisplay product={product} />
          </div>

          <div className="mb-6">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      {product.description && (
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-semibold text-text">توضیحات محصول</h2>
          <div className="prose prose-sm max-w-none text-text/80" dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      )}

      <ProductProperties product={product} />
    </div>
  );
}
