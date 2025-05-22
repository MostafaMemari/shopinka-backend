import { FaShoppingBag, FaTruck, FaTimesCircle, FaUndo, FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';

interface OrderStatusSectionProps {
  currentOrders: number;
  deliveredOrders: number;
  canceledOrders: number;
  returnedOrders: number;
}

const OrderStatusSection: React.FC<OrderStatusSectionProps> = ({ currentOrders, deliveredOrders, canceledOrders, returnedOrders }) => (
  <div className="mb-8">
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <h3 className="flex items-center gap-x-4 text-lg text-text/90">
        <span className="h-2 w-2 rounded-full bg-primary" />
        وضعیت سفارش های شما
      </h3>
      <Link href="/profile-orders" className="btn-primary-nobg text-base">
        مشاهده همه
        <FaChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
      </Link>
    </div>
    <div className="grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-4">
      <div className="flex flex-col items-center gap-4 rounded-base bg-sky-500 p-2 dark:bg-sky-600 md:flex-row">
        <div className="relative rounded-base bg-sky-600/50 p-2 dark:bg-sky-500/50">
          <FaShoppingBag className="h-10 w-10 text-white" />
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-sm font-medium text-white dark:bg-sky-500 md:hidden">
            {currentOrders}
          </span>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="hidden font-medium text-white md:block">{currentOrders} سفارش</div>
          <div className="text-white">فعلی</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 rounded-base bg-primary p-2 dark:bg-emerald-600 md:flex-row">
        <div className="relative rounded-base bg-emerald-600/50 p-2 dark:bg-primary/50">
          <FaTruck className="h-10 w-10 text-white" />
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-sm font-medium text-white dark:bg-primary md:hidden">
            {deliveredOrders}
          </span>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="hidden font-medium text-white md:block">{deliveredOrders} سفارش</div>
          <div className="text-white">تحویل شده</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 rounded-base bg-warning p-2 dark:bg-red-400 md:flex-row">
        <div className="relative rounded-base bg-red-400/50 p-2">
          <FaTimesCircle className="h-10 w-10 text-white" />
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-400 text-sm font-medium text-white md:hidden">
            {canceledOrders}
          </span>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="hidden font-medium text-white md:block">{canceledOrders} سفارش</div>
          <div className="text-white">لغو شده</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 rounded-base bg-yellow-500 p-2 dark:bg-yellow-600 md:flex-row">
        <div className="relative rounded-base bg-yellow-600/50 p-2 dark:bg-yellow-500/50">
          <FaUndo className="h-10 w-10 text-white" />
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-600 text-sm font-medium text-white dark:bg-yellow-500 md:hidden">
            {returnedOrders}
          </span>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="hidden font-medium text-white md:block">{returnedOrders} سفارش</div>
          <div className="text-white">مرجوع شده</div>
        </div>
      </div>
    </div>
  </div>
);

export default OrderStatusSection;
