import DashboardHeader from '@/shared/components/profile/DashboardHeader';
import TabContent from '@/shared/components/profile/Order/TabContent';
import { cn } from '@/shared/utils/utils';
import Link from 'next/link';

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const OrderTabs = async ({ searchParams }: Props) => {
  const tabs = [
    { id: 'current', label: 'فعلی', count: 5 },
    { id: 'delivered', label: 'تحویل شده', count: 10 },
    { id: 'canceled', label: 'لغو شده', count: 15 },
  ];

  const tabsIds = tabs.map((tab) => tab.id);
  const activeTab = searchParams?.activeTab;
  const tabId = (typeof activeTab === 'string' && tabsIds.includes(activeTab) ? activeTab : 'current') as
    | 'current'
    | 'delivered'
    | 'canceled';

  return (
    <div>
      <DashboardHeader title="سفارشات" />

      <ul className="mt-10 flex gap-x-4 overflow-x-auto text-sm font-medium xs:text-base" role="tablist">
        {tabs.map((tab) => (
          <li key={tab.id} role="presentation">
            <Link
              className={cn(
                'flex items-center gap-x-2 rounded-t-lg border-b-2 px-2 pb-2 hover:text-text/90 dark:hover:text-zinc-300',
                tabId === tab.id ? 'border-primary text-text/90' : 'border-transparent',
              )}
              href={`?activeTab=${tab.id}`}
            >
              {tab.label}
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-base text-white dark:bg-emerald-600">
                {tab.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <TabContent tabId={tabId} />
    </div>
  );
};

export default OrderTabs;
