import DashboardHeader from "@/components/profile/DashboardHeader";
import OrderTabs from "@/components/profile/OrderTabs";
import { IOrder } from "@/lib/types/orders";

export default function Page() {
  const pendingOrders: IOrder[] = [];

  const filteredOrders = {
    current: [],
    delivered: [],
    canceled: [],
  };

  return (
    <div className="col-span-12 lg:col-span-9">
      <DashboardHeader title="تاریخچه سفارشات" />
      <div className="mb-8">
        <OrderTabs pendingOrders={pendingOrders} initialOrders={filteredOrders} />
      </div>
    </div>
  );
}
