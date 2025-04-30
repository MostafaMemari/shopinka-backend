import NotificationsActions from "../NotificationsActions";

interface Product {
  id: string;
  name: string;
  image: string;
  link: string;
}

interface Notification {
  id: string;
  type: "order" | "delivery";
  title: string;
  message: string;
  orderNumber?: string;
  products: Product[];
  actionLabel: string;
  actionLink: string;
}

interface NotificationsPageProps {
  notifications: Notification[];
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ notifications }) => (
  <div className="col-span-12 lg:col-span-9">
    <NotificationsActions notifications={notifications} />
  </div>
);

export default NotificationsPage;
