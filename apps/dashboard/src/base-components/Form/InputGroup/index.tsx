import { createContext, useContext } from "react";
import { twMerge } from "tailwind-merge";

type InputGroupProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<"div">;

export const inputGroupContext = createContext(false);

function InputGroup(props: InputGroupProps) {
  return (
    <inputGroupContext.Provider value={true}>
      <div {...props} className={twMerge(["flex", props.className])}>
        {props.children}
      </div>
    </inputGroupContext.Provider>
  );
}

type TextProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<"div">;

InputGroup.Text = (props: TextProps) => {
  const inputGroup = useContext(inputGroupContext);
  return (
    <div
      {...props}
      className={twMerge([
        "py-2 px-3 bg-slate-100 border shadow-sm border-slate-200 text-slate-600 dark:bg-darkmode-900/20 dark:border-darkmode-900/20 dark:text-slate-400",
        inputGroup &&
          "rounded-none [&:not(:first-child)]:border-l-transparent first:rounded-l last:rounded-r",
        props.className,
      ])}
    >
      {props.children}
    </div>
  );
};

export default InputGroup;
