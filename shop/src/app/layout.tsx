import type { Metadata } from 'next';
import './globals.css';
import './tailwind.css';
import { iranyekan } from '@/fonts/iranyekan';
import ClientProvider from './ClientProvider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import BottomNav from '@/shared/components/BottomNav';

export const metadata: Metadata = {
  title: 'صفجه اصلی | فروشگاه اینترنتی شاپینکا',
  description: 'مرجع فروش انواع برچسب های ماشین',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${iranyekan} antialiased`}>
        <BottomNav />

        <ClientProvider>
          <div className="flex min-h-screen flex-col">
            <NuqsAdapter>{children}</NuqsAdapter>
          </div>
        </ClientProvider>
      </body>
    </html>
  );
}
