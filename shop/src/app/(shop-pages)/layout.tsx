import SortBar from '@/Modules/shopPage/components/SortBar';
import FilterSection from '@/Modules/shopPage/views/FilterSection';
import Footer from '@/shared/components/footer';
import Header from '@/shared/components/header';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  // const product = mockProductDetails;

  return (
    <>
      <Header />

      <div className="fixed inset-x-0 top-1/3 mx-auto h-1/3 w-1/4 bg-primary/50 blur-[200px]"></div>
      <main className="grow bg-background pb-14 pt-36 xs:pt-36">
        <section className="mb-8">
          <div className="container relative">
            <div className="grid grid-cols-12 grid-rows-[60px_min(500px,_1fr)] gap-4">
              <FilterSection />
              <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
                <SortBar />
                {children}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
