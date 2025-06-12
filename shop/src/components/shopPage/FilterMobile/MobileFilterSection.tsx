'use client';

import MobileFilter from './MobileFilter';
import MobileSortDrawer from './MobileSortDrawer';

interface MobileFilterSectionProps {
  totalCount: number;
}

const MobileFilterSection = ({ totalCount }: MobileFilterSectionProps) => {
  return (
    <>
      <div className="mb-6 flex items-center justify-center gap-x-4 md:hidden">
        <MobileFilter totalCount={totalCount} />
        <MobileSortDrawer />
      </div>
    </>
  );
};

export default MobileFilterSection;
