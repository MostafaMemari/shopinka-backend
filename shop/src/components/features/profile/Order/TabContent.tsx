'use client';

import { useState, useCallback } from 'react';
import EmptyState from '../EmptyState';
import ErrorState from '../ErrorState';
import Pagination from '../Pagination';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useOrder } from '@/hooks/reactQuery/order/useOrder';
import OrderCard from './OrderCard';
import { FaBoxOpen } from 'react-icons/fa';

interface TabContentProps {
  tabId: 'current' | 'delivered' | 'canceled';
}

const TabContent: React.FC<TabContentProps> = ({ tabId }) => {
  const { data, isLoading, error } = useOrder({ params: { status: tabId } });

  const [currentPage, setCurrentPage] = useState(1);

  const orders = data?.items || [];

  const orderPager = data?.pager ?? { totalCount: 0, totalPages: 1 };

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div id={`filter-${tabId}`} role="tabpanel" aria-labelledby={`filter-${tabId}-tab`}>
      <div className="mb-8 space-y-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorState message={error.message} />
        ) : orderPager?.totalCount === 0 ? (
          <EmptyState icon={<FaBoxOpen className="w-full h-full" />} />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>

      {orderPager?.totalCount > 0 && orderPager?.totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={orderPager?.totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
};

export default TabContent;
