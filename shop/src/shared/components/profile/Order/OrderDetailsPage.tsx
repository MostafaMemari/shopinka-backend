'use client';

import { FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';
import DashboardHeader from '../DashboardHeader';
import OrderCard from './OrderCard';
import OrderCostDetails from './OrderCostDetails';
import DeliveryAddress from '../Address/DeliveryAddress';
import OrderItems from './OrderItems';

interface Product {
  id: string;
  name: string;
  image: string;
  link: string;
}

interface OrderItem {
  id: string;
  image: string;
  title: string;
  variant: { color: string; name: string };
  discount?: string;
  quantity: number;
  price: string;
  originalPrice?: string;
}

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
  statusColor: string;
  products?: Product[];
}

interface OrderDetailsPageProps {
  order: Order;
  costs: { label: string; value: string; color?: string }[];
  shipping: { label: string; value: string; color?: string }[];
  address: { address: string; recipient: string };
  items: OrderItem[];
}

const OrderDetailsPage: React.FC<OrderDetailsPageProps> = ({ order, costs, shipping, address, items }) => (
  <div className="col-span-12 lg:col-span-9">
    <div className="rounded-lg bg-muted p-5 shadow-base">
      <div className="mb-16 flex flex-col items-center justify-between gap-y-8 xs:flex-row">
        <DashboardHeader title={`جزئیات سفارش #${order.orderNumber}`} />
        <Link href="/profile-orders" className="btn-secondary w-full px-4 py-2 xs:w-fit">
          برگشت
          <FaChevronLeft className="h-5 w-5" />
        </Link>
      </div>
      <OrderCard order={order} />
      <OrderCostDetails costs={costs} shipping={shipping} />
      <DeliveryAddress address={address.address} recipient={address.recipient} />
      <OrderItems items={items} itemCount={items.length} />
    </div>
  </div>
);

export default OrderDetailsPage;
