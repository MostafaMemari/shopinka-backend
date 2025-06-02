import PrimaryButton from '@/shared/components/PrimaryButton';
import Toast from '@/shared/utils/swalToast';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { verifyOtp, sendOtp } from '../services/auth.api';
import { handleApiError } from '@/shared/utils/handleApiError';
import { errorOtpStepMessages, errorPhoneNumberStepMessages } from '../messages/errorAuthMessages';
import CountdownTimer from '../components/CountdownTimer';
import { useAuth } from '../hooks/useAuth';

export default function OtpForm({
  mobile,
  isExpired,
  timeLeft,
  formatTime,
  resetTimer,
  backUrl,
}: {
  mobile: string;
  isExpired: boolean;
  timeLeft: number;
  formatTime: (time: number) => string;
  resetTimer: () => void;
  backUrl: string;
}) {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { loginUser } = useAuth();

  const handleSubmit = useCallback(async () => {
    if (isLoading || isExpired || otp.length !== 6) {
      if (otp.length !== 6) {
        setError('لطفاً کد ۶ رقمی را وارد کنید');
      } else if (isExpired) {
        setError('زمان شما به اتمام رسیده');
        setOtp('');
      }
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const res = await verifyOtp(mobile, otp);
      const errorMessage = handleApiError(res.status, errorOtpStepMessages);

      if (errorMessage) {
        setError(errorMessage);
        setOtp('');
        return;
      }

      if (res.status === 200 || res.status === 201) {
        Toast.fire({ icon: 'success', title: 'ورود شما با موفقیت انجام شد' });

        loginUser({ mobile, role: 'CUSTOMER', full_name: '' });
        router.push(backUrl);
      }
    } catch (error) {
      setError('کد تأیید نامعتبر است');
      setOtp('');
    } finally {
      setIsLoading(false);
    }
  }, [otp, isLoading, isExpired, mobile, backUrl, router]);

  const handleResendOtp = useCallback(async () => {
    if (isLoading) return;

    setError('');
    setIsLoading(true);

    try {
      const res = await sendOtp(mobile);
      const errorMessage = handleApiError(res.status, errorPhoneNumberStepMessages);

      if (errorMessage) {
        setError(errorMessage);
        return;
      }

      if (res.status === 200 || res.status === 201) {
        setError('');
        Toast.fire({ icon: 'success', title: 'ورود شما با موفقیت انجام شد' });
        loginUser({ mobile, role: 'CUSTOMER', full_name: '' });
        router.push(backUrl);
      }
    } catch (error) {
      setError('خطا در ارسال کد تأیید. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, mobile, resetTimer]);

  useEffect(() => {
    if (otp.length === 6 && !isLoading && !isExpired) {
      handleSubmit();
    }
  }, [otp, isLoading, isExpired, handleSubmit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <input
          dir="ltr"
          autoFocus
          inputMode="numeric"
          pattern="[0-9]*"
          value={otp}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="------"
          className={`w-full text-center tracking-[0.5em] text-xl sm:text-2xl md:text-3xl py-3 rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-primary bg-muted`}
          maxLength={6}
        />
        {error && <p className="h-5 text-sm text-red-500 dark:text-red-400 mt-2">{error}</p>}
      </div>
      <div className="flex flex-col  sm:justify-between gap-3">
        <PrimaryButton isLoading={isLoading} onClick={handleSubmit} disabled={otp.length !== 6 || isLoading || isExpired}>
          تایید
        </PrimaryButton>
        {isExpired ? (
          <button
            onClick={handleResendOtp}
            disabled={isLoading}
            className="text-sm text-primary hover:underline disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer"
          >
            ارسال مجدد کد
          </button>
        ) : (
          <CountdownTimer formatTime={formatTime} isExpired={isExpired} timeLeft={timeLeft} />
        )}
      </div>
    </div>
  );
}
