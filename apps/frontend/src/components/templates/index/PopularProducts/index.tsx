import CarouselProduct from "@/components/ui/CarouselProduct";

const PopularProducts = () => {
  const products = [
    {
      id: "1",
      imageSrc: "/images/products/p1.png",
      title: "کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2",
      oldPrice: 150000,
      newPrice: 100000,
      discount: 5,
      productLink: "/products/1",
    },
    {
      id: "2",
      imageSrc: "/images/products/p2.png",
      title: "کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2",
      oldPrice: 150000,
      newPrice: 100000,
      discount: 5,
      productLink: "/products/2",
    },
    {
      id: "3",
      imageSrc: "/images/products/p3.png",
      title: "کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2",
      newPrice: 100000,
      productLink: "/products/3",
    },
    {
      id: "4",
      imageSrc: "/images/products/p2.png",
      title: "کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2",
      oldPrice: 150000,
      newPrice: 100000,
      discount: 5,
      productLink: "/products/4",
    },
    {
      id: "5",
      imageSrc: "/images/products/p2.png",
      title: "کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2",
      oldPrice: 150000,
      newPrice: 100000,
      discount: 5,
      productLink: "/products/5",
    },
    {
      id: "6",
      imageSrc: "/images/products/p2.png",
      title: "کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2",
      oldPrice: 150000,
      newPrice: 100000,
      discount: 5,
      productLink: "/products/6",
    },
  ];

  return (
    <>
      <CarouselProduct title="محبوب ترین محصولات" viewAllLink="/shop" products={products} />
    </>
  );
};

export default PopularProducts;
