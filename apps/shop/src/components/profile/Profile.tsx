"use client";

import UserAccountSection from "./Profile/UserAccountSection";
import OrderStatusSection from "./Profile/OrderStatusSection";
import DashboardHeader from "./DashboardHeader";

interface DashboardProps {
  favoriteCount: number;
  notificationCount: number;
  currentOrders: number;
  deliveredOrders: number;
  canceledOrders: number;
  returnedOrders: number;
}

const Profile: React.FC<DashboardProps> = ({
  favoriteCount,
  notificationCount,
  currentOrders,
  deliveredOrders,
  canceledOrders,
  returnedOrders,
}) => (
  <>
    <div className="mb-8">
      <DashboardHeader title="پیشخوان" />
    </div>
    <UserAccountSection favoriteCount={favoriteCount} notificationCount={notificationCount} />
    <OrderStatusSection
      currentOrders={currentOrders}
      deliveredOrders={deliveredOrders}
      canceledOrders={canceledOrders}
      returnedOrders={returnedOrders}
    />
  </>
);

export default Profile;
