import Header from '@/shared/components/header';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}
