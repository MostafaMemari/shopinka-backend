import { twMerge } from "tailwind-merge";

type FormHelpProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<"div">;

function FormHelp(props: FormHelpProps) {
  return (
    <div
      {...props}
      className={twMerge(["text-xs text-slate-500 mt-2", props.className])}
    >
      {props.children}
    </div>
  );
}

export default FormHelp;
