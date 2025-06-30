'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import Link from 'next/link';
import { OrderProductItem } from '@/types/orderType';
import Image from 'next/image';

interface ProductSliderProps {
  orderProductItems: OrderProductItem[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ orderProductItems }) => {
  return (
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
        {orderProductItems.map((item) => {
          const product = item?.product || item?.productVariant?.product;
          const productName = product?.name || '';
          const productSlug = product?.slug || '';
          const productImageUrl =
            item?.product?.mainImage?.fileUrl || item?.productVariant?.product?.mainImage?.fileUrl || '/images/no-image.webp';

          return (
            <SwiperSlide key={item?.id}>
              <Link
                href={`/product/${productSlug}`}
                className="
              flex items-center gap-x-3 rounded-xl border border-gray-100 bg-white
              px-2 py-2 shadow-sm transition hover:shadow-lg hover:border-primary
            "
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                  <Image alt={productName} src={productImageUrl} className="object-contain w-14 h-14" width={60} height={60} unoptimized />
                </div>
                <p className="line-clamp-2 text-xs sm:text-sm text-gray-700 font-medium">{productName}</p>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
