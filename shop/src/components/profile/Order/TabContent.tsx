"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { IOrder } from "@/lib/types/orders";
import { fetchOrdersByTab } from "@/mock/orders";
import LoadingState from "../LoadingState";
import EmptyState from "../EmptyState";
import ErrorState from "../ErrorState";
import Pagination from "../Pagination";
import OrderList from "./OrderList";

interface TabContentProps {
  tabId: "current" | "delivered" | "canceled";
}

const useOrders = (tabId: TabContentProps["tabId"], currentPage: number, itemsPerPage: number) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { orders: fetchedOrders, total } = await fetchOrdersByTab(tabId, currentPage, itemsPerPage);
      setOrders(fetchedOrders);
      setTotalItems(total);
    } catch (err) {
      setError("خطا در بارگذاری سفارش‌ها");
    } finally {
      setLoading(false);
    }
  }, [tabId, currentPage, itemsPerPage]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return { orders, totalItems, loading, error };
};

const TabContent: React.FC<TabContentProps> = ({ tabId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { orders, totalItems, loading, error } = useOrders(tabId, currentPage, itemsPerPage);

  const displayOrders = useMemo(() => (tabId === "current" ? [...orders] : orders), [tabId, orders]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div id={`filter-${tabId}`} role="tabpanel" aria-labelledby={`filter-${tabId}-tab`}>
      <div className="mb-8 space-y-4">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : displayOrders.length === 0 ? (
          <EmptyState />
        ) : (
          <OrderList orders={displayOrders} retryPayment={tabId === "current"} />
        )}
      </div>
      <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default TabContent;
