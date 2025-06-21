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
  statusLabel: string;
  statusDescription: string;
  statusIcon: React.ReactElement;
  statusColor: string;
  progressColor: string;
}

export const getStatusConfig = (orderStatus: OrderStatus, transactionStatus: TransactionStatus): StatusConfig => {
  const transactionConfig = {
    SUCCESS: {
      headerLabel: 'پرداخت موفق',
      headerColor: 'text-green-500',
      headerIcon: React.createElement(FaCheckCircle, { className: 'h-6 w-6' }),
    },
    FAILED: {
      headerLabel: 'پرداخت ناموفق',
      headerColor: 'text-red-500',
      headerIcon: React.createElement(FaExclamationTriangle, { className: 'h-6 w-6' }),
    },
    PENDING: {
      headerLabel: 'در انتظار پرداخت',
      headerColor: 'text-yellow-500',
      headerIcon: React.createElement(FaClock, { className: 'h-6 w-6' }),
    },
    REFUNDED: {
      headerLabel: 'مبلغ برگشت داده شده',
      headerColor: 'text-orange-500',
      headerIcon: React.createElement(FaCheckCircle, { className: 'h-6 w-6' }),
    },
  };

  const { headerLabel, headerColor, headerIcon } = transactionConfig[transactionStatus];

  // Order status configurations
  const orderStatusConfig: Record<OrderStatus, Omit<StatusConfig, 'headerLabel' | 'headerColor' | 'headerIcon'>> = {
    PENDING: {
      showProgress: true,
      progress: 10,
      statusLabel: 'در انتظار تأیید',
      statusDescription: 'سفارش شما ثبت شده و در انتظار تأیید پرداخت است.',
      statusIcon: React.createElement(FaClock, { className: 'h-5 w-5 md:h-6 md:w-6' }),
      statusColor: 'text-yellow-500',
      progressColor: 'bg-yellow-500',
    },
    PROCESSING: {
      showProgress: true,
      progress: 50,
      statusLabel: 'در حال پردازش',
      statusDescription: 'سفارش شما در حال آماده‌سازی برای ارسال است.',
      statusIcon: React.createElement(FaBoxOpen, { className: 'h-5 w-5 md:h-6 md:w-6' }),
      statusColor: 'text-blue-500',
      progressColor: 'bg-blue-500',
    },
    SHIPPED: {
      showProgress: true,
      progress: 80,
      statusLabel: 'ارسال شده',
      statusDescription: 'سفارش شما ارسال شده و در حال حمل است.',
      statusIcon: React.createElement(FaTruck, { className: 'h-5 w-5 md:h-6 md:w-6' }),
      statusColor: 'text-indigo-500',
      progressColor: 'bg-indigo-500',
    },
    CANCELLED: {
      showProgress: true,
      progress: 0,
      statusLabel: 'لغو شده',
      statusDescription: 'سفارش شما لغو شده است.',
      statusIcon: React.createElement(FaTimes, { className: 'h-5 w-5 md:h-6 md:w-6' }),
      statusColor: 'text-red-500',
      progressColor: 'bg-red-500',
    },
  };

  return {
    headerLabel,
    headerColor,
    headerIcon,
    ...orderStatusConfig[orderStatus],
  };
};
