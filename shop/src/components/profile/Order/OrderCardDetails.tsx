import { getStatusConfig } from '@/config/orderStatusConfig';
import { OrderStatus } from '@/types/orderType';
import { TransactionStatus } from '@/types/transactionType';
import { formatPrice, formatRemainingTime } from '@/utils/formatter';
import React from 'react';

interface OrderCardDetailsProps {
  orderStatus: OrderStatus;
  transactionStatus: TransactionStatus;
  orderNumber: string;
  paymentOrder: number;
  createdAt: string;
  updatedAt: string;
}

function OrderCardDetails({ orderStatus, transactionStatus, orderNumber, paymentOrder, createdAt, updatedAt }: OrderCardDetailsProps) {
  const config = getStatusConfig(orderStatus, transactionStatus);
  const remainingTime = orderStatus === 'PENDING' ? formatRemainingTime(createdAt) : null;

  return (
    <div className="mb-8 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm p-4">
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className={`flex items-center gap-2 ${config.headerColor}`}>
          {config.headerIcon}
          <span className="font-semibold text-base md:text-lg">{config.headerLabel}</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 py-4">
        <div className="flex-1 flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-x-6 md:gap-y-4">
          {remainingTime && (
            <Item label="زمان باقی‌مانده" value={<span className="text-red-500 dark:text-red-400">{remainingTime}</span>} />
          )}
          <Item label="شماره سفارش" value={orderNumber} />
          <Item
            label="مبلغ کل"
            value={
              <span className="text-primary-500 dark:text-primary-400 font-bold">
                {formatPrice(paymentOrder)}
                <span className="text-xs font-normal mr-1">تومان</span>
              </span>
            }
          />
          <Item label="تاریخ ثبت" value={new Date(createdAt).toLocaleDateString('fa-IR')} />
        </div>

        {config.showProgress && (
          <div className="flex flex-col justify-center w-full md:w-2/5 max-w-md mx-auto gap-3">
            <div className={`flex items-center gap-2 ${config.statusColor}`}>
              {config.statusIcon}
              <span className="text-sm font-semibold md:text-base">{config.statusLabel}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">{config.statusDescription}</p>
            <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`absolute inset-y-0 right-0 rounded-full transition-all duration-500 ${config.progressColor}`}
                style={{ width: `${config.progress}%` }}
              />
            </div>
            <div className={`flex justify-between text-xs md:text-sm ${config.statusColor}`}>
              <span>
                <span className="mr-1">تاریخ:</span>
                {new Date(updatedAt).toLocaleDateString('fa-IR')}
              </span>
              <span>
                <span className="mr-1">ساعت:</span>
                {new Date(updatedAt).toLocaleTimeString('fa-IR')}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const Item = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center gap-2 text-sm md:text-base">
    <span className="text-gray-500 dark:text-gray-400">{label}:</span>
    <span className="text-gray-800 dark:text-gray-200 font-medium">{value}</span>
  </div>
);

export default OrderCardDetails;
