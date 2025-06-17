import { cn } from '@/utils/utils';
import { FaSpinner } from 'react-icons/fa';

interface LoadingSpinnerProps {
  loadingMessage?: string;
  className?: string;
  size?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loadingMessage = 'در حال بارگذاری...', className = '', size = 'w-10 h-10' }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 text-primary', className)}>
      <FaSpinner className={`${size} animate-spin`} />
      {loadingMessage && <p className="text-sm text-gray-500 dark:text-gray-400">{loadingMessage}</p>}
    </div>
  );
};

export default LoadingSpinner;
