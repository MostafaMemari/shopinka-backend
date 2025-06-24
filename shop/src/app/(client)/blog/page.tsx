import { Suspense } from 'react';
import { loadSearchParams } from '@/utils/loadSearchParams';
import { SearchParams } from 'nuqs';
import { getBlogs } from '@/service/blogService';
import { BLOG_SORT_OPTIONS, BlogParams } from '@/types/blogType';

import SearchInput from '@/components/filter/SearchInput';
import CategorySelector from '@/components/category/CategorySelector';
import SortBar from '@/components/filter/SortBar';
import MobileFilter from '@/components/filter/MobileFilter';
import ResetFilters from '@/components/filter/ResetFilters';
import MobileSort from '@/components/filter/MobileSort';
import BlogListShopClient from '@/components/Blog/BlogListClient';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function ShopPage({ searchParams }: PageProps) {
  const params = await loadSearchParams(searchParams);

  const query: BlogParams = {
    page: params.page ?? 1,
    take: params.perPage ?? 20,
    search: params.search ?? '',
    includeMainImage: params.includeMainImage ?? false,
    sortBy: params.sortBy && ['updatedAt'].includes(params.sortBy) ? (params.sortBy as BlogParams['sortBy']) : undefined,
  };

  const { items, pager } = await getBlogs(query);

  return (
    <>
      <div className="mb-6 flex items-center justify-center gap-x-4 md:hidden">
        <MobileFilter totalCount={pager.totalCount} type="BLOG" />
        <MobileSort options={BLOG_SORT_OPTIONS} queryKey="sortBy" />
      </div>
      <div className="grid grid-cols-12 grid-rows-[60px_min(500px,_1fr)] gap-4">
        <div className="col-span-4 row-span-2 hidden md:block lg:col-span-3">
          <div className="sticky top-32 mb-4 overflow-hidden rounded-lg bg-muted shadow-base">
            <div
              dir="ltr"
              className="custom-scrollbar flex max-h-[calc(95vh_-_100px)] flex-col overflow-y-auto overflow-x-hidden px-4 py-3"
            >
              <div dir="rtl">
                <ResetFilters resetPath="/blog" />
                <ul className="space-y-6">
                  <SearchInput />
                  {/* <CategorySelector title="فیلتر بر اساس دسته‌بندی" /> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
          <SortBar options={BLOG_SORT_OPTIONS} queryKey="sortBy" />
          <Suspense fallback={<div>Loading...</div>}>
            <BlogListShopClient query={query} initialBlogs={items || []} pager={pager} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
