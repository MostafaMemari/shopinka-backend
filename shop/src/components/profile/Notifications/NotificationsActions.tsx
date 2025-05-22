'use client';

import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaBellSlash } from 'react-icons/fa';
import DashboardHeader from '../DashboardHeader';
import NotificationItem from './NotificationItem';

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

interface NotificationsActionsProps {
  notifications: Notification[];
}

const NotificationsActions: React.FC<NotificationsActionsProps> = ({ notifications: initialNotifications }) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleDeleteAll = () => {
    setNotifications([]);
    // می‌تونی اینجا API کال بزنی برای حذف همه
  };

  return (
    <>
      <div className="mb-16 flex flex-col items-center justify-between gap-y-8 xs:flex-row">
        <DashboardHeader title="پیام های شما" />
        <button className="btn-red w-full px-4 py-2 xs:w-fit" onClick={handleDeleteAll}>
          حذف همه
        </button>
      </div>
      {notifications.length === 0 ? (
        <div className="flex justify-center">
          <div className="flex flex-col items-center justify-center gap-y-4 text-text/60">
            <FaBellSlash className="h-20 w-20" />
            <p className="md:text-xl">لیست پیام های شما خالی میباشد</p>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4 divide-y">
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-x-4 md:justify-end">
            <a className="pagination-button flex items-center justify-center" href="#">
              <FaChevronRight className="h-6 w-6" />
            </a>
            <div className="flex items-center gap-x-2">
              <a className="pagination-button pagination-button-active" href="#">
                1
              </a>
              <p className="text-sm text-text/60">...</p>
              <a className="pagination-button" href="#">
                3
              </a>
              <a className="pagination-button" href="#">
                4
              </a>
              <p className="text-sm text-text/60">...</p>
              <a className="pagination-button" href="#">
                10
              </a>
            </div>
            <a
              className="flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-all duration-200 hover:bg-primary hover:text-white dark:hover:bg-emerald-600"
              href="#"
            >
              <FaChevronLeft className="h-6 w-6" />
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default NotificationsActions;
