import Profile from "@/components/profile/Profile";

export default function Page() {
  const mockOrders = [
    {
      id: "1",
      status: "pending" as const,
      remainingTime: "23:45:12",
      orderNumber: "DKC-123456",
      totalAmount: "2,400,000",
      statusLabel: "در حال پردازش",
      progress: 30,
      statusDate: "1402/12/25",
      statusTime: "12:30",
    },
  ];

  return (
    <Profile
      favoriteCount={5}
      notificationCount={3}
      currentOrders={2}
      deliveredOrders={10}
      canceledOrders={1}
      returnedOrders={0}
      orders={mockOrders}
    />
  );
}
