export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="fixed inset-x-0 top-1/3 mx-auto h-1/3 w-1/4 bg-primary/50 blur-[200px]"></div>
      <section className="mb-8">
        <div className="container relative">{children}</div>
      </section>
    </>
  );
}
