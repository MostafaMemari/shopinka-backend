import Toast from '@/utils/swalToast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { verifyOtp, sendOtp } from '@/service/authService';
import { handleApiError } from '@/utils/handleApiError';
import CountdownTimer from '@/components/auth/CountdownTimer';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';
import { useEffect } from 'react';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { errorPhoneNumberStepMessages } from './PhoneInputForm';

export const errorOtpStepMessages: Record<number, string> = {
  400: 'کد وارد شده نادرست است.',
  403: 'تلاش بیش‌از‌حد. بعداً امتحان کنید.',
  409: 'کد قبلاً ارسال شده است.',
  429: 'درخواست زیاد بود. بعداً تلاش کنید.',
  500: 'خطای سرور. دوباره امتحان کنید.',
};

interface OtpFormProps {
  mobile: string;
  isExpired: boolean;
  timeLeft: number;
  formatTime: (time: number) => string;
  resetTimer: () => void;
  backUrl: string;
}

const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .required('لطفاً کد ۶ رقمی را وارد کنید')
    .matches(/^\d{6}$/, 'لطفاً کد ۶ رقمی را وارد کنید'),
});

export default function OtpForm({ mobile, isExpired, timeLeft, formatTime, resetTimer, backUrl }: OtpFormProps) {
  const router = useRouter();
  const { loginUser } = useAuth();

  const handleSubmit = async (
    values: { otp: string },
    {
      setSubmitting,
      setErrors,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; setErrors: (errors: any) => void; resetForm: () => void },
  ) => {
    if (isExpired) {
      setErrors({ otp: 'زمان شما به اتمام رسیده' });
      resetForm();
      return;
    }

    try {
      const res = await verifyOtp(mobile, values.otp);
      const errorMessage = handleApiError(res.status, errorOtpStepMessages);

      if (errorMessage) {
        setErrors({ otp: errorMessage });
        resetForm();
        return;
      }

      if (res.status === 200 || res.status === 201) {
        Toast.fire({ icon: 'success', title: 'ورود شما با موفقیت انجام شد' });
        loginUser({ mobile, role: 'CUSTOMER', full_name: '' });
        router.push(backUrl);
      }
    } catch (error) {
      setErrors({ otp: 'کد تأیید نامعتبر است' });
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendOtp = async (setSubmitting: (isSubmitting: boolean) => void, setErrors: (errors: any) => void) => {
    try {
      const res = await sendOtp(mobile);
      const errorMessage = handleApiError(res.status, errorPhoneNumberStepMessages);

      if (errorMessage) {
        setErrors({ otp: errorMessage });
        return;
      }

      if (res.status === 200 || res.status === 201) {
        Toast.fire({ icon: 'success', title: 'کد تأیید مجدداً ارسال شد' });
        resetTimer();
      }
    } catch (error) {
      setErrors({ otp: 'خطا در ارسال کد تأیید. لطفاً دوباره تلاش کنید.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={{ otp: '' }} validationSchema={otpValidationSchema} onSubmit={handleSubmit} enableReinitialize>
      {({ isSubmitting, setSubmitting, setErrors, setFieldValue, values, submitForm }) => (
        <>
          <Form className="space-y-4">
            <div>
              <Field
                name="otp"
                dir="ltr"
                autoFocus
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="------"
                className={`w-full text-center tracking-[0.5em] text-xl sm:text-2xl md:text-3xl py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary bg-muted`}
                maxLength={6}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setFieldValue('otp', value);
                }}
              />
              <ErrorMessage name="otp" component="p" className="h-5 text-sm text-red-500 dark:text-red-400 mt-2" />
            </div>
            <div className="flex flex-col sm:justify-between gap-3">
              <PrimaryButton type="submit" isLoading={isSubmitting} disabled={isSubmitting || isExpired}>
                تایید
              </PrimaryButton>
              {isExpired ? (
                <button
                  type="button"
                  onClick={() => handleResendOtp(setSubmitting, setErrors)}
                  disabled={isSubmitting}
                  className="text-sm text-primary hover:underline disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer"
                >
                  ارسال مجدد کد
                </button>
              ) : (
                <CountdownTimer formatTime={formatTime} isExpired={isExpired} timeLeft={timeLeft} />
              )}
            </div>
          </Form>
          <Effect values={values} isSubmitting={isSubmitting} isExpired={isExpired} submitForm={submitForm} />
        </>
      )}
    </Formik>
  );
}

function Effect({
  values,
  isSubmitting,
  isExpired,
  submitForm,
}: {
  values: { otp: string };
  isSubmitting: boolean;
  isExpired: boolean;
  submitForm: () => Promise<void>;
}) {
  useEffect(() => {
    if (values.otp.length === 6 && !isSubmitting && !isExpired) {
      submitForm();
    }
  }, [values.otp, isSubmitting, isExpired, submitForm]);

  return null;
}
