import DeliveryAddress from '@/components/features/profile/Address/DeliveryAddress';
import DashboardHeader from '@/components/features/profile/DashboardHeader';
import OrderCardDetails from '@/components/features/profile/Order/OrderCardDetails';
import OrderItems from '@/components/features/profile/Order/OrderItems';
import { getOrderById } from '@/service/orderService';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import { OrderItem } from '@/types/orderType';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ id: string }>;
};

async function Page({ params }: PageProps) {
  const { id } = await params;

  let order: OrderItem;
  try {
    order = await getOrderById(Number(id));
    if (!order) notFound();
  } catch (error) {
    console.error('Error fetching order:', error);
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-10 flex flex-col items-center justify-between gap-y-6 sm:flex-row">
        <DashboardHeader title={`جزئیات سفارش #${order.orderNumber}`} />
        <Link
          href="/profile/orders"
          className="btn-primary flex items-center justify-center gap-2 w-full sm:w-fit px-4 py-2 text-sm font-medium"
        >
          بازگشت
          <FaChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <OrderCardDetails
        orderStatus={order.status}
        transactionStatus={order.transaction.status}
        orderNumber={order.orderNumber}
        paymentOrder={order.transaction.amount}
        createdAt={order.createdAt}
        updatedAt={order.updatedAt}
      />
      <DeliveryAddress address={order.address} />
      <OrderItems items={order.items} itemCount={order.quantity} />
    </div>
  );
}

export default Page;
