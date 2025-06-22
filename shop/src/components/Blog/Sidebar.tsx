import { FC } from 'react';
import RelatedPosts from './RelatedPosts';
import Categories from './Categories';
import { getBlogById, getBlogs } from '@/service/blogService';

interface SidebarProps {
  categoryId: number;
}

const Sidebar: FC<SidebarProps> = ({ categoryId }) => {
  const blogs = await getBlogs({});

  return (
    <div className="col-span-4 row-span-2 hidden md:block lg:col-span-3">
      <div className="sticky top-32 mb-4 overflow-hidden">
        <RelatedPosts />
        {/* <PopularPosts /> */}
        <Categories />
      </div>
    </div>
  );
};

export default Sidebar;
