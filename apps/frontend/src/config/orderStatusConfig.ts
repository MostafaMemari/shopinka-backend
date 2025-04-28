import React from "react";
import { FaExclamationTriangle, FaCheckCircle, FaHourglassHalf, FaCog, FaTruck, FaBoxOpen, FaClock, FaTimes } from "react-icons/fa";

export type OrderStatus = "pending" | "paid" | "awaiting-confirmation" | "processing" | "shipped" | "delivered" | "canceled";

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

export const getStatusConfig = (status: OrderStatus): StatusConfig => {
  const isPendingOrCanceled = status === "pending" || status === "canceled";
  const headerLabel = isPendingOrCanceled ? "در انتظار پرداخت" : "پرداخت شده";
  const headerColor = isPendingOrCanceled ? "text-yellow-500 dark:text-yellow-400" : "text-green-500 dark:text-green-400";
  const headerIcon = isPendingOrCanceled
    ? React.createElement(FaExclamationTriangle, { className: "h-6 w-6" })
    : React.createElement(FaCheckCircle, { className: "h-6 w-6" });

  switch (status) {
    case "pending":
      return {
        headerLabel,
        headerColor,
        headerIcon,
        showProgress: true,
        progress: 0,
        statusLabel: "زمان باقی مانده",
        statusIcon: React.createElement(FaClock, { className: "h-5 w-5 md:h-6 md:w-6" }),
        statusColor: "text-yellow-500 dark:text-yellow-400",
        progressColor: "bg-yellow-500 dark:bg-yellow-400",
      };
    case "canceled":
      return {
        headerLabel,
        headerColor,
        headerIcon,
        showProgress: true,
        progress: 0,
        statusLabel: "لغو شده",
        statusIcon: React.createElement(FaTimes, { className: "h-5 w-5 md:h-6 md:w-6" }),
        statusColor: "text-red-500 dark:text-red-400",
        progressColor: "bg-red-500 dark:bg-red-400",
      };
    case "paid":
    case "awaiting-confirmation":
      return {
        headerLabel,
        headerColor,
        headerIcon,
        showProgress: true,
        progress: 20,
        statusLabel: "در انتظار تایید",
        statusIcon: React.createElement(FaHourglassHalf, { className: "h-5 w-5 md:h-6 md:w-6" }),
        statusColor: "text-orange-500 dark:text-orange-400",
        progressColor: "bg-orange-500 dark:bg-orange-400",
      };
    case "processing":
      return {
        headerLabel,
        headerColor,
        headerIcon,
        showProgress: true,
        progress: 50,
        statusLabel: "در حال پردازش",
        statusIcon: React.createElement(FaCog, { className: "h-5 w-5 md:h-6 md:w-6" }),
        statusColor: "text-yellow-500 dark:text-yellow-400",
        progressColor: "bg-yellow-500 dark:bg-yellow-400",
      };
    case "shipped":
      return {
        headerLabel,
        headerColor,
        headerIcon,
        showProgress: true,
        progress: 80,
        statusLabel: "ارسال شده",
        statusIcon: React.createElement(FaTruck, { className: "h-5 w-5 md:h-6 md:w-6" }),
        statusColor: "text-blue-500 dark:text-blue-400",
        progressColor: "bg-blue-500 dark:bg-blue-400",
      };
    case "delivered":
      return {
        headerLabel,
        headerColor,
        headerIcon,
        showProgress: true,
        progress: 100,
        statusLabel: "تحویل شده",
        statusIcon: React.createElement(FaBoxOpen, { className: "h-5 w-5 md:h-6 md:w-6" }),
        statusColor: "text-green-600 dark:text-green-500",
        progressColor: "bg-green-600 dark:bg-green-500",
      };
  }
};
