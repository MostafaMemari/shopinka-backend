"use client";

import { FC, useEffect } from "react";

const ScrollTopButton: FC = () => {
  useEffect(() => {
    const scrollTopButton = document.getElementById("scroll-top-button-footer");
    if (scrollTopButton) {
      scrollTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
    return () => {
      if (scrollTopButton) {
        scrollTopButton.removeEventListener("click", () => {});
      }
    };
  }, []);

  return (
    <div className="order-first flex md:order-last">
      <button className="inline-flex items-center gap-x-2 rounded-lg border p-2 text-sm" id="scroll-top-button-footer" type="button">
        <span>برگشت به بالا</span>
        <span aria-hidden="true">
          <svg className="h-5 w-5 lg:h-6 lg:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default ScrollTopButton;
