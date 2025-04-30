import { IOrder } from "@/lib/types/orders";
import OrderCard from "./OrderCard";

interface OrderListProps {
  orders: IOrder[];
  retryPayment: boolean;
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
