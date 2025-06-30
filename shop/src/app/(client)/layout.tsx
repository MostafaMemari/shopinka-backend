import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import MobileLayout from '@/components/ui/MobileLayout';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <MobileLayout />
      <main className="container pb-14 pt-22 lg:pt-36">
        <div className="col-span-12 lg:col-span-9">{children}</div>
      </main>
      <Footer
        copyright
        copyrightText="کلیه حقوق این سایت متعلق به فروشگاه شاپینکا می‌باشد"
        subscribeText="از جدیدترین تخفیف ها با خبر شوید"
        supportPhone="02165102415"
        supportText="۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم"
      />
    </>
  );
}
