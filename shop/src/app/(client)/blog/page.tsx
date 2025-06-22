import { Suspense } from 'react';
import { loadSearchParams } from '@/utils/loadSearchParams';
import { SearchParams } from 'nuqs';
import SortBar from '@/components/shopPage/SortBar';
import MobileFilterSection from '@/components/shopPage/FilterMobile/MobileFilterSection';
import { getBlogs } from '@/service/blogService';
import { BlogParams } from '@/types/blogType';
import BlogListShopClient from '@/components/blog/BlogListClient';
import FilterSectionBlog from '@/components/blog/FilterSectionBlog';
import SortBarBlog from '@/components/blog/SortBarBlog';

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
      <MobileFilterSection totalCount={pager.totalCount} />
      <div className="grid grid-cols-12 grid-rows-[60px_min(500px,_1fr)] gap-4">
        <FilterSectionBlog />
        <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
          <SortBarBlog />
          <Suspense fallback={<div>Loading...</div>}>
            <BlogListShopClient query={query} initialBlogs={items || []} pager={pager} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
