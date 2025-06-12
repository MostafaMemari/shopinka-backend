import CategorySelector from '@/components/shopPage/FilterDesktop/CategorySelector';
import SearchInput from '@/components/shopPage/FilterDesktop/SearchInput';
import ResetFilters from '@/components/shopPage/FilterDesktop/ResetFilters';
import PriceSelector from '@/components/shopPage/PriceSelector';
import StockStatusFilter from '@/components/shopPage/FilterDesktop/StockStatusFilter';
import DiscountFilter from '@/components/shopPage/FilterDesktop/DiscountFilter';

const FilterSection = () => {
  return (
    <div className="col-span-4 row-span-2 hidden md:block lg:col-span-3">
      <div className="sticky top-32 mb-4 overflow-hidden rounded-lg bg-muted shadow-base">
        <div dir="ltr" className="custom-scrollbar flex max-h-[calc(95vh_-_100px)] flex-col overflow-y-auto overflow-x-hidden px-4 py-3">
          <div dir="rtl">
            <ResetFilters />
            <ul className="space-y-6">
              <SearchInput />
              <PriceSelector />
              <CategorySelector />
              {/* <BrandSelector /> */}
              {/* <AttributeSelector /> */}
              <StockStatusFilter />
              <DiscountFilter />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
