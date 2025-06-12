import { Category } from '@/types/categoryType';

interface Props {
  category: Category;
  isSelected: boolean;
  onToggle: () => void;
}

function CategoryItem({ category, isSelected, onToggle }: Props) {
  return (
    <li>
      <div
        className={`
      flex items-center gap-x-3 rounded-lg px-2 py-2 transition-colors cursor-pointer
      ${isSelected ? 'bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]' : 'hover:bg-gray-100 text-gray-700'}
    `}
        onClick={onToggle}
      >
        {/* Hidden real checkbox */}
        <input type="checkbox" checked={isSelected} onChange={onToggle} className="sr-only" />

        {/* Custom checkbox UI */}
        <div
          className={`
        w-5 h-5 flex items-center justify-center rounded border 
        transition-colors duration-200 
        ${isSelected ? 'bg-[hsl(var(--primary))] border-[hsl(var(--primary))]' : 'bg-white border-gray-300'}
      `}
        >
          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
        </div>

        {/* Category name */}
        <span
          className={`
        flex-1 text-sm transition-colors
        ${isSelected ? 'text-[hsl(var(--primary))] font-medium' : 'hover:text-[hsl(var(--primary))]'}
      `}
        >
          {category.name}
        </span>
      </div>
    </li>
  );
}

export default CategoryItem;
