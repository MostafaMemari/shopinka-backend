'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DesktopLogo from '@/components/ui/Logo/DesktopLogo';
import Toast from '@/shared/utils/swalToast';

import { useOtpTimer } from '@/hooks/reactQuery/auth/useOtpTimer';
import { IoChevronBack } from 'react-icons/io5';
import PhoneInputForm from './PhoneInputForm';
import OtpForm from './OtpForm';

export default function AuthContainer() {
  const [mobile, setMobile] = useState('');

  const [showOtp, setShowOtp] = useState(false);

  const searchParams = useSearchParams();
  const backUrl = searchParams.get('backUrl') || '/';
  const { timeLeft, isExpired, formatTime, resetTimer } = useOtpTimer(300);

  const handleBack = () => {
    setShowOtp(false);
    setMobile('');
    Toast.fire({ icon: 'info', title: 'بازگشت به فرم ورود' });
  };

  const handleShowOpt = () => {
    setShowOtp(true);
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
            <OtpForm
              mobile={mobile}
              isExpired={isExpired}
              timeLeft={timeLeft}
              formatTime={formatTime}
              resetTimer={resetTimer}
              backUrl={backUrl}
            />
          ) : (
            <PhoneInputForm mobile={mobile} setMobile={setMobile} handleShowOpt={handleShowOpt} />
          )}
        </div>
      </div>
    </div>
  );
}
