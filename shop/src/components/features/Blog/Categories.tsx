import { FC } from 'react';
import { BiChevronLeft } from 'react-icons/bi';

const Categories: FC = () => {
  const categories = ['دسته بندی اول', 'دسته بندی دوم', 'دسته بندی سوم', 'دسته بندی چهارم'];

  return (
    <div className="mb-8 rounded-lg bg-muted px-2 py-3 shadow-base xl:px-4">
      <p className="mb-4 text-center text-sm font-medium xl:text-base">دسته‌بندی ها</p>
      <ul className="space-y-4">
        {categories.map((category, index) => (
          <li key={index}>
            <a href="#" className="group py-2">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-x-2 text-sm text-text/90 transition-all duration-200 group-hover: xl:text-base">
                  <BiChevronLeft className="h-4 w-4" />
                  {category}
                </p>
                <div className="w-6 rounded-lg bg-primary py-px text-center text-sm font-medium text-white dark:bg-emerald-600">20</div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
