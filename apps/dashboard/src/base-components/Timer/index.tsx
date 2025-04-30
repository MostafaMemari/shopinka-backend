interface TimerDisplayProps {
  timer: number;
  isExpired: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timer, isExpired }) => {
  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="mt-4 text-center text-sm text-slate-500">
      {isExpired ? <span className="text-red-500">مهلت وارد کردن کد تمام شد!</span> : <>مهلت باقی‌مانده: {formatTime(timer)}</>}
    </div>
  );
};

 export default TimerDisplay