import FormCheck, { FormCheckProps, LabelProps } from "../FormCheck";
import { twMerge } from "tailwind-merge";

function FormSwitch(props: FormCheckProps) {
  return <FormCheck {...props}>{props.children}</FormCheck>;
}

FormSwitch.Label = (props: LabelProps) => {
  return <FormCheck.Label {...props}>{props.children}</FormCheck.Label>;
};

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  type: "checkbox";
}

FormSwitch.Input = (props: InputProps) => {
  return (
    <div className="ltr">
      <FormCheck.Input
        {...props}
        className={twMerge([
          // Default
          "w-[38px] h-[24px] p-px rounded-full relative",
          "before:w-[20px] before:h-[20px] before:shadow-[1px_1px_3px_rgba(0,0,0,0.25)] before:transition-all before:duration-200 before:ease-in-out before:absolute before:inset-y-0 before:my-auto before:rounded-full before:dark:bg-darkmode-600",

          // On checked
          "checked:bg-primary checked:border-primary checked:bg-none",
          "before:ml-[0px] before:checked:ml-[14px] before:bg-white",

          props.className,
        ])}
      />
    </div>
  );
};

export default FormSwitch;
