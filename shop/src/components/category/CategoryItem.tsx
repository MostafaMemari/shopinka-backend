import { Category } from '@/types/categoryType';

interface Props {
  category: Category;
  isSelected: boolean;
  onToggle: () => void;
}

const CategoryItem: React.FC<Props> = ({ category, isSelected, onToggle }) => {
  return (
    <li>
      <div
        className={`flex items-center gap-2 px-2 py-1 cursor-pointer rounded transition-colors ${
          isSelected ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 text-gray-700'
        }`}
        onClick={onToggle}
      >
        <div
          className={`w-5 h-5 rounded border flex items-center justify-center transition ${
            isSelected ? 'bg-primary border-primary' : 'bg-white border-gray-300'
          }`}
        >
          {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
        </div>
        <span className={`text-sm ${isSelected ? 'font-semibold' : ''}`}>{category.name}</span>
      </div>
    </li>
  );
};

export default CategoryItem;
