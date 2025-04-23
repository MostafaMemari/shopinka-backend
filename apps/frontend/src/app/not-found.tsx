import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-y-6">
      <h1 className="text-9xl font-bold text-text/90">404</h1>
      <h2 className="text-lg text-text/90 lg:text-xl">صفحه‌ای که دنبال آن بودید پیدا نشد!</h2>
      <Link className="btn-primary px-6 py-3" href="./">
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}
