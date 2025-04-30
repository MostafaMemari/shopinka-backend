export const mockProductDetails = {
  id: "1",
  title: "کفش ورزشی ناییک",
  slug: "nike-sport-shoe",
  newPrice: 100000,
  oldPrice: 200000,
  discount: 50,
  status: "in_stock",
  specifications: "لورم تستی",
  description: "این کفش برای فعالیت‌های ورزشی و استفاده روزمره طراحی شده است.",

  mainImage: {
    src: "/images/products/p1.png",
    alt: "تصویر اصلی محصول",
  },

  gallery: [
    { src: "/images/products/p2.png", alt: "تصویر محصول 2" },
    { src: "/images/products/p3.png", alt: "تصویر محصول 3" },
    { src: "/images/products/p4.png", alt: "تصویر محصول 4" },
    { src: "/images/products/p5.png", alt: "تصویر محصول 5" },
  ],

  properties: [
    { title: "جنس زیره", values: ["چرم مصنوعی"] },
    { title: "نحوه بسته شدن", values: ["بند دار"] },
    { title: "جنس", values: ["پارچه‌ای", "نخی"] },
  ],

  breadcrumb: [
    { label: "کفش", href: "/products/shoes" },
    { label: "نایک", href: "/products/shoes/nike" },
  ],

  comments: [
    {
      id: "1",
      title: "با این قیمت کاملا مناسب و خوبه",
      content: "برا کسایی که نمیخوان هزینه بالایی کنن گزینه خیلی خوبیه",
      date: "10 شهریور 1403",
      isRecommended: true,
      isBuyer: true,
      likes: 32,
      dislikes: 76,
      replies: [
        {
          id: "2",
          title: "با این قیمت اصلا مناسب نیست",
          content: "اصلا خوب نیست",
          date: "20 شهریور 1403",
          isRecommended: false,
          isBuyer: true,
          likes: 100,
          dislikes: 100,
        },
      ],
    },
  ],
};

export const specialOfferProducts = [
  {
    id: "1",
    imageSrc: "/images/products/p7.png",
    title: "کفش ورزشی مردانه آدیداس مدل Ultraboost 22",
    newPrice: 100000,
    productLink: "/products/1",
    oldPrice: 200000,
    discount: 25,
  },
  {
    id: "2",
    imageSrc: "/images/products/p8.png",
    title: "کتانی زنانه نایک ایرمکس 270 با طراحی روزمره",
    newPrice: 100000,
    productLink: "/products/2",
    oldPrice: 200000,
    discount: 25,
  },
  {
    id: "3",
    imageSrc: "/images/products/p9.png",
    title: "صندل راحتی طبی زنانه مدل Ortho Soft",
    newPrice: 100000,
    productLink: "/products/3",
    oldPrice: 200000,
    discount: 25,
  },
  {
    id: "4",
    imageSrc: "/images/products/p2.png",
    title: "کفش پیاده‌روی اسکیچرز مردانه مدل Go Walk 6",
    newPrice: 100000,
    productLink: "/products/4",
    oldPrice: 200000,
    discount: 25,
  },
  {
    id: "5",
    imageSrc: "/images/products/p5.png",
    title: "بوت چرمی مردانه کاترپیلار مدل Colorado",
    newPrice: 100000,
    productLink: "/products/5",
    oldPrice: 200000,
    discount: 25,
  },
  {
    id: "6",
    imageSrc: "/images/products/p4.png",
    title: "کفش ورزشی دخترانه ریباک مدل Classic Legacy",
    newPrice: 100000,
    productLink: "/products/6",
    oldPrice: 200000,
    discount: 25,
  },
];

export const latestProducts = [
  {
    id: "1",
    imageSrc: "/images/products/p1.png",
    title: "کفش ورزشی مردانه آدیداس مدل Ultraboost 22",
    newPrice: 100000,
    productLink: "/products/1",
  },
  {
    id: "2",
    imageSrc: "/images/products/p2.png",
    title: "کتانی زنانه نایک ایرمکس 270 با طراحی روزمره",
    newPrice: 100000,
    productLink: "/products/2",
  },
  {
    id: "3",
    imageSrc: "/images/products/p3.png",
    title: "صندل راحتی طبی زنانه مدل Ortho Soft",
    newPrice: 100000,
    productLink: "/products/3",
  },
  {
    id: "4",
    imageSrc: "/images/products/p4.png",
    title: "کفش پیاده‌روی اسکیچرز مردانه مدل Go Walk 6",
    newPrice: 100000,
    productLink: "/products/4",
  },
  {
    id: "5",
    imageSrc: "/images/products/p5.png",
    title: "بوت چرمی مردانه کاترپیلار مدل Colorado",
    newPrice: 100000,
    productLink: "/products/5",
  },
  {
    id: "6",
    imageSrc: "/images/products/p6.png",
    title: "کفش ورزشی دخترانه ریباک مدل Classic Legacy",
    newPrice: 100000,
    productLink: "/products/6",
  },
];

export const popularProducts = [
  {
    id: "1",
    imageSrc: "/images/products/p7.png",
    title: "کفش ورزشی مردانه آدیداس مدل Ultraboost 22",
    newPrice: 100000,
    productLink: "/products/1",
  },
  {
    id: "2",
    imageSrc: "/images/products/p8.png",
    title: "کتانی زنانه نایک ایرمکس 270 با طراحی روزمره",
    newPrice: 100000,
    productLink: "/products/2",
  },
  {
    id: "3",
    imageSrc: "/images/products/p9.png",
    title: "صندل راحتی طبی زنانه مدل Ortho Soft",
    newPrice: 100000,
    productLink: "/products/3",
  },
  {
    id: "4",
    imageSrc: "/images/products/p2.png",
    title: "کفش پیاده‌روی اسکیچرز مردانه مدل Go Walk 6",
    newPrice: 100000,
    productLink: "/products/4",
  },
  {
    id: "5",
    imageSrc: "/images/products/p5.png",
    title: "بوت چرمی مردانه کاترپیلار مدل Colorado",
    newPrice: 100000,
    productLink: "/products/5",
  },
  {
    id: "6",
    imageSrc: "/images/products/p4.png",
    title: "کفش ورزشی دخترانه ریباک مدل Classic Legacy",
    newPrice: 100000,
    productLink: "/products/6",
  },
];
