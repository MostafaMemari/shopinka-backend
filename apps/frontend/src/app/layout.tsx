import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./tailwind.css";
import Header from "@/components/layout/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "صفجه اصلی | فروشگاه اینترنتی شاپینکا",
  description: "مرجع فروش انواع برچسب های ماشین",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <header>
            <Header />
          </header>
          <div className="fixed inset-x-0 top-1/3 mx-auto h-1/3 w-1/4 bg-primary/50 blur-[200px]"></div>

          <main className="grow bg-background pb-14 pt-36 xs:pt-36">{children}</main>
        </div>
      </body>
    </html>
  );
}
