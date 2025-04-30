import { useContext } from "react";
import { formInlineContext } from "../FormInline";
import { twMerge } from "tailwind-merge";

type FormLabelProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<"label">;

function FormLabel(props: FormLabelProps) {
  const formInline = useContext(formInlineContext);
  return (
    <label
      {...props}
      className={twMerge([
        "inline-block mb-2",
        formInline && "mb-2 sm:mb-0 sm:mr-5 sm:text-right",
        props.className,
      ])}
    >
      {props.children}
    </label>
  );
}

export default FormLabel;
