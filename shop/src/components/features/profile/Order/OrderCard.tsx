'use client';

import { FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getStatusConfig } from '@/config/orderStatusConfig';
import ProductSlider from '../ProductSlider';
import { formatRemainingTime, formatPrice } from '@/utils/formatter';
import { OrderItem } from '@/types/orderType';

interface OrderCardProps {
  order: OrderItem;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const config = getStatusConfig(order.status, order.transaction.status);
  const remainingTime = order.status === 'PENDING' && order.createdAt ? formatRemainingTime(order.createdAt) : null;

  return (
    <article className="rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 mt-6">
      <Link href={`/profile/orders/${order.id}`} aria-label={`مشاهده جزئیات سفارش ${order.orderNumber}`} className="block p-4">
        <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
          <div className={`flex items-center gap-2 ${config.headerColor}`}>
            {config.headerIcon}
            <span className="font-semibold text-base md:text-lg">{config.headerLabel}</span>
          </div>
          <FaChevronLeft className="h-5 w-5 text-gray-400 dark:text-gray-300 hover:text-primary-500 transition-colors" aria-hidden="true" />
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-x-6 md:gap-y-4">
            {remainingTime && (
              <Item label="زمان باقی‌مانده" value={<span className="text-red-500 dark:text-red-400">{remainingTime}</span>} />
            )}
            <Item label="شماره سفارش" value={order.orderNumber} />
            <Item
              label="مبلغ کل"
              value={
                <span className="text-primary-500 dark:text-primary-400 font-bold">
                  {formatPrice(order.totalPrice)}
                  <span className="text-xs font-normal mr-1">تومان</span>
                </span>
              }
            />
            <Item label="تاریخ ثبت" value={new Date(order.createdAt).toLocaleDateString('fa-IR')} />
          </div>

          <div className="flex flex-col justify-center w-full md:w-2/5 max-w-md mx-auto gap-3">
            <div className={`flex items-center gap-2 ${config.statusColor}`}>
              {config.statusIcon}
              <span className="text-sm font-semibold md:text-base">{config.statusLabel}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">{config.statusDescription}</p>
            {config.showProgress && (
              <>
                <div className="relative h-2px bg-gray-200 dark:bg-gray-200 dark rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 right-0 rounded-full transition-all duration-500 ${config.progressColor}`}
                    style={{ width: `${config.progress}%` }}
                  />
                </div>
                <div className={`flex justify-between text-xs md:text-sm ${config.statusColor}`}>
                  <span>
                    <span className="mr-1">تاریخ: </span>
                    {new Date(order.updatedAt).toLocaleDateString('fa-IR') || 'نامشخص'}
                  </span>
                  <span>
                    <span className="mr-1">ساعت: </span>
                    {new Date(order.updatedAt).toLocaleTimeString('fa-IR') || 'نامشخص'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </Link>

      {order.items?.length > 0 && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-4">
          <ProductSlider orderProductItems={order.items} />
        </div>
      )}
    </article>
  );
};

const Item = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center gap-2 text-sm md:text-base">
    <span className="text-gray-500 dark:text-gray-400">{label}:</span>
    <span className="text-gray-800 dark:text-gray-200 font-medium">{value}</span>
  </div>
);

export default OrderCard;
