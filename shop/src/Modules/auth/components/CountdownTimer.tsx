'use client';

interface CountdownTimerProps {
  timeLeft: number;
  isExpired: boolean;
  formatTime: (time: number) => string;
}

export default function CountdownTimer({ timeLeft, isExpired, formatTime }: CountdownTimerProps) {
  return (
    <ul className="mb-8 space-y-4 mt-4">
      <li>
        <p className={`text-primary text-sm text-center${isExpired ? 'hidden' : ''}`} id="countdownSection">
          <span className="font-bold">{formatTime(timeLeft)}</span> مانده تا دریافت مجدد کد
        </p>
      </li>
    </ul>
  );
}
