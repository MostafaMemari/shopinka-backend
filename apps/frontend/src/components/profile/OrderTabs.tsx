"use client";

import { useState, useEffect } from "react";
import { FaBoxOpen } from "react-icons/fa";
import OrderCard from "./OrderCard";
import Pagination from "./Pagination";
import { IOrder } from "@/lib/types/orders";
import { fetchOrdersByTab } from "@/mock/orders";

interface OrderTabsProps {
  pendingOrders: IOrder[];
  initialOrders: {
    current: IOrder[];
    delivered: IOrder[];
    canceled: IOrder[];
  };
}

const OrderTabs: React.FC<OrderTabsProps> = ({ pendingOrders, initialOrders }) => {
  const [activeTab, setActiveTab] = useState<"current" | "delivered" | "canceled">("current");
  const [orders, setOrders] = useState<Record<"current" | "delivered" | "canceled", IOrder[]>>({
    current: initialOrders.current,
    delivered: initialOrders.delivered,
    canceled: initialOrders.canceled,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(orders[activeTab].length);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const { orders: fetchedOrders, total } = await fetchOrdersByTab(activeTab, currentPage, itemsPerPage);
        setOrders((prev) => ({ ...prev, [activeTab]: fetchedOrders }));
        setTotalItems(total);
      } catch (err) {
        setError("خطا در بارگذاری سفارش‌ها");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [activeTab, currentPage]);

  const tabs = [
    { id: "current", label: "فعلی", count: orders.current.length + pendingOrders.length },
    { id: "delivered", label: "تحویل شده", count: orders.delivered.length },
    { id: "canceled", label: "لغو شده", count: orders.canceled.length },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <ul
        className="-mb-px flex justify-between gap-x-2 overflow-x-auto text-center text-sm font-medium scrollbar-thumb-transparent xs:justify-start xs:gap-x-4 xs:text-base mt-10"
        role="tablist"
      >
        {tabs.map((tab) => (
          <li key={tab.id} role="presentation">
            <button
              className={`flex items-center gap-x-2 cursor-pointer whitespace-nowrap rounded-t-lg border-b-2 px-2 pb-2 hover:text-text/90 dark:hover:text-zinc-300 ${
                activeTab === tab.id ? "border-primary text-text/90" : "border-transparent"
              }`}
              onClick={() => {
                setActiveTab(tab.id as "current" | "delivered" | "canceled");
                setCurrentPage(1);
              }}
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
              {loading ? (
                <div className="flex justify-center">
                  <p className="text-text/60 mt-2 md:text-xl">در حال بارگذاری...</p>
                </div>
              ) : error ? (
                <div className="flex justify-center">
                  <p className="text-red-500 md:text-xl">{error}</p>
                </div>
              ) : orders[tab.id as keyof typeof orders].length === 0 && (tab.id !== "current" || pendingOrders.length === 0) ? (
                <div className="flex justify-center">
                  <div className="flex flex-col items-center justify-center gap-y-4 text-text/60">
                    <FaBoxOpen className="h-20 w-20" />
                    <p className="md:text-xl">لیست سفارش‌های شما خالی می‌باشد</p>
                  </div>
                </div>
              ) : (
                <>
                  {tab.id === "current" &&
                    pendingOrders.map((order) => <OrderCard key={order.id} order={order} retryPayment={order.status === "pending"} />)}
                  {orders[tab.id as keyof typeof orders].map((order) => (
                    <OrderCard key={order.id} order={order} retryPayment={order.status === "pending"} />
                  ))}
                </>
              )}
            </div>
            <Pagination
              totalItems={totalItems + (activeTab === "current" ? pendingOrders.length : 0)}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTabs;
