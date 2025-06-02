'use client';

import { useState } from 'react';
import DesktopLogo from '@/shared/components/ui/Logo/DesktopLogo';
import CountdownTimer from '../components/CountdownTimer';
import OtpForm from '../components/OtpForm';
import { IoChevronBack } from 'react-icons/io5';
import PrimaryButton from '@/shared/components/PrimaryButton';
import Toast from '@/shared/utils/swalToast';
import { verifyOtp } from '../api/auth.api';
import { sendOtp } from '../api/auth.api';

export default function AuthPage() {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const validateIranPhoneNumber = (phone: string) => {
    const phoneRegex = /^(?:09|\+989|9)\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleSubmit = async () => {
    if (!validateIranPhoneNumber(mobile)) {
      setError('شماره موبایل معتبر نیست');
      Toast.fire({ icon: 'error', title: 'شماره موبایل معتبر نیست' });
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await sendOtp(mobile);
      setShowOtp(true);
    } catch (error) {
      Toast.fire({ icon: 'error', title: 'خطا در ارسال کد تأیید. لطفاً دوباره تلاش کنید.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (otp: string) => {
    setIsLoading(true);
    try {
      await verifyOtp(mobile, otp);
      Toast.fire({ icon: 'success', title: 'احراز هویت با موفقیت انجام شد' });
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'کد تأیید نامعتبر است',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setShowOtp(false);
    setMobile('');
    setError('');
    Toast.fire({
      icon: 'info',
      title: 'بازگشت به فرم ورود',
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="container">
        <div className="relative mx-auto max-w-[450px] rounded-xl bg-muted p-5 shadow-base md:p-10">
          {showOtp && (
            <button
              onClick={handleBack}
              className="absolute -top-3.5 -right-3.5 shadow-base dark:hover:bg-muted hover:bg-muted text-white hover:text-primary transition-all duration-200 w-10 h-10 flex items-center justify-center rounded-full bg-primary cursor-pointer"
            >
              <IoChevronBack className="w-6 h-6 rotate-180" />
            </button>
          )}

          <div className="mx-auto mb-10 w-40">
            <DesktopLogo />
          </div>

          <h1 className="mb-10 text-start text-lg">{showOtp ? 'کد تأیید را وارد کنید' : 'ورود | ثبت نام'}</h1>

          {showOtp ? (
            <>
              <OtpForm onSubmit={handleOtpSubmit} />
              <CountdownTimer initialMinutes={2} initialSeconds={0} />
            </>
          ) : (
            <>
              <div className="mb-4 space-y-4">
                <label htmlFor="mobile" className="relative block rounded-lg border shadow-base">
                  <input
                    type="text"
                    id="mobile"
                    dir="auto"
                    className={`peer w-full rounded-lg border-none bg-transparent p-4 text-left placeholder-transparent focus:outline-hidden focus:ring-0 ${
                      error ? 'border-red-500' : ''
                    }`}
                    placeholder="شماره موبایل"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/90 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                    شماره موبایل
                  </span>
                </label>
                <p className="h-5 text-sm text-red-500 dark:text-red-400">{error}</p>
              </div>
              <div className="mb-5">
                <PrimaryButton isLoading={isLoading} onClick={handleSubmit}>
                  ورود
                </PrimaryButton>
              </div>
              <p className="text-center text-sm text-text/90">
                با ورود به فروشگاه،
                <a href="./rules-and-terms.html" className="text-primary">
                  کلیه قوانین
                </a>
                را می‌پذیرم
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
