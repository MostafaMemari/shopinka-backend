"use client";

import { useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import OrderCard from "./OrderCard";

interface Product {
  id: string;
  name: string;
  image: string;
  link: string;
}

interface Order {
  id: string;
  status: "pending" | "paid";
  remainingTime?: string;
  orderNumber: string;
  totalAmount: string;
  date?: string;
  statusLabel: string;
  progress: number;
  statusDate: string;
  statusTime: string;
  statusColor: string;
  products?: Product[];
}

interface OrderTabsProps {
  orders: {
    current: Order[];
    delivered: Order[];
    canceled: Order[];
    returned: Order[];
  };
}

const OrderTabs: React.FC<OrderTabsProps> = ({ orders }) => {
  const [activeTab, setActiveTab] = useState("current");

  const tabs = [
    { id: "current", label: "فعلی", count: orders.current.length },
    { id: "delivered", label: "تحویل شده", count: orders.delivered.length },
    { id: "canceled", label: "لغو شده", count: orders.canceled.length },
    { id: "returned", label: "مرجوع شده", count: orders.returned.length },
  ];

  return (
    <div>
      <ul
        className="-mb-px flex justify-between gap-x-2 overflow-x-auto text-center text-sm font-medium scrollbar-thumb-transparent xs:justify-start xs:gap-x-4 xs:text-base"
        role="tablist"
      >
        {tabs.map((tab) => (
          <li key={tab.id} role="presentation">
            <button
              className={`flex items-center gap-x-2 whitespace-nowrap rounded-t-lg border-b-2 px-2 pb-2 hover:text-text/90 dark:hover:text-zinc-300 ${
                activeTab === tab.id ? "border-primary text-text/90" : "border-transparent"
              }`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`filter-${tab.id}`}
            >
              {tab.label}
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-base text-white dark:bg-emerald-600">
                {tab.count}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={activeTab === tab.id ? "block" : "hidden"}
            id={`filter-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`filter-${tab.id}-tab`}
          >
            <div className="mb-8 space-y-4">
              {orders[tab.id as keyof typeof orders].length === 0 ? (
                <div className="flex justify-center">
                  <div className="flex flex-col items-center justify-center gap-y-4 text-text/60">
                    <FaBoxOpen className="h-20 w-20" />
                    <p className="md:text-xl">لیست سفارش های شما خالی میباشد</p>
                  </div>
                </div>
              ) : (
                orders[tab.id as keyof typeof orders].map((order) => <OrderCard key={order.id} order={order} />)
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTabs;
