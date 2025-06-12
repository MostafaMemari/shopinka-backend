import Footer from '@/components/footer';
import Header from '@/components/header';
import MobileLayout from '@/components/MobileLayout';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <MobileLayout />
      {children}
      <Footer />
    </>
  );
}
