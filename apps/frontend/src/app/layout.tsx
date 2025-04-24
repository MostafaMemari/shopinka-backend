import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./tailwind.css";
import Header from "@/components/modules/Header/Header";
import Footer from "@/components/modules/Footer";

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
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <header>
            <Header />
          </header>

          <main className="grow bg-background pb-14 pt-36 xs:pt-36">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
