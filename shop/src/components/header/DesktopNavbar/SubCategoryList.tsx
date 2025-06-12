// components/SubCategoryList.tsx
'use client';

import Link from 'next/link';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { Category } from '@/types/categoryType';

interface SubCategoryListProps {
  category: Category;
}

const SubCategoryList = ({ category }: SubCategoryListProps) => {
  return (
    <div className="p-5" dir="rtl">
      <div className="w-full">
        <div className="mb-4">
          <Link className="flex items-center gap-x-1 py-2 text-sm text-primary" href={category.slug}>
            <span>مشاهده همه {category.name}</span>
            <HiOutlineChevronLeft className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-x-8 gap-y-8">
          {category.children?.length ? (
            category.children.map((subCategory) => (
              <div key={subCategory.id} className="space-y-2">
                <Link className="flex items-center gap-x-2 text-sm font-medium hover:text-primary" href={subCategory.slug}>
                  <span className="h-5 w-0.5 rounded-full bg-primary dark:bg-primary"></span>
                  <span>{subCategory.name}</span>
                  <HiOutlineChevronLeft className="h-5 w-5" />
                </Link>
                {subCategory.children && (
                  <ul className="space-y-2">
                    {subCategory.children.map((subItem) => (
                      <li key={subItem.id}>
                        <Link className="block py-1 text-sm text-text/90 hover:text-primary" href={subItem.slug}>
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-3 text-sm text-neutral-500 my-5">
              محصولی برای <span className="text-primary font-bold">{category.name}</span> وجود ندارد.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryList;
