'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { Category } from '@/types/categoryType';
import SubCategoryList from './SubCategoryList';
import { useIsMounted } from '@/hooks/useIsMounted';

interface CategoryMenuProps {
  categories: Category[];
}

const CategoryMenu = ({ categories }: CategoryMenuProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isMounted = useIsMounted();

  const selectedCategory = useMemo(
    () => categories.find((cat) => cat.id === selectedCategoryId) || categories[0],
    [categories, selectedCategoryId],
  );

  if (!categories.length || !isMounted) return null;

  const handleMouseEnter = () => {
    setSelectedCategoryId(categories[0]?.id ?? null);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    setSelectedCategoryId(null);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="flex cursor-pointer items-center gap-x-2 pt-2 mb-2">
        <HiOutlineMenu className="h-5 w-5 text-neutral-600 dark:text-white" />
        <span className="font-medium text-sm text-neutral-600 dark:text-white ml-2">دسته‌بندی‌ها</span>
        <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-500 ${isOpen ? 'w-full' : 'w-0'}`} />
      </div>

      {isOpen && (
        <div className="absolute right-0 top-full z-20 bg-muted shadow-base rounded-b-lg w-[800px] transition-all duration-300">
          <div className="flex h-[450px] max-h-[450px] w-full overflow-hidden rounded-b-lg pt-0.5">
            <div className="w-48 bg-background overflow-y-auto main-scroll">
              <ul dir="rtl">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/product-category/${category.slug}`}
                      className={`flex py-4 pr-4 text-sm ${
                        category.id === selectedCategoryId
                          ? 'text-primary font-bold bg-white dark:bg-neutral-900'
                          : 'text-neutral-600 dark:text-neutral-100 hover:text-primary hover:bg-white dark:hover:bg-neutral-900'
                      }`}
                      onMouseEnter={() => setSelectedCategoryId(category.id)}
                      onClick={() => setIsOpen(false)}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 overflow-auto main-scroll">
              {selectedCategory && <SubCategoryList category={selectedCategory} onLinkClick={() => setIsOpen(false)} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryMenu;
