import { twMerge } from "tailwind-merge";
import Button from "../../base-components/Button";

interface PaginationLinkProps {
  active?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const PaginationLink: React.FC<PaginationLinkProps> = ({ active, disabled, hidden, children, onClick }) => (
  <li
    className={twMerge([
      "flex-1 sm:flex-initial",
      hidden && "hidden", // اضافه کردن کلاس hidden با توجه به prop جدید
    ])}
  >
    <Button
      as="a"
      onClick={onClick}
      className={twMerge([
        "min-w-0 sm:min-w-[40px] shadow-none font-normal flex items-center justify-center border-transparent text-slate-800 sm:mr-2 dark:text-slate-300 px-1 sm:px-3",
        active && "!box font-medium dark:bg-darkmode-400",
        disabled && "cursor-not-allowed opacity-50",
      ])}
    >
      {children}
    </Button>
  </li>
);

export default PaginationLink;
