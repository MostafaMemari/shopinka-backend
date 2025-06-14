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
  <div className="orders-product-swiper px-2 mb-4">
    <Swiper
      slidesPerView={1.1}
      spaceBetween={12}
      freeMode
      modules={[FreeMode]}
      breakpoints={{
        360: { slidesPerView: 1.2, spaceBetween: 12 },
        460: { slidesPerView: 1.6, spaceBetween: 14 },
        640: { slidesPerView: 2.2, spaceBetween: 14 },
        1000: { slidesPerView: 3.2, spaceBetween: 16 },
        1380: { slidesPerView: 4.1, spaceBetween: 18 },
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <Link
            href={product.link}
            className="
              flex items-center gap-x-3 rounded-xl border border-gray-100 bg-white
              px-2 py-2 shadow-sm transition hover:shadow-lg hover:border-primary
            "
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
              <img alt={product.name} src={product.image} className="object-contain w-14 h-14" loading="lazy" />
            </div>
            <p className="line-clamp-2 text-xs sm:text-sm text-gray-700 font-medium">{product.name}</p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default ProductSlider;
