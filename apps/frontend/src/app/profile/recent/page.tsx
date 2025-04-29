import RecentActions from "@/components/profile/Recent/RecentActions";

interface Recent {
  id: string;
  image: string;
  title: string;
  link: string;
  isAvailable: boolean;
}

export default function Page() {
  const recent: Recent[] = [
    {
      id: "1",
      image: "/images/products/p8.png",
      title: "کیف دوشی زنانه درسا مدل 49787",
      link: "/product-detail",
      isAvailable: true,
    },
    {
      id: "2",
      image: "/images/products/p8.png",
      title: "کیف دوشی زنانه درسا مدل 49787",
      link: "/product-detail",
      isAvailable: false,
    },
    // More favorites...
  ];

  return <RecentActions recent={recent} />;
}
