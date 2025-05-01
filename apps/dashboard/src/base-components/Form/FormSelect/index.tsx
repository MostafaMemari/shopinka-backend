import { useContext } from "react";
import { formInlineContext } from "../FormInline";
import { twMerge } from "tailwind-merge";

interface FormSelectProps {
  formSelectSize?: "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

function FormSelect(props: FormSelectProps) {
  const formInline = useContext(formInlineContext);
  const { formSelectSize, ...computedProps } = props;

  return (
    <div className="relative w-full">
      <select
        {...computedProps}
        className={twMerge([
          // استایل‌های اصلی
          "disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50",
          "[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50",
          "transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50",
          // غیرفعال کردن فلش پیش‌فرض
          "appearance-none",
          // padding برای فلش سمت چپ
          "pl-8 pr-3",
          props.formSelectSize === "sm" && "text-xs py-1.5 pl-8 pr-2",
          props.formSelectSize === "lg" && "text-lg py-1.5 pl-10 pr-4",
          formInline && "flex-1",
          props.className,
        ])}
        style={{
          // استایل خام با اولویت بالا برای غیرفعال کردن فلش پیش‌فرض
          WebkitAppearance: "none",
          MozAppearance: "none",
          appearance: "none",
          // برای اطمینان بیشتر
          backgroundImage: "none",
        }}
      >
        {props.children}
      </select>
      {/* فلش سفارشی سمت چپ */}
      <span className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </span>
    </div>
  );
}

export default FormSelect;
