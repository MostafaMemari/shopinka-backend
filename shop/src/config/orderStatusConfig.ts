import { OrderStatus } from '@/types/orderType';
import { TransactionStatus } from '@/types/transactionType';
import React from 'react';
import { FaExclamationTriangle, FaCheckCircle, FaTruck, FaBoxOpen, FaClock, FaTimes } from 'react-icons/fa';

interface StatusConfig {
  headerLabel: string;
  headerColor: string;
  headerIcon: React.ReactElement;
  showProgress: boolean;
  progress: number;
  statusLabel?: string;
  statusIcon?: React.ReactElement;
  statusColor?: string;
  progressColor?: string;
}

export const getStatusConfig = (orderStatus: OrderStatus, transactionStatus: TransactionStatus): StatusConfig => {
  const headerLabel =
    transactionStatus === 'SUCCESS'
      ? 'پرداخت شده'
      : transactionStatus === 'FAILED'
        ? 'پرداخت ناموفق'
        : transactionStatus === 'PENDING'
          ? 'در انتظار پرداخت'
          : transactionStatus === 'REFUNDED'
            ? 'برگشت داده شده'
            : '';
  const headerColor =
    transactionStatus === 'SUCCESS'
      ? 'text-green-500'
      : transactionStatus === 'FAILED'
        ? 'text-red-500'
        : transactionStatus === 'PENDING'
          ? 'text-yellow-500'
          : transactionStatus === 'REFUNDED'
            ? 'text-yellow-500'
            : '';

  const headerIcon =
    transactionStatus === 'SUCCESS'
      ? React.createElement(FaExclamationTriangle, { className: 'h-6 w-6' })
      : transactionStatus === 'FAILED'
        ? React.createElement(FaCheckCircle, { className: 'h-6 w-6' })
        : transactionStatus === 'PENDING'
          ? React.createElement(FaExclamationTriangle, { className: 'h-6 w-6' })
          : transactionStatus === 'REFUNDED'
            ? React.createElement(FaCheckCircle, { className: 'h-6 w-6' })
            : React.createElement(FaCheckCircle, { className: 'h-6 w-6' });

  switch (orderStatus) {
    case 'PENDING':
      return {
        headerLabel,
        headerColor,
        headerIcon,
        showProgress: true,
        progress: 0,
        statusLabel: 'زمان باقی مانده',
        statusIcon: React.createElement(FaClock, { className: 'h-5 w-5 md:h-6 md:w-6' }),
        statusColor: 'text-yellow-500',
        progressColor: 'bg-yellow-500',
      };
    case 'CANCELLED':
      return {
        headerLabel,
        headerColor,
        headerIcon,
        showProgress: true,
        progress: 0,
        statusLabel: 'لغو شده',
        statusIcon: React.createElement(FaTimes, { className: 'h-5 w-5 md:h-6 md:w-6' }),
        statusColor: 'text-red-500',
        progressColor: 'bg-red-500',
      };
    // case 'paid':
    // case 'awaiting-confirmation':
    //   return {
    //     headerLabel,
    //     headerColor,
    //     headerIcon,
    //     showProgress: true,
    //     progress: 20,
    //     statusLabel: 'در انتظار تایید',
    //     statusIcon: React.createElement(FaHourglassHalf, { className: 'h-5 w-5 md:h-6 md:w-6' }),
    //     statusColor: 'text-orange-500 dark:text-orange-400',
    //     progressColor: 'bg-orange-500 dark:bg-orange-400',
    //   };
    // case 'processing':
    //   return {
    //     headerLabel,
    //     headerColor,
    //     headerIcon,
    //     showProgress: true,
    //     progress: 50,
    //     statusLabel: 'در حال پردازش',
    //     statusIcon: React.createElement(FaCog, { className: 'h-5 w-5 md:h-6 md:w-6' }),
    //     statusColor: 'text-yellow-500',
    //     progressColor: 'bg-yellow-500 dark:bg-yellow-400',
    //   };
    case 'SHIPPED':
      return {
        headerLabel,
        headerColor,
        headerIcon,
        showProgress: true,
        progress: 80,
        statusLabel: 'ارسال شده',
        statusIcon: React.createElement(FaTruck, { className: 'h-5 w-5 md:h-6 md:w-6' }),
        statusColor: 'text-blue-500',
        progressColor: 'bg-blue-500',
      };
    case 'PROCESSING':
      return {
        headerLabel,
        headerColor,
        headerIcon,
        showProgress: true,
        progress: 100,
        statusLabel: 'تحویل شده',
        statusIcon: React.createElement(FaBoxOpen, { className: 'h-5 w-5 md:h-6 md:w-6' }),
        statusColor: 'text-green-600',
        progressColor: 'bg-green-600',
      };
  }
};
