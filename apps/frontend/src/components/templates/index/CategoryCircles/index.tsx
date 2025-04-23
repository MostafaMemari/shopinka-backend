"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "جوراب مردانه",
    image: "/images/categories/c1.jpg",
    link: "/shop",
  },
  {
    id: 2,
    title: "کفش ورزشی مردانه",
    image: "/images/categories/c3.jpg",
    link: "/shop",
  },
  {
    id: 3,
    title: "کیف مردانه",
    image: "/images/categories/c6.jpg",
    link: "/shop",
  },
  {
    id: 4,
    title: "جوراب زنانه",
    image: "/images/categories/c2.jpg",
    link: "/shop",
  },
  {
    id: 5,
    title: "کفش ورزشی زنانه",
    image: "/images/categories/c4.jpg",
    link: "/shop",
  },
  {
    id: 6,
    title: "کیف زنانه",
    image: "/images/categories/c5.jpg",
    link: "/shop",
  },
];

const CategoryCircles = () => {
  return (
    <section className="mb-8">
      <style jsx>{`
        .border-gradient {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        }
        .border-gradient::before {
          content: "";
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          background: #fff;
          border-radius: 9999px;
          z-index: -1;
        }
      `}</style>
      <div className="container relative mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-8 lg:justify-between">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="relative flex w-25 flex-col items-center justify-between gap-y-1.5 sm:w-auto sm:gap-y-2.5"
            >
              <div className="border-gradient group relative rounded-full p-px before:absolute before:-inset-px before:h-[calc(100%+2px)] before:w-[calc(100%+2px)] before:rounded-full">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={100}
                  height={100}
                  className="relative h-25 w-25 rounded-full object-cover"
                />
              </div>
              <p className="line-clamp-2 h-10 text-center text-sm sm:text-base">{category.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCircles;
