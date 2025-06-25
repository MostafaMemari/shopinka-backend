import './globals.css';
import './tailwind.css';
import { iranyekan } from '@/fonts/iranyekan';
import ClientProvider from './ClientProvider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from 'react';
import Loading from './loading';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata = {
  title: {
    default: 'فروشگاه اینترنتی شاپینکا',
    template: 'شاپینکا - %s',
  },
  description:
    'هر آنچه که نیاز دارید با بهترین قیمت از شاپینکا بخرید! جدیدترین انواع گوشی موبایل، لپ تاپ، لباس، لوازم آرایشی و بهداشتی، کتاب، لوازم خانگی، خودرو و... با امکان تعویض و مرجوعی آسان | ✓ارسال رايگان ✓پرداخت در محل ✓ضمانت بازگشت کالا - برای خرید کلیک کنید!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${iranyekan} antialiased`}>
        <NextTopLoader showSpinner={false} color="#b22222" />
        <Suspense>
          <ScrollToTop />
        </Suspense>

        <ClientProvider>
          <div className="flex min-h-screen flex-col">
            <NuqsAdapter>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </NuqsAdapter>
          </div>
        </ClientProvider>
      </body>
    </html>
  );
}
