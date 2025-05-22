import { FaShoppingCart, FaTruck, FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';
import ProductSlider from '../ProductSlider';

interface Product {
  id: string;
  name: string;
  image: string;
  link: string;
}

interface Notification {
  id: string;
  type: 'order' | 'delivery';
  title: string;
  message: string;
  orderNumber?: string;
  products: Product[];
  actionLabel: string;
  actionLink: string;
}

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const icon = notification.type === 'order' ? <FaShoppingCart className="h-6 w-6" /> : <FaTruck className="h-6 w-6" />;
  const titleColor = notification.type === 'order' ? 'text-sky-500 dark:text-sky-400' : 'text-primary';

  return (
    <div className="py-6">
      <div className={`mb-4 flex items-center gap-x-2 ${titleColor}`}>
        {icon}
        <p className="md:text-lg">{notification.title}</p>
      </div>
      <p className="mb-4 text-sm text-text/90 md:text-base">
        {notification.message}
        {notification.orderNumber && <span className="font-bold text-primary">{' #' + notification.orderNumber}</span>}
      </p>
      <ProductSlider products={notification.products} />
      <div className="flex justify-end">
        <Link href={notification.actionLink} className="btn-primary w-full px-4 py-2 text-sm sm:w-fit">
          {notification.actionLabel}
          <FaChevronLeft className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default NotificationItem;
