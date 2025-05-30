'use client';

import MobileFilter from './MobileFilter';
import MobileSortDrawer from './MobileSortDrawer';

const MobileFilterSection = () => {
  return (
    <>
      <div className="mb-6 flex items-center justify-center gap-x-4 md:hidden">
        <MobileFilter />
        <MobileSortDrawer />
      </div>
    </>
  );
};

export default MobileFilterSection;
