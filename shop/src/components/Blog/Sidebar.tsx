import { FC } from 'react';
import RelatedPosts from './RelatedPosts';
import { getBlogs } from '@/service/blogService';

interface SidebarProps {
  categoryIds: number[];
}

const Sidebar: FC<SidebarProps> = async ({ categoryIds }) => {
  const { pager, items } = await getBlogs({ categoryIds, includeMainImage: true, take: 5 });

  return (
    <div className="col-span-4 row-span-2 hidden md:block lg:col-span-3">
      <div className="sticky top-32 mb-4 overflow-hidden">
        <RelatedPosts postCount={pager.totalCount} posts={items} />
        {/* <Categories /> */}
      </div>
    </div>
  );
};

export default Sidebar;
