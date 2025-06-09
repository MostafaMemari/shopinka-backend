import { ButtonHTMLAttributes } from 'react';
import { BeatLoader } from 'react-spinners';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function PrimaryButton({ children, isLoading = false, disabled, onClick, ...props }: PrimaryButtonProps) {
  return (
    <button
      className="btn-primary w-full py-3 flex items-center justify-center cursor-pointer min-h-[48px]"
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <BeatLoader color="#ffffff" size={10} /> : children}
    </button>
  );
}
