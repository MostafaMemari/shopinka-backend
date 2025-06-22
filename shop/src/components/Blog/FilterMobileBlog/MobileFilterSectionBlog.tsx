'use client';

import MobileFilter from './MobileFilterBlog';
import MobileSortDrawer from './MobileSortDrawerBlog';

interface MobileFilterSectionBlogProps {
  totalCount: number;
}

const MobileFilterSectionBlog = ({ totalCount }: MobileFilterSectionBlogProps) => {
  return (
    <>
      <div className="mb-6 flex items-center justify-center gap-x-4 md:hidden">
        <MobileFilter totalCount={totalCount} />
        <MobileSortDrawer />
      </div>
    </>
  );
};

export default MobileFilterSectionBlog;
