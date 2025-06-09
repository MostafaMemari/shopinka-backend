'use client';

import {
  FaUserEdit,
  FaLock,
  FaHeart,
  FaBell,
  FaShoppingBag,
  FaTruck,
  FaTimesCircle,
  FaUndo,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaChevronLeft,
} from 'react-icons/fa';
import Link from 'next/link';

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => (
  <h1 className="relative mb-16 w-fit text-xl font-medium">
    {title}
    <span className="absolute right-0 top-10 h-[3px] w-full rounded-full bg-primary" />
  </h1>
);

interface UserAccountSectionProps {
  favoriteCount: number;
  notificationCount: number;
}

const UserAccountSection: React.FC<UserAccountSectionProps> = ({ favoriteCount, notificationCount }) => (
  <div className="mb-8">
    <h2 className="mb-8 flex items-center gap-x-4 text-lg text-text/90">
      <span className="h-2 w-2 rounded-full bg-primary" />
      حساب کاربری
    </h2>
    <div className="grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-4">
      <Link href="/profile-edit" className="flex flex-col items-center gap-4 rounded-base bg-sky-500 p-2 dark:bg-sky-600 md:flex-row">
        <div className="relative rounded-base bg-sky-600/50 p-2 dark:bg-sky-500/50">
          <FaUserEdit className="h-8 w-8 text-white" />
        </div>
        <div className="text-sm font-medium text-white md:text-base">تکمیل مشخصات</div>
      </Link>
      <Link href="/profile-edit" className="flex flex-col items-center gap-4 rounded-base bg-warning p-2 dark:bg-red-600 md:flex-row">
        <div className="relative rounded-base bg-red-600/50 p-2">
          <FaLock className="h-8 w-8 text-white" />
        </div>
        <div className="text-sm font-medium text-white md:text-base">ثبت کلمه عبور</div>
      </Link>
      <Link href="/profile-favorite" className="flex flex-col items-center gap-4 rounded-base bg-rose-500 p-2 dark:bg-rose-600 md:flex-row">
        <div className="relative rounded-base bg-rose-600/50 p-2 dark:bg-rose-500/50">
          <FaHeart className="h-8 w-8 text-white" />
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-sm font-medium text-white dark:bg-rose-500 md:hidden">
            {favoriteCount}
          </span>
        </div>
        <div className="flex items-center gap-x-2 text-sm font-medium text-white md:text-base">
          <span className="hidden md:block">{favoriteCount}</span> علاقه مندی
        </div>
      </Link>
      <Link
        href="/profile-notification"
        className="flex flex-col items-center gap-4 rounded-base bg-primary p-2 dark:bg-emerald-600 md:flex-row"
      >
        <div className="relative rounded-base bg-emerald-600/50 p-2 dark:bg-primary/50">
          <FaBell className="h-8 w-8 text-white" />
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-sm font-medium text-white dark:bg-primary md:hidden">
            {notificationCount}
          </span>
        </div>
        <div className="flex items-center gap-x-2 text-sm font-medium text-white md:text-base">
          <span className="hidden md:block">{notificationCount}</span> اعلان جدید
        </div>
      </Link>
    </div>
  </div>
);

interface OrderStatusSectionProps {
  currentOrders: number;
  deliveredOrders: number;
  canceledOrders: number;
  returnedOrders: number;
}

const OrderStatusSection: React.FC<OrderStatusSectionProps> = ({ currentOrders, deliveredOrders, canceledOrders, returnedOrders }) => (
  <div className="mb-8">
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <h3 className="flex items-center gap-x-4 text-lg text-text/90">
        <span className="h-2 w-2 rounded-full bg-primary" />
        وضعیت سفارش های شما
      </h3>
      <Link href="/profile-orders" className="btn-primary-nobg text-base">
        مشاهده همه
        <FaChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
      </Link>
    </div>
    <div className="grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-4">
      <div className="flex flex-col items-center gap-4 rounded-base bg-sky-500 p-2 dark:bg-sky-600 md:flex-row">
        <div className="relative rounded-base bg-sky-600/50 p-2 dark:bg-sky-500/50">
          <FaShoppingBag className="h-10 w-10 text-white" />
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-sm font-medium text-white dark:bg-sky-500 md:hidden">
            {currentOrders}
          </span>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="hidden font-medium text-white md:block">{currentOrders} سفارش</div>
          <div className="text-white">فعلی</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 rounded-base bg-primary p-2 dark:bg-emerald-600 md:flex-row">
        <div className="relative rounded-base bg-emerald-600/50 p-2 dark:bg-primary/50">
          <FaTruck className="h-10 w-10 text-white" />
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-sm font-medium text-white dark:bg-primary md:hidden">
            {deliveredOrders}
          </span>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="hidden font-medium text-white md:block">{deliveredOrders} سفارش</div>
          <div className="text-white">تحویل شده</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 rounded-base bg-warning p-2 dark:bg-red-400 md:flex-row">
        <div className="relative rounded-base bg-red-400/50 p-2">
          <FaTimesCircle className="h-10 w-10 text-white" />
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-400 text-sm font-medium text-white md:hidden">
            {canceledOrders}
          </span>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="hidden font-medium text-white md:block">{canceledOrders} سفارش</div>
          <div className="text-white">لغو شده</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 rounded-base bg-yellow-500 p-2 dark:bg-yellow-600 md:flex-row">
        <div className="relative rounded-base bg-yellow-600/50 p-2 dark:bg-yellow-500/50">
          <FaUndo className="h-10 w-10 text-white" />
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-600 text-sm font-medium text-white dark:bg-yellow-500 md:hidden">
            {returnedOrders}
          </span>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="hidden font-medium text-white md:block">{returnedOrders} سفارش</div>
          <div className="text-white">مرجوع شده</div>
        </div>
      </div>
    </div>
  </div>
);

interface Order {
  id: string;
  status: 'pending' | 'paid';
  remainingTime?: string;
  orderNumber: string;
  totalAmount: string;
  date?: string;
  statusLabel: string;
  progress: number;
  statusDate: string;
  statusTime: string;
}

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => (
  <div className="rounded-lg border shadow-base">
    <Link href={order.status === 'pending' ? '/profile-orders-detail-pending' : '/profile-orders-detail'}>
      <div className="p-4">
        <div className="flex items-center justify-between pb-6">
          <div
            className={`flex items-center gap-x-2 ${order.status === 'pending' ? 'text-yellow-500 dark:text-yellow-400' : 'text-primary'}`}
          >
            {order.status === 'pending' ? <FaExclamationTriangle className="h-6 w-6" /> : <FaCheckCircle className="h-6 w-6" />}
            <p className="font-medium md:text-lg">{order.status === 'pending' ? 'در انتظار پرداخت' : 'پرداخت شده'}</p>
          </div>
          <FaChevronLeft className="h-6 w-6" />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row xl:justify-between xl:gap-16">
          <div className="flex flex-col gap-4 md:flex-row">
            {order.remainingTime && (
              <div className="flex items-center justify-between gap-x-2 md:justify-start">
                <div className="text-sm text-text/60 md:text-base">زمان باقیمانده</div>
                <div className="text-sm text-red-500 dark:text-red-400 md:text-base">{order.remainingTime}</div>
              </div>
            )}
            <div className="flex items-center justify-between gap-x-2 md:justify-start">
              <div className="text-sm text-text/60 md:text-base">شماره سفارش</div>
              <div className="text-sm text-text/90 md:text-base">{order.orderNumber}</div>
            </div>
            <div className="flex items-center justify-between gap-x-2 md:justify-start">
              <div className="text-sm text-text/60 md:text-base">مبلغ کل</div>
              <div className="text-primary">
                <span className="font-bold md:text-lg">{order.totalAmount}</span>
                <span className="text-sm md:text-base">تومان</span>
              </div>
            </div>
            {order.date && (
              <div className="flex items-center justify-between gap-x-2 md:justify-start">
                <div className="text-sm text-text/60 md:text-base">تاریخ</div>
                <div className="text-sm text-text/90 md:text-base">{order.date}</div>
              </div>
            )}
          </div>
          <div className="flex grow flex-col gap-y-4">
            <div className="flex items-center gap-x-2 text-yellow-500 dark:text-yellow-400">
              <FaClock className="h-5 w-5 md:h-6 md:w-6" />
              <p className="text-sm font-medium md:text-base">{order.statusLabel}</p>
            </div>
            <div className="relative h-2 w-full rounded-full bg-background dark:bg-zinc-800">
              <span
                className="absolute inset-y-0 right-0 rounded-full bg-yellow-500 dark:bg-yellow-400"
                style={{ width: `${order.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm text-yellow-500 dark:text-yellow-400 md:text-base">
              <span>{order.statusDate}</span>
              <span>{order.statusTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

interface CurrentOrdersSectionProps {
  orders: Order[];
}

const CurrentOrdersSection: React.FC<CurrentOrdersSectionProps> = ({ orders }) => (
  <div className="mb-8">
    <div
      className="mb-8 flex flex-wrap items-center justify-between gap-4
    
    "
    >
      <h3 className="flex items-center gap-x-4 text-lg text-text/90">
        <span className="h-2 w-2 rounded-full bg-primary" />
        سفارشات فعلی
      </h3>
    </div>
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  </div>
);

interface DashboardProps {
  favoriteCount: number;
  notificationCount: number;
  currentOrders: number;
  deliveredOrders: number;
  canceledOrders: number;
  returnedOrders: number;
  orders: Order[];
}

const Dashboard: React.FC<DashboardProps> = ({
  favoriteCount,
  notificationCount,
  currentOrders,
  deliveredOrders,
  canceledOrders,
  returnedOrders,
  orders,
}) => (
  <>
    <DashboardHeader title="پیشخوان" />
    <UserAccountSection favoriteCount={favoriteCount} notificationCount={notificationCount} />
    <OrderStatusSection
      currentOrders={currentOrders}
      deliveredOrders={deliveredOrders}
      canceledOrders={canceledOrders}
      returnedOrders={returnedOrders}
    />
    <CurrentOrdersSection orders={orders} />
  </>
);

export default Dashboard;
