import { Category } from '@/Modules/category/types/categoryType';

interface Props {
  category: Category;
  isSelected: boolean;
  onToggle: () => void;
}

function CategoryItem({ category, isSelected, onToggle }: Props) {
  return (
    <li>
      <div className="flex items-center gap-x-3 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span onClick={onToggle} className="flex-1 text-sm text-gray-700 hover:text-blue-600 cursor-pointer">
          {category.name}
        </span>
      </div>
    </li>
  );
}

export default CategoryItem;
