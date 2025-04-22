import "swiper/css";
import "swiper/css/navigation";

import ProductSlider from "@/components/ui/ProductSlider";

const PopularProducts = () => {
  const products = [
    {
      id: "1",
      imageSrc: "/images/products/p1.png",
      title: "کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2",
      oldPrice: 150000,
      newPrice: 100000,
      discount: 5,
      productLink: "/",
    },
    {
      id: "2",
      imageSrc: "/images/products/p2.png",
      title: "کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2",
      oldPrice: 150000,
      newPrice: 100000,
      discount: 5,
      productLink: "/",
    },
    {
      id: "3",
      imageSrc: "/images/products/p3.png",
      title: "کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2",
      newPrice: 100000,
      productLink: "/",
    },
    {
      id: "4",
      imageSrc: "/images/products/p2.png",
      title: "کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2",
      oldPrice: 150000,
      newPrice: 100000,
      discount: 5,
      productLink: "/",
    },
    {
      id: "5",
      imageSrc: "/images/products/p2.png",
      title: "کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2",
      oldPrice: 150000,
      newPrice: 100000,
      discount: 5,
      productLink: "/",
    },
    {
      id: "6",
      imageSrc: "/images/products/p2.png",
      title: "کفش پیاده روی مردانه نیو بالانس مدل Mdrftlm2",
      oldPrice: 150000,
      newPrice: 100000,
      discount: 5,
      productLink: "/",
    },
  ];

  return (
    <>
      <ProductSlider title="محبوب ترین محصولات" viewAllLink="/shop" products={products} />
    </>
  );
};

export default PopularProducts;
