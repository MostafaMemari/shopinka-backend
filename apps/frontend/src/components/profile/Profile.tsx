"use client";

import UserAccountSection from "./UserAccountSection";
import OrderStatusSection from "./OrderStatusSection";
import CurrentOrdersSection from "./CurrentOrdersSection";
import DashboardHeader from "./DashboardHeader";

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

interface DashboardProps {
  favoriteCount: number;
  notificationCount: number;
  currentOrders: number;
  deliveredOrders: number;
  canceledOrders: number;
  returnedOrders: number;
  orders: Order[];
}

const Profile: React.FC<DashboardProps> = ({
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
    {orders.map((order) => (
      <CurrentOrdersSection key={order.id} order={order} />
    ))}
  </>
);

export default Profile;
