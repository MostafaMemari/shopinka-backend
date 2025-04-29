import OrderDetailsPage from "@/components/profile/Order/OrderDetailsPage";

interface Order {
  id: string;
  status: "pending" | "paid";
  remainingTime?: string;
  orderNumber: string;
  totalAmount: string;
  statusLabel: string;
  progress: number;
  statusDate: string;
  statusTime: string;
  statusColor: string;
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

export default function Page() {
  const order: Order = {
    id: "1",
    status: "pending",
    remainingTime: "10 دقیقه",
    orderNumber: "#102030",
    totalAmount: "1,800,000",
    statusLabel: "در انتظار پرداخت",
    progress: 0,
    statusDate: "",
    statusTime: "",
    statusColor: "text-yellow-500 dark:text-yellow-400",
  };

  const costs = [
    { label: "مبلغ مرسوله", value: "122,800,000", color: "text-primary" },
    { label: "تخفیف کالا ها", value: "122,800,000", color: "text-red-500 dark:text-red-400" },
    { label: "کد تخفیف", value: "122,800,000", color: "text-red-500 dark:text-red-400" },
  ];

  const shipping = [
    { label: "روش ارسال", value: "پست تیپاکس", color: "text-sm text-text/90 md:text-base" },
    { label: "هزینه ارسال", value: "122,800,000", color: "text-primary" },
    { label: "کد پیگیری مرسوله", value: "ثبت نشده", color: "text-sm text-text/90 md:text-base" },
  ];

  const address = {
    address: "استان تهران شهر تهران - خیابان گاندی جنوبی - نبش خیابان ۲۱ - پلاک ۲۸",
    recipient: "تایماز اکبری",
  };

  const items: OrderItem[] = [
    {
      id: "1",
      image: "/images/products/p7.png",
      title: "کیف دستی دلسی مدل CHATELET AIR 2.0 کد 1676350",
      variant: { color: "#782f2f", name: "قهوه ای" },
      discount: "122,800,000",
      quantity: 1,
      price: "1,200,000",
    },
    {
      id: "2",
      image: "/images/products/p7.png",
      title: "کیف دستی دلسی مدل CHATELET AIR 2.0 کد 1676350",
      variant: { color: "#782f2f", name: "قهوه ای" },
      quantity: 2,
      price: "1,200,000",
      originalPrice: "110,000",
    },
  ];

  return <OrderDetailsPage order={order} costs={costs} shipping={shipping} address={address} items={items} />;
}
