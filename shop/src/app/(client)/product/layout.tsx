export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className="grow bg-background pb-14 pt-18 lg:pt-36">{children}</main>;
}
