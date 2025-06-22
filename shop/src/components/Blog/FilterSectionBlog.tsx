import ResetFiltersBlog from './ResetFiltersBlog';
import SearchInputBlog from './SearchInputBlog';
import CategorySelectorBlog from './CategorySelectorBlog';

const FilterSectionBlog = () => {
  return (
    <div className="col-span-4 row-span-2 hidden md:block lg:col-span-3">
      <div className="sticky top-32 mb-4 overflow-hidden rounded-lg bg-muted shadow-base">
        <div dir="ltr" className="custom-scrollbar flex max-h-[calc(95vh_-_100px)] flex-col overflow-y-auto overflow-x-hidden px-4 py-3">
          <div dir="rtl">
            <ResetFiltersBlog />
            <ul className="space-y-6">
              <SearchInputBlog />
              <CategorySelectorBlog />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSectionBlog;
