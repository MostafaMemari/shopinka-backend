export default function Loading() {
  return (
    <main className="grow bg-background pb-14 pt-36 xs:pt-36">
      <section className="mb-8">
        <div className="container relative">
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="flex flex-col gap-2 rounded-lg bg-white p-4 shadow w-full max-w-sm">
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
