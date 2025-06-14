import { FaSpinner } from 'react-icons/fa';

interface LoadingSpinnerProps {
  loadingMessage?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loadingMessage = 'در حال بایگذاری...' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <FaSpinner className="h-10 w-10 animate-spin text-primary" />
      {loadingMessage && <p className="text-sm text-gray-500">{loadingMessage}</p>}
    </div>
  );
};

export default LoadingSpinner;
