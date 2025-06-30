import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  message?: string;
  iconSize?: string;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  message = 'هیچ آیتمی برای نمایش وجود ندارد',
  iconSize = 'w-16 h-16',
  className = '',
}) => {
  return (
    <div className={`flex justify-center items-center p-6 ${className}`}>
      <div className="flex flex-col items-center justify-center gap-y-4 text-text/60 p-8 transition-all">
        <div className={`text-primary ${iconSize}`}>{icon}</div>
        <p className="text-center text-base md:text-xl font-medium">{message}</p>
      </div>
    </div>
  );
};

export default EmptyState;
