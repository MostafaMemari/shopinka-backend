import { twMerge } from "tailwind-merge";

export type FormCheckProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<"div">;

function FormCheck(props: FormCheckProps) {
  return (
    <div {...props} className={twMerge(["flex items-center", props.className])}>
      {props.children}
    </div>
  );
}

export type LabelProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<"label">;

FormCheck.Label = (props: LabelProps) => {
  return (
    <label
      {...props}
      className={twMerge(["cursor-pointer ml-2", props.className])}
    >
      {props.children}
    </label>
  );
};

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  type: "radio" | "checkbox";
}

FormCheck.Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className={twMerge([
        // Default
        "transition-all duration-100 ease-in-out",

        // Input type radio
        props.type == "radio" &&
          "shadow-sm border-slate-200 cursor-pointer focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50",

        // Input type checkbox
        props.type == "checkbox" &&
          "shadow-sm border-slate-200 cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50",

        // On checked
        "[&[type='radio']]:checked:bg-primary [&[type='radio']]:checked:border-primary [&[type='radio']]:checked:border-opacity-10",
        "[&[type='checkbox']]:checked:bg-primary [&[type='checkbox']]:checked:border-primary [&[type='checkbox']]:checked:border-opacity-10",

        // On checked and not disabled
        "[&:disabled:not(:checked)]:bg-slate-100 [&:disabled:not(:checked)]:cursor-not-allowed [&:disabled:not(:checked)]:dark:bg-darkmode-800/50",

        // On checked and disabled
        "[&:disabled:checked]:opacity-70 [&:disabled:checked]:cursor-not-allowed [&:disabled:checked]:dark:bg-darkmode-800/50",
        props.className,
      ])}
    />
  );
};

export default FormCheck;
