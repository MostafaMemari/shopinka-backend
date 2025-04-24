import Header from "@/components/modules/Header/Header";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}
