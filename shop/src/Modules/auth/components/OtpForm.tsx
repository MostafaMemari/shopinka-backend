import { useState } from 'react';
import { ScaleLoader } from 'react-spinners';

export default function OtpForm({ onSubmit }: { onSubmit: (otp: string) => void }) {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (otp.length !== 6) {
      setError('لطفاً کد ۶ رقمی را وارد کنید');
      return;
    }
    setError('');
    setIsLoading(true);
    onSubmit(otp);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6); // فقط عدد، حداکثر ۶ رقم
    setOtp(value);
  };

  const resetOtp = () => {
    setOtp('');
    setError('');
  };

  return (
    <div className="space-y-4">
      <input
        dir="ltr"
        inputMode="numeric"
        pattern="[0-9]*"
        value={otp}
        onChange={handleChange}
        placeholder="------"
        className={`w-full text-center tracking-[0.5em] text-xl sm:text-2xl md:text-3xl py-3 rounded-lg border ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-primary bg-muted`}
        maxLength={6}
      />
      {/* <p className="h-5 text-sm text-red-500 text-center">{error}</p> */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <button onClick={resetOtp} disabled={isLoading} className="btn-primary-nobg text-sm px-4 py-2 w-full sm:w-auto">
          پاک کردن کد
        </button>
      </div>
      <button
        className="btn-primary w-full py-3 flex items-center justify-center mb-4"
        onClick={handleSubmit}
        disabled={otp.length !== 6 || isLoading}
      >
        {isLoading ? <ScaleLoader color="#ffffff" height={20} /> : 'تایید'}
      </button>
    </div>
  );
}
