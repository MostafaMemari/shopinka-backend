import { ReactNode } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorStateProps {
  message?: string;
  icon?: ReactNode;
  className?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'خطایی رخ داده است',
  icon = <FaExclamationTriangle className="w-full h-full" />,
  className = '',
}) => {
  return (
    <div className={`flex justify-center items-center p-6 ${className}`}>
      <div className="flex flex-col items-center gap-y-4 text-red-500 p-8">
        <div className="text-red-500 w-14 h-14">{icon}</div>
        <p className="text-center text-base md:text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};

export default ErrorState;
