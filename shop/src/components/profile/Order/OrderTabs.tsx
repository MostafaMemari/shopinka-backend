'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { IOrder } from '@/lib/types/orders';
import TabContent from './TabContent';

interface OrderTabsProps {
  pendingOrders: IOrder[];
  counts: {
    current: number;
    delivered: number;
    canceled: number;
  };
}

const OrderTabs: React.FC<OrderTabsProps> = ({ pendingOrders, counts }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get('activeTab') || 'current';
  const [activeTab, setActiveTab] = useState<'current' | 'delivered' | 'canceled'>(
    ['current', 'delivered', 'canceled'].includes(initialTab) ? (initialTab as any) : 'current',
  );

  // وقتی URL عوض می‌شه، تب فعال رو آپدیت کن
  useEffect(() => {
    const currentTab = searchParams.get('activeTab') || 'current';
    if (['current', 'delivered', 'canceled'].includes(currentTab)) {
      setActiveTab(currentTab as 'current' | 'delivered' | 'canceled');
    }
  }, [searchParams]);

  // وقتی روی تب کلیک می‌کنی، URL رو آپدیت کن
  const handleTabChange = (tabId: 'current' | 'delivered' | 'canceled') => {
    setActiveTab(tabId);
    router.push(`/?activeTab=${tabId}`, { scroll: false });
  };

  const tabs = [
    { id: 'current', label: 'فعلی', count: counts.current + pendingOrders.length },
    { id: 'delivered', label: 'تحویل شده', count: counts.delivered },
    { id: 'canceled', label: 'لغو شده', count: counts.canceled },
  ];

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
                activeTab === tab.id ? 'border-primary text-text/90' : 'border-transparent'
              }`}
              onClick={() => handleTabChange(tab.id as 'current' | 'delivered' | 'canceled')}
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
      <TabContent tabId={activeTab} initialOrders={[]} pendingOrders={activeTab === 'current' ? pendingOrders : []} />
    </div>
  );
};

export default OrderTabs;
