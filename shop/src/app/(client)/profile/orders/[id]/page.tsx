import DeliveryAddress from '@/components/profile/Address/DeliveryAddress';
import DashboardHeader from '@/components/profile/DashboardHeader';
import OrderCardDetails from '@/components/profile/Order/OrderCardDetails';
import OrderItems from '@/components/profile/Order/OrderItems';
import { getOrderById } from '@/service/orderService';
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa';

type PageProps = {
  params: Promise<{ id: string }>;
};

async function Page({ params }: PageProps) {
  const { id } = await params;

  const order = await getOrderById(Number(id));

  return (
    <>
      <div className="mb-10 flex flex-col items-center justify-between gap-y-8 xs:flex-row">
        <DashboardHeader title={`جزئیات سفارش ${order.orderNumber}#`} />

        <Link href="/profile/orders" className="btn-primary w-full px-4 py-2 xs:w-fit">
          برگشت
          <FaChevronLeft className="h-5 w-5" />
        </Link>
      </div>

      <OrderCardDetails
        orderStatus={order.status}
        transactionStatus={order.transaction.status}
        orderNumber={order.orderNumber}
        paymentOrder={order.transaction.amount}
      />
      {/* <OrderCostDetails costs={45534} shipping={shipping} /> */}
      <DeliveryAddress address={order.address} />
      <OrderItems items={order.items} itemCount={order.items.length} />
    </>
  );
}

export default Page;
