interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <div className="flex justify-center">
      <p className="text-red-500 md:text-xl">{message}</p>
    </div>
  );
};

export default ErrorState;
