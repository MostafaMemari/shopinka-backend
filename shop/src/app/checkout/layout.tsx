import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import MobileLayout from '@/components/ui/MobileLayout';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <MobileLayout showHeader={true} showNav={false} />

      <div className="fixed inset-x-0 top-1/3 mx-auto h-1/3 w-1/4 bg-primary/50 blur-[200px]"></div>

      <main className="pb-14 pt-22 lg:pt-36">
        <div className="container">
          <div className="relative">
            <div className="grid grid-cols-12 gap-2 lg:gap-6">{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
