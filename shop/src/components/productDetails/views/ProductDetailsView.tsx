import { type ProductDetails } from '@/types/productType';

import BreadcrumbContainer from '../BreadcrumbContainer';
import ProductActions from '../ActionButtons';
import ProductGallery from '../ProductGallery/ProductGallery';
import ProductGuarantees from '../ProductGuarantees';

import ProductImageSwiper from '../ProductImageSwiper';
import ProductVariants from '../VariantSelector';
import AddToCartButtonMobile from '@/components/cart/AddToCartButton/AddToCartButtonMobile';
import ProductProperties from '../ProductProperties';
import AddToCartButtonDesktop from '@/components/cart/AddToCartButton/AddToCartButtonDesktop';
import PriceDisplay from '../PriceDisplay';
import { FC } from 'react';
import ProductSku from '../ProductSku';
import ProductCommentCount from '../Comment/ProductComments/ProductCommentCount';
import ProductGuaranteeBadge from '../ProductGuaranteeBadge';

import MobileHeader from '../MobileProductHeader';
interface ProductDetailsViewProps {
  product: ProductDetails;
}

const ProductDetailsView: FC<ProductDetailsViewProps> = ({ product }) => {
  const isVariableProduct = product.variants.length > 0;

  const breadcrumbItems = [
    { label: 'روتی کالا', href: '/' },
    { label: 'مردانه', href: '/men' },
    { label: 'کتونی مردانه', href: '/' },
  ];

  return (
    <div className="container">
      {/* <MobileHeader productId={product.id} /> */}
      <div className="hidden lg:block">
        <BreadcrumbContainer variant="boxed" items={breadcrumbItems} />
        <div className="mb-6 rounded-lg bg-muted p-6 shadow-base">
          <div className="mb-10 grid grow grid-cols-12 gap-4">
            <div className="col-span-4">
              <ProductActions productId={product.id} />
              <ProductGallery
                product={{
                  type: product.type,
                  mainImage: product.mainImage,
                  galleryImages: product.galleryImages,
                  name: product.name,
                }}
              />
            </div>
            <div className="col-span-8 flex min-h-full flex-col">
              <BreadcrumbContainer variant="compact" items={breadcrumbItems} />
              <div className="col-span-8 flex min-h-full flex-col">
                {product.name && <h1 className="text-lg font-semibold pb-2">{product.name}</h1>}

                <div className="grid grow grid-cols-2 gap-x-4">
                  <div className="col-span-1">
                    <div className="mb-4 flex items-center gap-x-4 text-sm font-light text-primary">
                      <ProductSku sku={product.sku ?? ''} />
                      <span className="h-4 w-px rounded-full bg-background dark:bg-muted/10"></span>
                      <ProductCommentCount key={product.id} productId={product.id} />
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

                    <ProductGuaranteeBadge />

                    <div className="mb-6 flex justify-between items-start w-full">
                      <div className="flex-grow"></div>

                      <div className="text-left">
                        <PriceDisplay product={{ type: product.type, basePrice: product.basePrice ?? 0, salePrice: product.salePrice }} />
                      </div>
                    </div>

                    <div className="mb-6">
                      <AddToCartButtonDesktop
                        key={product.id}
                        product={{
                          id: product.id,
                          name: product.name,
                          basePrice: product.basePrice ?? 0,
                          salePrice: product.salePrice ?? 0,
                          mainImageUrl: product.mainImage?.fileUrl ?? null,
                          type: product.type,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <ProductProperties />
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <ProductGuarantees />
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <div className="mb-6 relative rounded-lg bg-muted p-4 shadow-base">
          <div className="mb-4">
            <ProductImageSwiper
              product={{
                type: product.type,
                mainImage: product.mainImage,
                galleryImages: product.galleryImages,
                name: product.name,
              }}
            />
            <BreadcrumbContainer variant="compact" items={breadcrumbItems} />
          </div>
          <div>
            <div className="space-y-4">
              {product.name && <h1 className="text-lg font-semibold pb-2">{product.name}</h1>}
              <div className="flex gap-x-4 text-sm font-light text-primary md:text-base">
                <ProductSku sku={product.sku ?? ''} />
                <ProductCommentCount key={product.id} productId={product.id} />
              </div>
              <div className="my-4 h-px w-full bg-background"></div>

              <div className="mb-6 space-y-4">
                {isVariableProduct && (
                  <div className="mb-6">
                    <ProductVariants
                      defaultVariantId={product.defaultVariantId ?? undefined}
                      variants={product.variants}
                      attributes={product.attributes}
                      productType={product.type}
                    />
                  </div>
                )}

                <ProductGuaranteeBadge />

                <div className="fixed bottom-3 right-3 left-3 rounded-2xl z-50 bg-white shadow-md">
                  <div className="flex justify-between items-center text-xs rtl flex-row-reverse h-[60px]">
                    <div className="flex justify-between items-center w-full">
                      <div className="w-1/2 p-3">
                        <AddToCartButtonMobile
                          key={product.id}
                          product={{
                            id: product.id,
                            name: product.name,
                            basePrice: product.basePrice ?? 0,
                            salePrice: product.salePrice ?? 0,
                            mainImageUrl: product.mainImage?.fileUrl ?? null,
                            type: product.type,
                          }}
                        />
                      </div>
                      <div className="p-2">
                        <PriceDisplay
                          product={{
                            type: product.type,
                            basePrice: product.basePrice ?? 0,
                            salePrice: product.salePrice,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsView;
