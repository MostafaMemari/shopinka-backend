import Profile from "@/components/profile/Profile";
import { mockOrders } from "@/mock/orders";

export default function Page() {
  return (
    <Profile
      favoriteCount={5}
      notificationCount={3}
      currentOrders={2}
      deliveredOrders={10}
      canceledOrders={1}
      returnedOrders={0}
      orders={mockOrders}
    />
  );
}
