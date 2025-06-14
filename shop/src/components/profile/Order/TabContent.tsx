'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { IOrder } from '@/lib/types/orders';
import { fetchOrdersByTab } from '@/mock/orders';
import LoadingState from '../LoadingState';
import EmptyState from '../EmptyState';
import ErrorState from '../ErrorState';
import Pagination from '../Pagination';
import OrderList from './OrderList';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface TabContentProps {
  tabId: 'current' | 'delivered' | 'canceled';
  initialOrders: IOrder[];
  pendingOrders: IOrder[];
}

const useOrders = (tabId: TabContentProps['tabId'], currentPage: number, itemsPerPage: number) => {
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
      setError('خطا در بارگذاری سفارش‌ها');
    } finally {
      setLoading(false);
    }
  }, [tabId, currentPage, itemsPerPage]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return { orders, totalItems, loading, error };
};

const TabContent: React.FC<TabContentProps> = ({ tabId, initialOrders, pendingOrders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { orders, totalItems, loading, error } = useOrders(tabId, currentPage, itemsPerPage);

  const displayOrders = useMemo(() => {
    if (tabId === 'current') {
      return [...pendingOrders, ...orders];
    }
    return orders;
  }, [tabId, orders, pendingOrders]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div id={`filter-${tabId}`} role="tabpanel" aria-labelledby={`filter-${tabId}-tab`}>
      <div className="mb-8 space-y-4">
        {loading ? (
          <div className="mt-8">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="mt-8">
            <ErrorState message={error} />
          </div>
        ) : displayOrders.length === 0 ? (
          <div className="mt-8">
            <EmptyState />
          </div>
        ) : (
          <OrderList orders={displayOrders} retryPayment={tabId === 'current'} />
        )}
      </div>
      <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default TabContent;
