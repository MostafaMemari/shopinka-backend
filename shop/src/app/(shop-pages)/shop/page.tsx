import { Suspense } from 'react';
import ProductListShopClient from '@/Modules/shopPage/views/ProductListShopClient';
import { getProducts } from '@/Modules/product/services/productService';
import { loadSearchParams } from '@/Modules/shopPage/utils/loadSearchParams';
import { parseArrayParam } from '@/Modules/shopPage/utils/parseArrayParam';
import { ProductParams } from '@/Modules/product/types/productType';
import { SearchParams } from 'nuqs';
import SortBar from '@/Modules/shopPage/components/SortBar';
import FilterSection from '@/Modules/shopPage/views/FilterSection';
import MobileSortDrawer from '@/Modules/shopPage/components/FilterMobile/MobileSortDrawer';
import MobileFilterDrawer from '@/Modules/shopPage/components/FilterMobile/MobileFilterDrawer';
import MobileFilterSection from '@/Modules/shopPage/views/MobileFilterSection';

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
    <div className="grid grid-cols-12 grid-rows-[60px_min(500px,_1fr)] gap-4">
      <FilterSection />
      <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
        <SortBar />
        <Suspense fallback={<div>Loading...</div>}>
          <ProductListShopClient query={query} initialProducts={items || []} pager={pager} />
        </Suspense>
      </div>
    </div>
  );
}
