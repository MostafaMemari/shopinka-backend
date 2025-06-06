import Footer from '@/shared/components/footer';
import Header from '@/shared/components/header';
import MobileLayout from '@/shared/components/MobileLayout';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <MobileLayout showHeader={true} showNav={false} />

      <div className="fixed inset-x-0 top-1/3 mx-auto h-1/3 w-1/4 bg-primary/50 blur-[200px]"></div>
      <main className="grow bg-background pb-14 pt-22 lg:pt-36">
        <section className="mb-8">
          <div className="container relative">{children}</div>
        </section>
      </main>

      <Footer />
    </>
  );
}
