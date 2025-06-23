'use client';

import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BlogItem, BlogParams } from '@/types/blogType';
import { getBlogs } from '@/service/blogService';
import LoadingDots from '@/components/shopPage/LoadingDots';
import { Pager } from '@/types/pagerType';
import BlogListShop from '../Blog/BlogListShop';

interface Props {
  query: BlogParams;
  initialBlogs: BlogItem[];
  pager?: Pager;
}

export default function BlogListShopClient({ query, initialBlogs, pager }: Props) {
  const [blogs, setBlogs] = useState<BlogItem[]>(initialBlogs);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const MAX_PAGES = 10;

  useEffect(() => {
    setBlogs(initialBlogs);
    setPage(1);
    setHasMore((pager?.hasNextPage ?? false) && initialBlogs.length === (query.take ?? 10) && (pager?.currentPage ?? 1) < MAX_PAGES);
  }, [query.categoryIds?.toString(), query.search, query.sortBy, initialBlogs, pager, query.take]);

  const fetchMoreData = async () => {
    if (isLoading || page >= MAX_PAGES) {
      setHasMore(false);
      return;
    }

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const { items, pager: newPager } = await getBlogs({ ...query, page: nextPage });
      setBlogs((prev) => [...prev, ...items]);
      setPage(nextPage);
      setHasMore((newPager?.hasNextPage ?? false) && items.length === (query.take ?? 10) && nextPage < MAX_PAGES);
    } catch (error) {
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <InfiniteScroll
      style={{ overflow: 'hidden' }}
      dataLength={blogs.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={blogs.length > 0 ? <LoadingDots /> : null}
      endMessage={
        blogs.length > 0 ? (
          <div className="flex justify-center items-center py-8 animate-fadeIn">
            <div className="text-center">
              <p className="text-lg font-medium text-gray-600 dark:text-gray-300">تمامی بلاگ ها نمایش داده شدند</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">بلاگ ها بیشتری در حال حاضر موجود نیست.</p>
            </div>
          </div>
        ) : null
      }
    >
      <BlogListShop blogs={blogs} isLoading={isLoading && blogs.length === 0} />
    </InfiniteScroll>
  );
}
