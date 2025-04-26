"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

// Interface for menu links
interface MenuLink {
  id: string;
  label: string;
  href: string;
}

// Interface for social links
interface SocialLink {
  id: string;
  name: string;
  href: string;
  icon: string; // Icon identifier for sprite sheet or inline SVG
}

interface TrustBadge {
  id: string;
  name: string;
  imageSrc: string;
  href: string;
  isTest?: boolean;
}

interface Props {
  supportPhone?: string;
  supportText?: string;
  subscribeText?: string;
  menuLinks1?: MenuLink[];
  menuLinks2?: MenuLink[];
  socialLinks?: SocialLink[];
  trustBadges?: TrustBadge[];
  copyrightText?: string;
}

export default function Footer({
  supportPhone = "021-0000000",
  supportText = "۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم",
  subscribeText = "از جدیدترین تخفیف ها با خبر شوید",
  menuLinks1 = [
    { id: "1", label: "شرایط مرجوعی", href: "/return-terms" },
    { id: "2", label: "راهنمای خرید", href: "/how-to-buy" },
    { id: "3", label: "قوانین و مقررات", href: "/rules-and-terms" },
    { id: "4", label: "چرا روتی کالا", href: "/why-us" },
  ],
  menuLinks2 = [
    { id: "1", label: "پیگیری سفارشات", href: "/profile-orders" },
    { id: "2", label: "تماس با ما", href: "/contact" },
    { id: "3", label: "سوالات متداول", href: "/faq" },
    { id: "4", label: "درباره ما", href: "/about" },
  ],
  socialLinks = [
    { id: "1", name: "instagram", href: "#", icon: "instagram" },
    { id: "2", name: "twitter", href: "#", icon: "twitter" },
    { id: "3", name: "aparat", href: "#", icon: "aparat" },
  ],
  trustBadges = [
    { id: "1", name: "namad", imageSrc: "/images/namad.png", href: "#", isTest: true },
    { id: "2", name: "samandehi", imageSrc: "/images/samandehi.png", href: "#", isTest: true },
  ],
  copyrightText = "کلیه حقوق این سایت متعلق به فروشگاه روتی کالا می‌باشد.",
}: Props) {
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
    <footer className="relative border-t bg-muted">
      <div className="absolute inset-x-0 -top-3 flex items-center justify-center">
        <div className="relative flex h-10 w-14 justify-center">
          <div className="absolute inset-0 -top-[2px] h-full w-full rounded-full bg-muted blur-[6px]"></div>
          <svg className="relative h-5 w-5 text-gray-200" xmlns="http://www.w3.org/2000/svg" width="135" height="90" viewBox="0 0 14 14">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="7" cy="7" r="6.5" />
              <path d="M.5 7h13m-4 0A11.22 11.22 0 0 1 7 13.5A11.22 11.22 0 0 1 4.5 7A11.22 11.22 0 0 1 7 .5A11.22 11.22 0 0 1 9.5 7Z" />
            </g>
          </svg>
        </div>
      </div>

      <div className="container">
        <div className="mt-10 flex flex-col items-center justify-between gap-y-4 md:flex-row">
          <div className="flex flex-col items-center gap-x-4 gap-y-4 text-sm text-text/60 md:flex-row">
            <p>تلفن پشتیبانی {supportPhone}</p>
            <span className="hidden h-4 w-px rounded-full bg-border md:block"></span>
            <p>{supportText}</p>
          </div>
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
        </div>

        <div className="relative mb-10 mt-10 flex flex-col items-center justify-between gap-x-4 gap-y-8 rounded-xl bg-background px-10 py-4 shadow-base backdrop-blur-3xl md:flex-row">
          <div>
            <p className="text-sm text-text/60">{subscribeText}</p>
          </div>
          <div className="w-full flex-1 grow md:max-w-lg">
            <div className="flex w-full items-center justify-between gap-x-2 rounded-lg bg-muted">
              <label className="sr-only" htmlFor="emailInput" id="email-label">
                ایمیل
              </label>
              <input
                aria-labelledby="email-label"
                autoComplete="off"
                className="w-full border-none bg-transparent px-4 py-2.5 text-right text-text/90 outline-hidden placeholder:text-right placeholder:text-sm placeholder:text-text/60 focus:outline-hidden focus:ring-0 placeholder:"
                dir="ltr"
                id="emailInput"
                placeholder="ایمیل شما"
                type="text"
              />
              <button className="btn-primary ml-1 w-24 py-2 text-sm">ثبت</button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-x-6 md:gap-x-6">
            {socialLinks.map((link) => (
              <div
                key={link.id}
                className={`transition-colors duration-200 ${
                  link.name === "instagram" ? "hover:text-rose-600" : link.name === "twitter" ? "hover:text-blue-500" : "hover:text-red-600"
                }`}
              >
                <a aria-label={`Follow us on ${link.name}`} href={link.href} target="_blank" rel="noopener noreferrer">
                  <div className="sr-only">{`${link.name} link`}</div>
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={
                        link.name === "instagram"
                          ? "M7 7h10v10H7V7zm5 6a1 1 0 100-2 1 1 0 000 2zm3-5h2v2h-2V8z"
                          : link.name === "twitter"
                            ? "M22 4s-.7.3-1.5.5c.8-.5 1.4-1.3 1.6-2.3-.7.4-1.5.7-2.3.8-1.3-1.4-3.5-1.5-4.8-.3-1 1-1.3 2.5-.8 3.8C10.5 6 5.7 3.5 2.5 1.3 1.3 3.3 1.8 5.8 3.5 7.3c-.7 0-1.3-.2-1.8-.5 0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.8 0 .5 1.6 2 2.8 3.8 2.8-1.4 1.1-3.2 1.8-5.1 1.8-.3 0-.7 0-1-.1 1.9 1.2 4.1 1.9 6.5 1.9 7.8 0 12.1-6.5 12.1-12.1V4z"
                            : "M3 3h18v18H3V3zm6 12h6v-2h-6v2zm0-4h6V9h-6v2zm0-4h6V5h-6v2z"
                      }
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-y-10">
          <div className="col-span-12 md:col-span-6">
            <div className="grid grid-cols-12 justify-items-center md:justify-items-start">
              <div className="col-span-6 flex flex-col gap-y-6">
                <p className="select-none text-lg">روتی کالا</p>
                <ul className="space-y-4 text-gray-400">
                  {menuLinks1.map((link) => (
                    <li key={link.id}>
                      <Link className="py-2 hover:text-primary hover:" href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-6 flex flex-col gap-y-6">
                <p className="select-none text-lg">دسترسی سریع</p>
                <ul className="space-y-4 text-gray-400">
                  {menuLinks2.map((link) => (
                    <li key={link.id}>
                      <Link className="py-2 hover:text-primary hover:" href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-12 flex items-center justify-center gap-x-2 md:col-span-6 md:justify-end">
            {trustBadges.map((badge) => (
              <a key={badge.id} href={badge.href} className="relative" target="_blank" rel="noopener noreferrer">
                <Image alt={badge.name} className="h-[130px] w-[130px]" src={badge.imageSrc} width={130} height={130} priority={false} />
                {badge.isTest && (
                  <span className="absolute inset-x-0 top-0 mx-auto w-fit rounded-lg bg-warning px-4 py-2 text-white dark:bg-red-600">
                    تستی
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center border-t py-4">
          <p className="text-xs text-text/60 xs:text-sm">{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
