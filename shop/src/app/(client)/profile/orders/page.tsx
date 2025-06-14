import DashboardHeader from '@/components/profile/DashboardHeader';
import TabContent from '@/components/profile/Order/TabContent';
import { cn } from '@/utils/utils';
import Link from 'next/link';

const TABS = [
  { id: 'current', label: 'فعلی', count: 5 },
  { id: 'delivered', label: 'تحویل شده', count: 10 },
  { id: 'canceled', label: 'لغو شده', count: 15 },
] as const;

type TabId = (typeof TABS)[number]['id'];
const DEFAULT_TAB: TabId = 'current';

const OrderTabs = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const currSearchParams = await searchParams;
  const activeTabParam = currSearchParams?.activeTab;
  const isValidTab = typeof activeTabParam === 'string' && TABS.some((tab) => tab.id === activeTabParam);
  const tabId: TabId = isValidTab ? (activeTabParam as TabId) : DEFAULT_TAB;

  return (
    <div>
      <DashboardHeader title="سفارشات" />

      <nav
        className="mt-10 flex gap-x-2 sm:gap-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-zinc-800"
        role="tablist"
        aria-label="سفارشات"
      >
        {TABS.map((tab) => (
          <Link
            key={tab.id}
            href={`?activeTab=${tab.id}`}
            className={cn(
              'flex items-center gap-x-2 min-w-max px-2 py-2 rounded-t-lg text-sm xs:text-base font-medium border-b-2 transition-all duration-150',
              tabId === tab.id
                ? 'border-primary bg-primary/5 text-primary shadow-[0_3px_12px_0_rgba(0,0,0,0.05)]'
                : 'border-transparent text-gray-500 hover:text-primary/90 hover:border-primary/40',
            )}
            role="tab"
            aria-selected={tabId === tab.id}
            tabIndex={tabId === tab.id ? 0 : -1}
          >
            {tab.label}
            <span
              className={cn(
                'inline-flex h-6 w-6 items-center justify-center rounded bg-primary/90 text-white text-xs font-bold transition-all duration-150',
                tabId === tab.id ? 'scale-110 shadow' : 'bg-primary/40',
              )}
            >
              {tab.count}
            </span>
          </Link>
        ))}
      </nav>

      <TabContent tabId={tabId} initialOrders={[]} pendingOrders={[]} />
    </div>
  );
};

export default OrderTabs;
