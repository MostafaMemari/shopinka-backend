import { getStatusConfig } from '@/config/orderStatusConfig';
import { OrderStatus } from '@/types/orderType';
import { TransactionStatus } from '@/types/transactionType';
import { formatRemainingTime } from '@/utils/formatter';
import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';

interface OrderCardDetails {
  orderStatus: OrderStatus;
  transactionStatus: TransactionStatus;
  orderNumber: string;
  paymentOrder: number;
}

function OrderCardDetails({ orderStatus, transactionStatus, orderNumber, paymentOrder }: OrderCardDetails) {
  const config = getStatusConfig(orderStatus, transactionStatus);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-gray-100 dark:border-white/10">
        <div className={`flex items-center gap-x-2 ${config.headerColor}`}>
          {config.headerIcon}
          <span className="font-semibold text-base md:text-lg">{config.headerLabel}</span>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 xl:gap-8 py-4">
        <div className="flex-1 flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-x-8 md:gap-y-2">
          {orderStatus !== 'PENDING' && orderStatus !== 'CANCELLED' && '12:01' && (
            <Item label="زمان باقیمانده" value={<span className="text-red-500 dark:text-red-400">{formatRemainingTime('12:01')}</span>} />
          )}
          <Item label="شماره سفارش" value={orderNumber} />
          <Item
            label="مبلغ کل"
            value={
              <span className="text-primary font-bold">
                {paymentOrder}
                <span className="text-xs font-normal mx-1">تومان</span>
              </span>
            }
          />
        </div>

        {config.showProgress && (
          <div className="flex flex-col justify-center w-full min-w-[200px] max-w-xs mx-auto gap-3">
            <div className={`flex items-center gap-x-2 ${config.statusColor}`}>
              {config.statusIcon}
              <span className="text-sm font-medium md:text-base">
                {config.statusLabel}
                {(orderStatus === 'PENDING' || orderStatus === 'CANCELLED') && '12:02' ? `: ${formatRemainingTime('12:02')}` : ''}
              </span>
            </div>
            <div className="relative h-2 w-full rounded-full bg-gray-100 dark:bg-zinc-800 overflow-hidden">
              <span
                className={`absolute inset-y-0 right-0 rounded-full transition-all duration-300 ${config.progressColor}`}
                style={{ width: `${config.progress}%` }}
              />
            </div>
            <div className={`flex items-center justify-between text-xs md:text-sm ${config.statusColor} mt-1`}>
              <span>
                <span className="mr-1">تاریخ</span>
                {/* {order.statusDate || 'نامشخص'} */}
              </span>
              <span>
                <span className="mr-1">ساعت</span>
                {/* {order.statusTime || 'نامشخص'} */}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const Item = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center gap-x-2 text-xs md:text-sm w-full md:w-auto">
    <span className="text-gray-500 dark:text-text/60">{label}:</span>
    <span className="text-gray-700 dark:text-white font-medium">{value}</span>
  </div>
);

export default OrderCardDetails;
