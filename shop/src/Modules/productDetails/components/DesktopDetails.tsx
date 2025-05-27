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

export default function DesktopDetails({ product }: Props) {
  const isVariableProduct = product.variants.length > 0;

  return (
    <div className="col-span-8 flex min-h-full flex-col">
      {product.name && <h1 className="text-lg font-semibold pb-2">{product.name}</h1>}

      <div className="grid grow grid-cols-2 gap-x-4">
        <div className="col-span-1">
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
        </div>

        <div className="col-span-1 flex flex-col">
          {isVariableProduct && (
            <div className="mb-6">
              <ProductVariants
                variants={product.variants}
                attributes={product.attributes}
                productType={product.type}
                defaultVariantId={product.defaultVariantId ?? undefined}
              />
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

      <ProductProperties />
    </div>
  );
}
