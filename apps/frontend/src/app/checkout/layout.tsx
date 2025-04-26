import Header from "@/components/layout/Header/Header";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}
