'use client';

import { IOrder } from '@/lib/types/orders';
import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination';

interface FetchOrdersResponse {
  orders: IOrder[];
  total: number;
}

const fetchOrdersByTab = async (tabId: string, page: number, itemsPerPage: number): Promise<FetchOrdersResponse> => {
  return { orders: [], total: 0 };
};

const LoadingState = () => <div>در حال بارگذاری...</div>;
const ErrorState = ({ message }: { message: string }) => <div>{message}</div>;
const EmptyState = () => <div>هیچ سفارشی یافت نشد</div>;
const OrderList = ({ orders, retryPayment }: { orders: IOrder[]; retryPayment?: boolean }) => (
  <div>
    {orders.map((order) => (
      <div key={order.id}>{order.id}</div>
    ))}
  </div>
);

const CurrentOrdersTab: React.FC = () => {
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
        const { orders: fetchedOrders, total } = await fetchOrdersByTab('current', currentPage, itemsPerPage);
        setOrders(fetchedOrders);
        setTotalItems(total);
      } catch (err) {
        setError('خطا در بارگذاری سفارش‌ها');
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
    <div id="filter-current" role="tabpanel" aria-labelledby="filter-current-tab">
      <div className="mb-8 space-y-4">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : orders.length === 0 ? (
          <EmptyState />
        ) : (
          <OrderList orders={orders} retryPayment={true} />
        )}
      </div>
      <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default CurrentOrdersTab;
