import { ProductParams } from '@/Modules/product/types/productType';
import ProductsListLoading from '@/Modules/shopPage/components/ProductsListLoading';
import SortBar from '@/Modules/shopPage/components/SortBar';
import { loadSearchParams } from '@/Modules/shopPage/utils/loadSearchParams';
import FilterSection from '@/Modules/shopPage/views/FilterSection';
import ProductListShop from '@/Modules/shopPage/views/ProductListShop';
import { SearchParams } from 'next/dist/server/request/search-params';
import { Suspense } from 'react';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

function parseArrayParam(param: string | string[] | undefined): number[] | undefined {
  if (!param) return undefined;
  const str = Array.isArray(param) ? param[0] : param;
  return str.split(',').map(Number).filter(Boolean);
}

export default async function ShopPage({ searchParams }: PageProps) {
  const params = await loadSearchParams(searchParams);

  const query: ProductParams = {
    page: params.page ?? 1,
    take: params.perPage ?? params.take ?? 20,
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

  return (
    <div className="grid grid-cols-12 grid-rows-[60px_min(500px,_1fr)] gap-4">
      <FilterSection />
      <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
        <SortBar />

        <Suspense fallback={<ProductsListLoading />}>
          <ProductListShop params={query} />
        </Suspense>

        {/* <Pagination currentPage={10} totalPages={5} /> */}
      </div>
      {/* <MobileFilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilterChange={handleFilterChange}
        config={filterConfig}
      />
      <MobileSortDrawer isOpen={isSortOpen} onClose={() => setIsSortOpen(false)} onSortChange={handleSortChange} /> */}
    </div>
  );
}
