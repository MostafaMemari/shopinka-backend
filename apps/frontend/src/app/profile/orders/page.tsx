import OrdersPage from "@/components/profile/OrdersPage";

interface Order {
  id: string;
  status: "pending" | "paid";
  remainingTime?: string;
  orderNumber: string;
  totalAmount: string;
  date?: string;
  statusLabel: string;
  progress: number;
  statusDate: string;
  statusTime: string;
  statusColor: string;
  products?: {
    id: string;
    name: string;
    image: string;
    link: string;
  }[];
}

export default function Page() {
  const pendingOrders: Order[] = [
    {
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
    },
    // More pending orders...
  ];

  const filteredOrders = {
    current: [
      {
        id: "2",
        status: "paid",
        orderNumber: "#102030",
        totalAmount: "122,800,000",
        date: "03 / شهریور / 1402",
        statusLabel: "در انتظار تایید",
        progress: 25,
        statusDate: "11 / 06 / 1402",
        statusTime: "ساعت 08:20",
        statusColor: "text-yellow-500 dark:text-yellow-400",
        products: [
          { id: "p1", name: "کفش اسپورت نایک NKslwS2", image: "/images/products/p1.png", link: "/product-detail" },
          { id: "p1", name: "کفش اسپورت نایک NKslwS2", image: "/images/products/p1.png", link: "/product-detail" },
          { id: "p1", name: "کفش اسپورت نایک NKslwS2", image: "/images/products/p1.png", link: "/product-detail" },
          // More products...
        ],
      },
      // More current orders...
    ] as Order[],
    delivered: [] as Order[],
    canceled: [] as Order[],
    returned: [] as Order[],
  };
  return <OrdersPage pendingOrders={pendingOrders} filteredOrders={filteredOrders} />;
}
