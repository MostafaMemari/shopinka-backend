import { Category } from '@/types/categoryType';
import { cn } from '@/utils/utils';
import Link from 'next/link';
import { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';

interface AccordionState {
  [key: string]: boolean;
}

interface CategoryAccordionProps {
  categories: Category[];
  onItemClick: () => void;
}

const CategoryAccordion = ({ categories, onItemClick }: CategoryAccordionProps) => {
  const [accordionState, setAccordionState] = useState<AccordionState>({});

  const toggleAccordion = (key: string) => {
    setAccordionState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <ul className="space-y-2">
      {categories.map((category) => (
        <li key={category.id} className="relative">
          <div
            className="w-full cursor-pointer flex items-center justify-between gap-2 text-sm md:text-base pr-2 py-3 text-right"
            onClick={() => toggleAccordion(`category-${category.id}`)}
          >
            <span className="line-clamp-1">{category.name}</span>
            {category.subCategories?.length ? (
              <FiChevronRight
                className={cn(
                  'h-5 w-5 shrink-0 transition-transform duration-300',
                  accordionState[`category-${category.id}`] && 'rotate-90',
                )}
              />
            ) : null}
          </div>

          {category.subCategories?.length ? (
            <div
              className={cn(
                'relative overflow-hidden transition-all duration-300 pr-2',
                accordionState[`category-${category.id}`] ? 'max-h-[500px]' : 'max-h-0',
              )}
            >
              <ul className="pt-2 pr-2">
                {category.subCategories.map((subCategory) => (
                  <li key={subCategory.id} className="relative">
                    {subCategory.subItems?.length ? (
                      <>
                        <div
                          className="w-full cursor-pointer flex items-center justify-between gap-2 text-sm pr-2 py-3 text-right"
                          onClick={() => toggleAccordion(`subcategory-${subCategory.id}`)}
                        >
                          <span className="line-clamp-1">{subCategory.name}</span>
                          <FiChevronRight
                            className={cn(
                              'h-5 w-5 shrink-0 transition-transform duration-300',
                              accordionState[`subcategory-${subCategory.id}`] && 'rotate-90',
                            )}
                          />
                        </div>
                        <div
                          className={cn(
                            'relative overflow-hidden transition-all duration-300 pr-2',
                            accordionState[`subcategory-${subCategory.id}`] ? 'max-h-[500px]' : 'max-h-0',
                          )}
                        >
                          <ul className="pt-2 pr-2">
                            {subCategory.subItems.map((subItem) => (
                              <li key={subItem.id}>
                                <Link
                                  className="flex w-full items-center justify-between py-3 text-sm pr-4 hover:text-primary text-right"
                                  href={subItem.href}
                                  onClick={onItemClick}
                                >
                                  <span className="line-clamp-1">{subItem.name}</span>
                                  <FiChevronRight className="h-5 w-5 shrink-0" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <Link
                        className="flex w-full items-center justify-between py-3 text-sm pr-2 hover:text-primary text-right"
                        href={subCategory.href}
                        onClick={onItemClick}
                      >
                        <span className="line-clamp-1">{subCategory.name}</span>
                        {/* چون اینجا دیگه subItems نداره، آیکون نمیذاریم */}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default CategoryAccordion;
