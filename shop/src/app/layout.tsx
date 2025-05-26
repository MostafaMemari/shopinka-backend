import type { Metadata } from 'next';
import './globals.css';
import './tailwind.css';
import { iranyekan } from '@/fonts/iranyekan';

import ClientProvider from './ClientProvider';

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
        <ClientProvider>
          <div className="flex min-h-screen flex-col">{children}</div>
        </ClientProvider>
      </body>
    </html>
  );
}
