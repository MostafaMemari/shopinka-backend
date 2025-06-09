import NotificationsActions from '@/components/profile/Notifications/NotificationsActions';

interface Notification {
  id: string;
  type: 'order' | 'delivery';
  title: string;
  message: string;
  products: {
    id: string;
    name: string;
    image: string;
    link: string;
  }[];
  actionLabel: string;
  actionLink: string;
  orderNumber?: string;
}

export default function Page() {
  const notifications: Notification[] = [
    {
      id: 'n1',
      type: 'order',
      title: 'سفارش شما ثبت شده و در حال پردازش است',
      message: 'وضعیت سفارش خود را می توانید از اینجا پیگیری نمایید',
      products: [
        { id: 'p1', name: 'کفش اسپورت نایک NKslwS2', image: '/images/products/p1.png', link: '/product-detail' },
        { id: 'p2', name: 'کفش اسپورت نایک NKslwS2', image: '/images/products/p2.png', link: '/product-detail' },
        { id: 'p3', name: 'کفش اسپورت نایک NKslwS2', image: '/images/products/p3.png', link: '/product-detail' },
      ],
      actionLabel: 'پیگیری سفارش',
      actionLink: '/profile/orders',
    },
    {
      id: 'n2',
      type: 'delivery',
      title: 'سفارش شما ارسال شد',
      message: 'سفارش #102030 شما پردازش و ارسال شد لطفا پس از دریافت مرسوله دیدگاه خود را برای محصولات ثبت کنید',
      orderNumber: '102030',
      products: [
        { id: 'p4', name: 'کفش اسپورت نایک NKslwS2', image: '/images/products/p1.png', link: '/product-detail' },
        { id: 'p5', name: 'کفش اسپورت نایک NKslwS2', image: '/images/products/p2.png', link: '/product-detail' },
        { id: 'p6', name: 'کفش اسپورت نایک NKslwS2', image: '/images/products/p3.png', link: '/product-detail' },
      ],
      actionLabel: 'مشاهده جزئیات سفارش',
      actionLink: '/profile/order-details/102030',
    },
  ];

  return (
    <div className="col-span-12 lg:col-span-9">
      <NotificationsActions notifications={notifications} />
    </div>
  );
}
