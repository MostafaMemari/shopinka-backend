export const defaultSwiperConfig = {
  slidesPerView: 1.5,
  spaceBetween: 14,
  freeMode: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    360: { slidesPerView: 2, spaceBetween: 10 },
    460: { slidesPerView: 2.5, spaceBetween: 10 },
    640: { slidesPerView: 3, spaceBetween: 10 },
    768: { slidesPerView: 3.5, spaceBetween: 10 },
    1024: { slidesPerView: 4.5, spaceBetween: 10 },
    1380: { slidesPerView: 6, spaceBetween: 10 },
  },
};
