import { IOrder } from "@/lib/types/orders";
import { OrderStatus } from "@/config/orderStatusConfig";

const mockOrders: Record<string, IOrder[]> = {
  current: [
    {
      id: "1",
      status: "pending" as OrderStatus,
      remainingTime: "23:45:12",
      orderNumber: "DKC-123456",
      totalAmount: "2,400,000",
      statusDate: "1402/12/25",
      statusTime: "12:30",
      products: [
        { id: "p5", name: "شلوار لیوایز LVZ78", image: "/images/products/p5.png", link: "/product-detail" },
        { id: "p5", name: "شلوار لیوایز LVZ78", image: "/images/products/p2.png", link: "/product-detail" },
        { id: "p5", name: "شلوار لیوایز LVZ78", image: "/images/products/p4.png", link: "/product-detail" },
      ],
    },
    {
      id: "2",
      status: "processing" as OrderStatus,
      orderNumber: "DKC-123457",
      totalAmount: "3,500,000",
      statusDate: "1402/12/26",
      statusTime: "14:00",
      products: [{ id: "p5", name: "شلوار لیوایز LVZ78", image: "/images/products/p5.png", link: "/product-detail" }],
    },
  ],
  delivered: [
    {
      id: "3",
      status: "delivered" as OrderStatus,
      orderNumber: "DKC-123458",
      totalAmount: "5,200,000",
      statusDate: "1402/12/27",
      statusTime: "09:15",
      products: [{ id: "p5", name: "شلوار لیوایز LVZ78", image: "/images/products/p5.png", link: "/product-detail" }],
    },
  ],
  canceled: [
    {
      id: "4",
      status: "canceled" as OrderStatus,
      remainingTime: "00:30:00",
      orderNumber: "DKC-123459",
      totalAmount: "1,800,000",
      statusDate: "1402/12/28",
      statusTime: "16:45",
      products: [{ id: "p5", name: "شلوار لیوایز LVZ78", image: "/images/products/p5.png", link: "/product-detail" }],
    },
  ],
};

export const fetchOrdersByTab = async (
  tab: string,
  page: number = 1,
  itemsPerPage: number = 10
): Promise<{ orders: IOrder[]; total: number }> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const orders = mockOrders[tab] || [];
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return {
    orders: orders.slice(start, end),
    total: orders.length,
  };
};
