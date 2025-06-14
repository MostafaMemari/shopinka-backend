import { FaShoppingBag, FaTruck, FaTimesCircle, FaUndo, FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';
import CardBox from '@/components/ui/CardBox';

interface OrderStatusSectionProps {
  currentOrders: number;
  deliveredOrders: number;
  canceledOrders: number;
  returnedOrders: number;
}

const statusConfig = [
  {
    key: 'current',
    title: 'فعلی',
    icon: <FaShoppingBag />,
    color: 'from-sky-400 via-sky-500 to-sky-600',
  },
  {
    key: 'delivered',
    title: 'تحویل شده',
    icon: <FaTruck />,
    color: 'from-green-400 via-emerald-500 to-emerald-600',
  },
  {
    key: 'canceled',
    title: 'لغو شده',
    icon: <FaTimesCircle />,
    color: 'from-rose-400 via-rose-500 to-red-500',
  },
  {
    key: 'returned',
    title: 'مرجوع شده',
    icon: <FaUndo />,
    color: 'from-yellow-400 via-yellow-500 to-amber-500',
  },
];

const getValue = (key: string, props: OrderStatusSectionProps) => {
  switch (key) {
    case 'current':
      return props.currentOrders;
    case 'delivered':
      return props.deliveredOrders;
    case 'canceled':
      return props.canceledOrders;
    case 'returned':
      return props.returnedOrders;
    default:
      return 0;
  }
};

const OrderStatusSection: React.FC<OrderStatusSectionProps> = (props) => (
  <section className="mb-10">
    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-white/10 mb-8">
      <h3 className="flex items-center gap-x-4 text-xl font-semibold text-gray-700 dark:text-white">
        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        وضعیت سفارش‌های شما
      </h3>
      <Link
        href="/profile-orders"
        className="flex items-center gap-2 rounded-xl px-4 py-2 border border-primary text-primary transition hover:bg-primary hover:text-white hover:shadow-lg duration-150"
      >
        مشاهده همه
        <FaChevronLeft className="h-5 w-5" />
      </Link>
    </div>
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {statusConfig.map((status) => (
        <CardBox key={status.key} icon={status.icon} color={status.color} title={status.title} value={getValue(status.key, props)} />
      ))}
    </div>
  </section>
);

export default OrderStatusSection;
