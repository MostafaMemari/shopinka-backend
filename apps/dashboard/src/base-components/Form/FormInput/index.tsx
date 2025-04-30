import { useContext, forwardRef } from "react";
import { formInlineContext } from "../FormInline";
import { inputGroupContext } from "../InputGroup";
import { twMerge } from "tailwind-merge";

interface FormInputProps extends React.ComponentPropsWithoutRef<"input"> {
  formInputSize?: "sm" | "lg";
  rounded?: boolean;
}

type FormInputRef = React.ComponentPropsWithRef<"input">["ref"];

const FormInput = forwardRef((props: FormInputProps, ref: FormInputRef) => {
  const formInline = useContext(formInlineContext);
  const inputGroup = useContext(inputGroupContext);
  const { formInputSize, rounded, ...computedProps } = props;
  return (
    <input
      {...computedProps}
      ref={ref}
      className={twMerge([
        "disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent",
        "[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent",
        "transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80",
        props.formInputSize == "sm" && "text-xs py-1.5 px-2",
        props.formInputSize == "lg" && "text-lg py-1.5 px-4",
        props.rounded && "rounded-full",
        formInline && "flex-1",
        inputGroup &&
          "rounded-none [&:not(:first-child)]:border-l-transparent first:rounded-l last:rounded-r z-10",
        props.className,
      ])}
    />
  );
});

export default FormInput;
