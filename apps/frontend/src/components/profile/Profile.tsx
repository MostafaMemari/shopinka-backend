"use client";

import UserAccountSection from "./Profile/UserAccountSection";
import OrderStatusSection from "./Profile/OrderStatusSection";
import CurrentOrdersSection from "./CurrentOrdersSection";
import DashboardHeader from "./DashboardHeader";
import { IOrder } from "@/lib/types/orders";

interface DashboardProps {
  favoriteCount: number;
  notificationCount: number;
  currentOrders: number;
  deliveredOrders: number;
  canceledOrders: number;
  returnedOrders: number;
  orders: IOrder[];
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
    <div className="mb-12">
      <DashboardHeader title="پیشخوان" />
    </div>
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
