import { Navigation, FreeMode } from "swiper/modules";

export const defaultSwiperConfig = {
  freeMode: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  modules: [Navigation, FreeMode],
};

export const blogSwiperConfig = {
  slidesPerView: 1.7,
  spaceBetween: 14,
  breakpoints: {
    360: { slidesPerView: 2, spaceBetween: 10 },
    460: { slidesPerView: 2.5, spaceBetween: 15 },
    640: { slidesPerView: 3, spaceBetween: 10 },
    768: { slidesPerView: 3.2, spaceBetween: 15 },
    1024: { slidesPerView: 4, spaceBetween: 20 },
    1380: { slidesPerView: 4, spaceBetween: 20 },
  },
};
export const productSwiperConfig = {
  slidesPerView: 1.5,
  spaceBetween: 14,
  breakpoints: {
    360: { slidesPerView: 2, spaceBetween: 10 },
    460: { slidesPerView: 2.5, spaceBetween: 10 },
    640: { slidesPerView: 3, spaceBetween: 10 },
    768: { slidesPerView: 3.5, spaceBetween: 10 },
    1024: { slidesPerView: 4.5, spaceBetween: 10 },
    1380: { slidesPerView: 6, spaceBetween: 10 },
  },
};

export const searchBarSwiperConfig = {
  slidesPerView: 1.3,
  spaceBetween: 10,
  breakpoints: {
    360: { slidesPerView: 1.5, spaceBetween: 10 },
    460: { slidesPerView: 2.1, spaceBetween: 10 },
    640: { slidesPerView: 2.5, spaceBetween: 10 },
    768: { slidesPerView: 2.1, spaceBetween: 10 },
    1024: { slidesPerView: 2.2, spaceBetween: 10 },
    1380: { slidesPerView: 2.5, spaceBetween: 10 },
  },
};
