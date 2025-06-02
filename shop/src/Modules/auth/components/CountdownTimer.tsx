'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  initialMinutes: number;
  initialSeconds: number;
}

export default function CountdownTimer({ initialMinutes, initialSeconds }: CountdownTimerProps) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        setIsResendEnabled(true);
        clearInterval(interval);
      } else {
        if (seconds === 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          setSeconds((prev) => prev - 1);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  const handleResend = () => {
    if (!isResendEnabled) return;
    // Logic for resending OTP
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setIsResendEnabled(false);
  };

  return (
    <ul className="mb-8 space-y-4 mt-4">
      <li>
        <p className={`text-primary text-sm ${isResendEnabled ? 'hidden' : ''}`} id="countdownSection">
          زمان باقی‌مانده تا ارسال مجدد{' '}
          <span className="font-bold">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
        </p>
        <button
          className={`btn-primary-nobg text-sm w-fit flex items-center gap-1 ${!isResendEnabled ? 'hidden' : ''}`}
          onClick={handleResend}
          disabled={!isResendEnabled}
        >
          <span>ارسال مجدد</span>
          <svg className="h-5 w-5">
            <use xlinkHref="#chevron-left" />
          </svg>
        </button>
      </li>
    </ul>
  );
}
