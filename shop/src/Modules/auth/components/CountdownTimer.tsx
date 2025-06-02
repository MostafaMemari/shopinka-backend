'use client';

import { BiChevronLeft } from 'react-icons/bi';

interface CountdownTimerProps {
  timeLeft: number;
  isExpired: boolean;
  formatTime: (time: number) => string;
  resetTimer: () => void;
}

export default function CountdownTimer({ timeLeft, isExpired, formatTime, resetTimer }: CountdownTimerProps) {
  return (
    <ul className="mb-8 space-y-4 mt-4">
      <li>
        <p className={`text-primary text-sm ${isExpired ? 'hidden' : ''}`} id="countdownSection">
          زمان باقی‌مانده تا ارسال مجدد <span className="font-bold">{formatTime(timeLeft)}</span>
        </p>
        <button
          className={`btn-primary-nobg text-sm w-fit flex items-center gap-1 ${!isExpired ? 'hidden' : ''}`}
          onClick={resetTimer}
          disabled={!isExpired}
        >
          <span>ارسال مجدد</span>
          <BiChevronLeft className="h-5 w-5" />
        </button>
      </li>
    </ul>
  );
}
