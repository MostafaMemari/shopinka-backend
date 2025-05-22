'use client';

import { FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IOrder } from '@/lib/types/orders';
import { formatRemainingTime } from '@/utils/utils';
import { getStatusConfig } from '@/config/orderStatusConfig';
import ProductSlider from '../ProductSlider';

interface OrderCardProps {
  order: IOrder;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const config = getStatusConfig(order.status);

  return (
    <div className="rounded-lg border shadow-base mt-4">
      <Link
        href={order.status === 'pending' || order.status === 'canceled' ? '/profile-orders-detail-pending' : '/profile-orders-detail'}
        aria-label={`مشاهده جزئیات سفارش ${order.orderNumber}`}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-6">
            <div className={`flex items-center gap-x-2 ${config.headerColor}`}>
              {config.headerIcon}
              <p className="font-medium md:text-lg">{config.headerLabel}</p>
            </div>
            <FaChevronLeft className="h-6 w-6" aria-hidden="true" />
          </div>

          {/* Body */}
          <div className="flex flex-col gap-6 xl:flex-row xl:items-stretch xl:gap-8">
            {/* Order Details */}
            <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-8 flex-1">
              {order.status !== 'pending' && order.status !== 'canceled' && order.remainingTime && (
                <div className="flex items-center gap-x-2 w-full md:w-auto">
                  <div className="text-sm text-text/60 md:text-base">زمان باقیمانده</div>
                  <div className="text-sm text-red-500 dark:text-red-400 md:text-base">{formatRemainingTime(order.remainingTime)}</div>
                </div>
              )}
              <div className="flex items-center gap-x-2 w-full md:w-auto">
                <div className="text-sm text-text/60 md:text-base">شماره سفارش</div>
                <div className="text-sm text-text/90 md:text-base">{order.orderNumber}</div>
              </div>
              <div className="flex items-center gap-x-2 w-full md:w-auto">
                <div className="text-sm text-text/60 md:text-base">مبلغ کل</div>
                <div className="text-primary">
                  <span className="font-bold md:text-lg">{order.totalAmount}</span>
                  <span className="text-sm md:text-base"> تومان</span>
                </div>
              </div>
            </div>

            {/* Progress */}
            {config.showProgress && (
              <div className="flex flex-col justify-center w-80 max-[1379px]:w-full gap-y-4">
                <div className={`flex items-center gap-x-2 ${config.statusColor}`}>
                  {config.statusIcon}
                  <p className="text-sm font-medium md:text-base">
                    {config.statusLabel}{' '}
                    {(order.status === 'pending' || order.status === 'canceled') && order.remainingTime
                      ? `: ${formatRemainingTime(order.remainingTime)}`
                      : ''}
                  </p>
                </div>
                <div className="relative h-2 w-full rounded-full bg-background dark:bg-zinc-800">
                  <span
                    className={`absolute inset-y-0 right-0 rounded-full ${config.progressColor}`}
                    style={{ width: `${config.progress}%` }}
                  />
                </div>
                <div className={`flex items-center justify-between text-sm ${config.statusColor} md:text-base`}>
                  <span>
                    <span className="mr-1">تاریخ</span> {order.statusDate || 'نامشخص'}
                  </span>
                  <span>
                    <span className="mr-1">ساعت</span> {order.statusTime || 'نامشخص'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        {order?.products && <ProductSlider products={order.products} />}
      </Link>
    </div>
  );
};

export default OrderCard;
