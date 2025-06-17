import Footer from '@/components/footer';
import Header from '@/components/header';
import MobileLayout from '@/components/MobileLayout';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <MobileLayout />
      <main className="grow bg-background pb-14 pt-22 lg:pt-36">
        <div className="col-span-12 lg:col-span-9">{children}</div>
      </main>
      <Footer />
    </>
  );
}
