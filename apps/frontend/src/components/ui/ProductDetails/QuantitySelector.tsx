import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

interface props {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const QuantitySelector = ({ quantity, onIncrement, onDecrement }: props) => (
  <>
    <div className="mb-4 block lg:hidden">انتخاب تعداد</div>

    <div className="flex h-12 w-32 items-center justify-between rounded-lg border px-4 py-1">
      <button type="button" onClick={onIncrement}>
        <span className="h-6 w-6 text-primary cursor-pointer">
          <HiOutlinePlus />
        </span>
      </button>
      <input
        value={quantity}
        disabled
        type="number"
        className="flex h-6 w-6 select-none items-center justify-center bg-transparent text-center outline-none"
      />
      <button type="button" onClick={onDecrement}>
        <span className="h-6 w-6 text-red-600 dark:text-red-500 cursor-pointer">
          <HiOutlineMinus />
        </span>
      </button>
    </div>
  </>
);
