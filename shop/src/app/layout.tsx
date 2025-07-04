import './globals.css';
import './tailwind.css';
import { iranyekan } from '@/fonts/iranyekan';
import ClientProvider from './ClientProvider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from 'react';
import Loading from './loading';
import ScrollToTop from '@/components/ui/ScrollToTop';

export const metadata = {
  title: {
    default: 'فروشگاه اینترنتی شاپینکا',
    template: 'شاپینکا - %s',
  },
  description:
    'خرید آنلاین انواع برچسب ماشین با طراحی خاص و کیفیت بالا از فروشگاه شاپینکا! انواع استیکر بدنه، شیشه، داخل خودرو، برچسب نوشته‌دار، اسپرت، خفن و فانتزی با امکان ارسال سریع، قیمت مناسب و قابلیت سفارشی‌سازی.',
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
