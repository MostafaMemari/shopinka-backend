import DashboardHeader from '@/components/features/profile/DashboardHeader';
import TabContent from '@/components/features/profile/Order/TabContent';
import { getCountOrders } from '@/service/orderService';
import { cn } from '@/utils/utils';
import Link from 'next/link';

const TABS = [
  { id: 'current', label: 'جاری' },
  { id: 'delivered', label: 'تحویل شده' },
  { id: 'canceled', label: 'لغو شده' },
] as const;

type TabId = (typeof TABS)[number]['id'];
const DEFAULT_TAB: TabId = 'current';

const OrderTabs = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const currSearchParams = await searchParams;
  const activeTabParam = currSearchParams?.activeTab;
  const { cancelled, current, delivered } = await getCountOrders();

  const isValidTab = typeof activeTabParam === 'string' && TABS.some((tab) => tab.id === activeTabParam);
  const tabId: TabId = isValidTab ? (activeTabParam as TabId) : DEFAULT_TAB;

  const tabCounts = { current, delivered, canceled: cancelled };

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center justify-between gap-y-8 xs:flex-row">
        <DashboardHeader title="سفارشات" />
      </div>

      <nav className="flex gap-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-zinc-800" role="tablist">
        {TABS.map((tab) => (
          <Link
            key={tab.id}
            href={`?activeTab=${tab.id}`}
            className={cn(
              'flex items-center gap-x-2 px-3 py-2 rounded-t-lg text-sm font-medium border-b-2 transition-colors duration-150 min-w-max',
              tabId === tab.id
                ? 'border-primary bg-primary/5 text-primary shadow-sm'
                : 'border-transparent text-gray-500 hover:text-primary/90 hover:border-primary/40',
            )}
            role="tab"
            aria-selected={tabId === tab.id}
            tabIndex={tabId === tab.id ? 0 : -1}
          >
            <span dir="rtl">{tab.label}</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white dark:bg-emerald-600">
              {tabCounts[tab.id] || 0}
            </span>
          </Link>
        ))}
      </nav>

      <TabContent tabId={tabId} />
    </div>
  );
};

export default OrderTabs;
