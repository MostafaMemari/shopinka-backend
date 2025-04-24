"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{ src: string; alt: string }>;
  title: string;
}

export default function GalleryModal({ isOpen, onClose, images, title }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setThumbsSwiper(null);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className={`relative w-full max-w-[90%] max-h-[80%] sm:max-w-3xl md:max-w-4xl transform transition-all duration-200 ease-out          ${isClosing ? "animate-modalOut" : "animate-modalIn"}`}
      >
        <div className="divide-y overflow-hidden rounded-lg bg-muted shadow-sm ring-1 ring-gray-100 dark:ring-white/5">
          {/* Header */}
          <div className="px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="line-clamp-1 text-sm md:text-lg">{title}</h3>
              <button className="text-gray-500 hover:text-gray-700 transition-colors" onClick={handleClose} type="button">
                <HiX className="h-5 w-5" />
                <span className="sr-only">بستن</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Main Slider */}
            <div className="border-b p-4 sm:p-6">
              <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                pagination={{ clickable: true }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                className="product-image-desktop-swiper"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain transition-transform duration-300"
                        priority={index === 0}
                      />
                    </div>
                  </SwiperSlide>
                ))}
                <div className="swiper-pagination"></div>
                <div className="swiper-button-next hidden md:flex"></div>
                <div className="swiper-button-prev hidden md:flex"></div>
              </Swiper>
            </div>

            {/* Thumbnail Slider */}
            <div className="p-4 sm:p-6">
              <Swiper
                modules={[Navigation, Thumbs]}
                onSwiper={setThumbsSwiper}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                watchSlidesProgress
                slidesPerView="auto"
                breakpoints={{
                  0: { slidesPerView: 3, spaceBetween: 8 },
                  640: { slidesPerView: 4, spaceBetween: 10 },
                  1024: { slidesPerView: 5, spaceBetween: 12 },
                }}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="cursor-pointer flex justify-center items-center rounded-lg border p-2 transition-all hover:border-primary">
                      <div className="relative h-20 w-20 sm:h-24 sm:w-24">
                        <Image src={image.src} alt={image.alt} fill className="object-contain" sizes="(max-width: 640px) 80px, 96px" />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="swiper-button-next hidden md:flex"></div>
                <div className="swiper-button-prev hidden md:flex"></div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .animate-modalIn {
          animation: modalFadeIn 0.3s ease-out;
        }
        .animate-modalOut {
          animation: modalFadeOut 0.2s ease-in;
        }
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes modalFadeOut {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
