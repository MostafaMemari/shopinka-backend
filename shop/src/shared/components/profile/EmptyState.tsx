import { FaBoxOpen } from 'react-icons/fa';

const EmptyState: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center gap-y-4 text-text/60">
        <FaBoxOpen className="h-20 w-20" />
        <p className="md:text-xl">لیست سفارش‌های شما خالی می‌باشد</p>
      </div>
    </div>
  );
};

export default EmptyState;
