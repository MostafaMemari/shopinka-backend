"use client";

import DashboardHeader from "./DashboardHeader";
import OrderCard from "./OrderCard";
import OrderTabs from "./OrderTabs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Product {
  id: string;
  name: string;
  image: string;
  link: string;
}

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
  statusColor: string;
  products?: Product[];
}

interface OrdersPageProps {
  pendingOrders: Order[];
  filteredOrders: {
    current: Order[];
    delivered: Order[];
    canceled: Order[];
    returned: Order[];
  };
}

const OrdersPage: React.FC<OrdersPageProps> = ({ pendingOrders, filteredOrders }) => (
  <div className="col-span-12 lg:col-span-9">
    <div className="rounded-lg bg-muted p-5 shadow-base">
      <DashboardHeader title="سفارشات شما" />
      <div className="mb-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="flex items-center gap-x-4 text-lg text-text/90">
            <span className="h-2 w-2 rounded-full bg-primary"></span>
            سفارشات در انتظار پرداخت
          </h2>
        </div>
        <div className="space-y-4">
          {pendingOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
      <div className="mb-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="flex items-center gap-x-4 text-lg text-text/90">
            <span className="h-2 w-2 rounded-full bg-primary"></span>
            سفارشات
          </h2>
        </div>
        <OrderTabs orders={filteredOrders} />
        <div className="flex items-center justify-center gap-x-4 md:justify-end">
          <a className="pagination-button flex items-center justify-center" href="#">
            <FaChevronRight className="h-6 w-6" />
          </a>
          <div className="flex items-center gap-x-2">
            <a className="pagination-button pagination-button-active" href="#">
              1
            </a>
            <p className="text-sm text-text/60">...</p>
            <a className="pagination-button" href="#">
              3
            </a>
            <a className="pagination-button" href="#">
              4
            </a>
            <p className="text-sm text-text/60">...</p>
            <a className="pagination-button" href="#">
              10
            </a>
          </div>
          <a
            className="flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-all duration-200 hover:bg-primary hover:text-white dark:hover:bg-emerald-600"
            href="#"
          >
            <FaChevronLeft className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default OrdersPage;
