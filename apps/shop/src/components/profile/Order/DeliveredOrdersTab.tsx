"use client";

import React, { useState, useEffect } from "react";

// فرض می‌کنیم این اینترفیس‌ها و توابع از جای دیگری وارد شده‌اند
interface IOrder {
  id: string;
  // سایر فیلدهای سفارش
}

interface FetchOrdersResponse {
  orders: IOrder[];
  total: number;
}

const fetchOrdersByTab = async (tabId: string, page: number, itemsPerPage: number): Promise<FetchOrdersResponse> => {
  // شبیه‌سازی فچ داده‌ها از API
  return { orders: [], total: 0 };
};

// کامپوننت‌های مشترک فرضی
const LoadingState = () => <div>در حال بارگذاری...</div>;
const ErrorState = ({ message }: { message: string }) => <div>{message}</div>;
const EmptyState = () => <div>هیچ سفارشی یافت نشد</div>;
const OrderList = ({ orders }: { orders: IOrder[] }) => (
  <div>
    {orders.map((order) => (
      <div key={order.id}>{order.id}</div>
    ))}
  </div>
);
const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => (
  <div>
    <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
      قبلی
    </button>
    <span>صفحه {currentPage}</span>
    <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage * itemsPerPage >= totalItems}>
      بعدی
    </button>
  </div>
);

const DeliveredOrdersTab: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const { orders: fetchedOrders, total } = await fetchOrdersByTab("delivered", currentPage, itemsPerPage);
        setOrders(fetchedOrders);
        setTotalItems(total);
      } catch (err) {
        setError("خطا در بارگذاری سفارش‌ها");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div id="filter-delivered" role="tabpanel" aria-labelledby="filter-delivered-tab">
      <div className="mb-8 space-y-4">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : orders.length === 0 ? (
          <EmptyState />
        ) : (
          <OrderList orders={orders} />
        )}
      </div>
      <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default DeliveredOrdersTab;
