import { HiOutlineAdjustments } from "react-icons/hi";

type Props = {
  onAddToCompare: () => void;
};

export default function CompareButton({ onAddToCompare }: Props) {
  return (
    <div className="relative group">
      <button
        type="button"
        onClick={onAddToCompare}
        className="text-gray-700 hover:text-yellow-500 dark:text-white transition-colors duration-200"
        aria-label="افزودن به لیست مقایسه"
      >
        <HiOutlineAdjustments className="h-6 w-6" />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden w-max rounded bg-zinc-900 px-3 py-1 text-sm text-white group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        افزودن به لیست مقایسه
      </div>
    </div>
  );
}
