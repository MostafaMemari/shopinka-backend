import { Suspense } from 'react';
import ProductListShopClient from '@/components/shopPage/views/ProductListShopClient';
import { getProducts } from '@/service/productService';
import { loadSearchParams } from '@/utils/loadSearchParams';
import { parseArrayParam } from '@/utils/parseArrayParam';
import { PRODUCT_SORT_OPTIONS, ProductParams } from '@/types/productType';
import { SearchParams } from 'nuqs';

import StockStatusFilter from '@/components/shopPage/FilterDesktop/StockStatusFilter';
import DiscountFilter from '@/components/shopPage/FilterDesktop/DiscountFilter';
import CategorySelector from '@/components/category/CategorySelector';
import SearchInput from '@/components/filter/SearchInput';
import PriceSelector from '@/components/shopPage/PriceSelector';
import SortBar from '@/components/filter/SortBar';
import MobileFilter from '@/components/filter/MobileFilter';
import MobileSortDrawer from '@/components/filter/MobileSortDrawer';
import ResetFilters from '@/components/filter/ResetFilters';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function ShopPage({ searchParams }: PageProps) {
  const params = await loadSearchParams(searchParams);

  const query: ProductParams = {
    page: params.page ?? 1,
    take: params.perPage ?? 20,
    hasDiscount: params.hasDiscount ?? undefined,
    categoryIds: parseArrayParam(params.categoryIds ?? undefined),
    attributeValueIds: parseArrayParam(params.attributeValueIds ?? undefined),
    minPrice: params.minPrice ?? undefined,
    maxPrice: params.maxPrice ?? undefined,
    stockStatus: params.stockStatus === 'instock' ? 'instock' : 'all',
    search: params.search,
    includeMainImage: params.includeMainImage ?? false,
    includeVariants: params.includeVariants ?? false,
    sortBy:
      params.sortBy && ['price_asc', 'price_desc', 'newest'].includes(params.sortBy)
        ? (params.sortBy as ProductParams['sortBy'])
        : undefined,
  };

  const { items, pager } = await getProducts(query);

  return (
    <>
      <div className="mb-6 flex items-center justify-center gap-x-4 md:hidden">
        <MobileFilter totalCount={pager.totalCount} type="SHOP" />
        <MobileSortDrawer />
      </div>
      <div className="grid grid-cols-12 grid-rows-[60px_min(500px,_1fr)] gap-4">
        <div className="col-span-4 row-span-2 hidden md:block lg:col-span-3">
          <div className="sticky top-32 mb-4 overflow-hidden rounded-lg bg-muted shadow-base">
            <div
              dir="ltr"
              className="custom-scrollbar flex max-h-[calc(95vh_-_100px)] flex-col overflow-y-auto overflow-x-hidden px-4 py-3"
            >
              <div dir="rtl">
                <ResetFilters resetPath="/shop" />
                <ul className="space-y-6">
                  <SearchInput />
                  <PriceSelector />
                  <CategorySelector type="SHOP" title="فیلتر بر اساس دسته‌بندی" />
                  <StockStatusFilter />
                  <DiscountFilter />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
          <SortBar options={PRODUCT_SORT_OPTIONS} queryKey="sortBy" />
          <Suspense fallback={<div>Loading...</div>}>
            <ProductListShopClient query={query} initialProducts={items || []} pager={pager} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
