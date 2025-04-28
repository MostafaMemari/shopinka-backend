import { FaExclamationTriangle, FaCheckCircle, FaClock, FaChevronLeft } from "react-icons/fa";
import Link from "next/link";

interface Order {
  id: string;
  status: "pending" | "paid";
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
    <Link href={order.status === "pending" ? "/profile-orders-detail-pending" : "/profile-orders-detail"}>
      <div className="p-4">
        <div className="flex items-center justify-between pb-6">
          <div
            className={`flex items-center gap-x-2 ${order.status === "pending" ? "text-yellow-500 dark:text-yellow-400" : "text-primary"}`}
          >
            {order.status === "pending" ? <FaExclamationTriangle className="h-6 w-6" /> : <FaCheckCircle className="h-6 w-6" />}
            <p className="font-medium md:text-lg">{order.status === "pending" ? "در انتظار پرداخت" : "پرداخت شده"}</p>
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

export default OrderCard;
