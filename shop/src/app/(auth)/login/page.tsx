import DesktopLogo from '@/components/ui/Logo/DesktopLogo';

export default function Page() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="container">
          <div className="mx-auto max-w-[450px] rounded-xl bg-muted p-5 shadow-base md:p-10">
            <div className="mx-auto mb-10 w-40">
              {' '}
              <DesktopLogo />{' '}
            </div>

            <h1 className="mb-10 text-center text-lg">ورود | ثبت نام</h1>
            <div className="mb-4 space-y-4">
              <label htmlFor="username" className="relative block rounded-lg border shadow-base">
                <input
                  type="text"
                  id="username"
                  dir="auto"
                  className="peer w-full rounded-lg border-none bg-transparent p-4 text-left placeholder-transparent focus:outline-hidden focus:ring-0"
                  placeholder="شماره موبایل یا ایمیل "
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/90 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                  شماره موبایل یا ایمیل
                </span>
              </label>
              <p className="h-5 text-sm text-red-500 dark:text-red-400"></p>
            </div>
            <div className="mb-5">
              <button className="btn-primary w-full py-3">ورود</button>
            </div>
            <p className="text-center text-sm text-text/90">
              با ورود به فروشگاه,
              <a href="./rules-and-terms.html" className="text-primary">
                کلیه قوانین
              </a>
              را می‌پذیرم
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
