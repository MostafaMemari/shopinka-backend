import { getProducts } from '@/service/productService';
import { loadSearchParams } from '@/utils/loadSearchParams';
import { parseArrayParam } from '@/utils/parseArrayParam';
import { PRODUCT_SORT_OPTIONS, ProductParams } from '@/types/productType';
import { SearchParams } from 'nuqs';

import StockStatusFilter from '@/components/features/shopPage/FilterDesktop/StockStatusFilter';
import DiscountFilter from '@/components/features/shopPage/FilterDesktop/DiscountFilter';
import CategorySelector from '@/components/features/category/CategorySelector';
import SearchInput from '@/components/features/filter/SearchInput';
import PriceSelector from '@/components/features/shopPage/PriceSelector';
import SortBar from '@/components/features/filter/SortBar';
import MobileFilter from '@/components/features/filter/MobileFilter';
import MobileSortDrawer from '@/components/features/filter/MobileSortDrawer';
import ResetFilters from '@/components/features/filter/ResetFilters';
import { getCategories } from '@/service/categoryService';
import CategoryChildrenGrid from '@/components/features/category/CategoryChildrenGrid';
import CategoryHeaderSection from '@/components/features/category/CategoryHeaderSection';
import ProductListShop from '@/components/features/shopPage/ProductListShop';

type PageProps = {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string[] }>;
};

export default async function ShopPage({ searchParams, params }: PageProps) {
  const queryParams = await loadSearchParams(searchParams);
  const { slug } = await params;
  const lastSlug = slug[slug.length - 1];

  const query: ProductParams = {
    page: queryParams.page ?? 1,
    take: queryParams.perPage ?? 10,
    hasDiscount: queryParams.hasDiscount ?? undefined,
    categoryIds: parseArrayParam(queryParams.categoryIds ?? undefined),
    attributeValueIds: parseArrayParam(queryParams.attributeValueIds ?? undefined),
    minPrice: queryParams.minPrice ?? undefined,
    maxPrice: queryParams.maxPrice ?? undefined,
    stockStatus: queryParams.stockStatus === 'instock' ? 'instock' : 'all',
    search: queryParams.search,
    includeMainImage: true,
    includeVariants: true,
    sortBy:
      queryParams.sortBy && ['price_asc', 'price_desc', 'newest'].includes(queryParams.sortBy)
        ? (queryParams.sortBy as ProductParams['sortBy'])
        : undefined,
  };

  const { items } = await getCategories({
    type: 'PRODUCT',
    slug: lastSlug,
    includeOnlyTopLevel: false,
    includeThumbnailImage: true,
    includeChildren: true,
    childrenDepth: 3,
  });

  const category = items[0];

  const { items: products, pager } = await getProducts({ ...query, categoryIds: category ? [category.id] : [] });

  return (
    <>
      <CategoryChildrenGrid name={category.name} basePath={`product-category/${category.slug}`} categories={category.children} />

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
                <ResetFilters />
                <ul className="space-y-6">
                  <SearchInput />
                  <PriceSelector />
                  <CategorySelector title="فیلتر بر اساس دسته‌بندی" categories={category.children} />
                  <StockStatusFilter />
                  <DiscountFilter />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
          <SortBar options={PRODUCT_SORT_OPTIONS} queryKey="sortBy" />
          <ProductListShop
            initialProducts={products}
            initialQuery={{ ...query, categoryIds: category ? [category.id] : [] }}
            pager={pager}
          />
        </div>
      </div>

      <CategoryHeaderSection name={category.name} description={category.description || ''} thumbnailImage={category.thumbnailImage} />
    </>
  );
}
