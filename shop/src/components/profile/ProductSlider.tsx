'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  image: string;
  link: string;
}

interface ProductSliderProps {
  products: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => (
  <div className="orders-product-swiper p-4">
    <Swiper
      slidesPerView={1.1}
      spaceBetween={10}
      freeMode={true}
      modules={[FreeMode]}
      breakpoints={{
        360: { slidesPerView: 1.2, spaceBetween: 10 },
        460: { slidesPerView: 1.6, spaceBetween: 10 },
        640: { slidesPerView: 2.2, spaceBetween: 10 },
        1380: { slidesPerView: 3.1, spaceBetween: 10 },
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <Link href={product.link} className="flex items-center gap-x-2 rounded-lg border p-2">
            <img alt={product.name} className="w-20" src={product.image} />
            <p className="line-clamp-2 text-sm">{product.name}</p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default ProductSlider;
