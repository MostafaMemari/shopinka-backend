import PrimaryButton from '@/shared/components/PrimaryButton';
import Toast from '@/shared/utils/swalToast';
import { useState } from 'react';
import { validateIranPhoneNumber } from '../utils/validateIranPhoneNumber';
import { sendOtp } from '../services/auth.api';
import { handleApiError } from '@/shared/utils/handleApiError';
import { errorPhoneNumberStepMessages } from '../messages/errorAuthMessages';

interface PhoneInputForm {
  mobile: string;
  setMobile: (value: string) => void;
  handleShowOpt: () => void;
}

function PhoneInputForm({ mobile, setMobile, handleShowOpt }: PhoneInputForm) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!validateIranPhoneNumber(mobile)) {
      setError('شماره موبایل معتبر نیست');
      return;
    }

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
        Toast.fire({ icon: 'success', title: 'کد اعتبار سنجی با موفقیت ارسال شد' });
        handleShowOpt();
      }
    } catch (error) {
      setError('خطا در ارسال کد تأیید. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <div className="mb-4 space-y-4">
        <label htmlFor="mobile" className="relative block rounded-lg border shadow-base">
          <input
            type="text"
            id="mobile"
            dir="auto"
            className={`peer w-full rounded-lg border-none bg-transparent p-4 text-left placeholder-transparent focus:outline-none focus:ring-0 ${
              error ? 'border-red-500' : ''
            }`}
            placeholder="شماره موبایل"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/90 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
            شماره موبایل
          </span>
        </label>
        {error && <p className="h-5 text-sm text-red-500 dark:text-red-400">{error}</p>}
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
  );
}

export default PhoneInputForm;
