import { twMerge } from "tailwind-merge";

type ProgressProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<"div">;

function Progress(props: ProgressProps) {
  return (
    <div
      {...props}
      className={twMerge([
        "w-full h-2 bg-slate-200 rounded dark:bg-black/20",
        props.className,
      ])}
    >
      {props.children}
    </div>
  );
}

type BarProps = React.PropsWithChildren & React.ComponentPropsWithoutRef<"div">;

Progress.Bar = (props: BarProps) => {
  return (
    <div
      {...props}
      className={twMerge([
        "bg-primary h-full rounded text-xs text-white flex justify-center items-center",
        props.className,
      ])}
    >
      {props.children}
    </div>
  );
};

export default Progress;
