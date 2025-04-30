import { forwardRef, useState, Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { Transition } from "@headlessui/react";

type Variant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "pending"
  | "danger"
  | "dark"
  | "outline-primary"
  | "outline-secondary"
  | "outline-success"
  | "outline-warning"
  | "outline-pending"
  | "outline-danger"
  | "outline-dark"
  | "soft-primary"
  | "soft-secondary"
  | "soft-success"
  | "soft-warning"
  | "soft-pending"
  | "soft-danger"
  | "soft-dark";

type AlertProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    children:
      | React.ReactNode
      | ((props: { dismiss: () => void }) => JSX.Element);
    dismissible?: boolean;
    variant?: Variant;
    onShow?: () => {};
    onShown?: () => {};
    onHide?: () => {};
    onHidden?: () => {};
  }
>;

type AlertComponent = <C extends React.ElementType = "div">(
  props: AlertProps<C>
) => React.ReactElement | null;

const Alert: AlertComponent = forwardRef(
  <C extends React.ElementType>(
    { as, dismissible, variant, ...props }: AlertProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const [show, setShow] = useState<boolean>(true);
    const Component = as || "div";

    // Main Colors
    const primary = [
      "bg-primary border-primary text-white", // Default
      "dark:border-primary", // Dark
    ];
    const secondary = [
      "bg-secondary/70 border-secondary/70 text-slate-500", // Default
      "dark:border-darkmode-400 dark:bg-darkmode-400 dark:text-slate-300", // Dark mode
    ];
    const success = [
      "bg-success border-success text-slate-900", // Default
      "dark:border-success", // Dark mode
    ];
    const warning = [
      "bg-warning border-warning text-slate-900", // Default
      "dark:border-warning", // Dark mode
    ];
    const pending = [
      "bg-pending border-pending text-white", // Default
      "dark:border-pending", // Dark mode
    ];
    const danger = [
      "bg-danger border-danger text-white", // Default
      "dark:border-danger", // Dark mode
    ];
    const dark = [
      "bg-dark border-dark text-white", // Default
      "dark:bg-darkmode-800 dark:border-transparent dark:text-slate-300", // Dark mode
    ];

    // Outline
    const outlinePrimary = [
      "border-primary text-primary", // Default
      "dark:border-primary", // Dark mode
    ];
    const outlineSecondary = [
      "border-secondary text-slate-500", // Default
      "dark:border-darkmode-100/40 dark:text-slate-300", // Dark mode
    ];
    const outlineSuccess = [
      "border-success text-success dark:border-success", // Default
      "dark:border-success", // Dark mode
    ];
    const outlineWarning = [
      "border-warning text-warning", // Default
      "dark:border-warning", // Dark mode
    ];
    const outlinePending = [
      "border-pending text-pending", // Default
      "dark:border-pending", // Dark mode
    ];
    const outlineDanger = [
      "border-danger text-danger", // Default
      "dark:border-danger", // Dark mode
    ];
    const outlineDark = [
      "border-dark text-dark", // Default
      "dark:border-darkmode-800 dark:text-slate-300", // Dark mode
    ];

    // Soft Color
    const softPrimary = [
      "bg-primary border-primary bg-opacity-20 border-opacity-5 text-primary", // Default
      "dark:border-opacity-100 dark:bg-opacity-20 dark:border-primary", // Dark mode
    ];
    const softSecondary = [
      "bg-slate-300 border-secondary bg-opacity-10 text-slate-500", // Default
      "dark:bg-darkmode-100/20 dark:border-darkmode-100/30 dark:text-slate-300", // Dark mode
    ];
    const softSuccess = [
      "bg-success border-success bg-opacity-20 border-opacity-5 text-success", // Default
      "dark:border-success dark:border-opacity-20", // Dark mode
    ];
    const softWarning = [
      "bg-warning border-warning bg-opacity-20 border-opacity-5 text-warning", // Default
      "dark:border-warning dark:border-opacity-20", // Dark mode
    ];
    const softPending = [
      "bg-pending border-pending bg-opacity-20 border-opacity-5 text-pending", // Default
      "dark:border-pending dark:border-opacity-20", // Dark mode
    ];
    const softDanger = [
      "bg-danger border-danger bg-opacity-20 border-opacity-5 text-danger", // Default
      "dark:border-danger dark:border-opacity-20", // Dark mode
    ];
    const softDark = [
      "bg-dark border-dark bg-opacity-20 border-opacity-5 text-dark", // Default
      "dark:bg-darkmode-800/30 dark:border-darkmode-800/60 dark:text-slate-300", // Dark mode
    ];

    return (
      <Transition
        as={Fragment}
        show={show}
        enter="transition-all ease-linear duration-150"
        enterFrom="invisible opacity-0 translate-y-1"
        enterTo="visible opacity-100 translate-y-0"
        leave="transition-all ease-linear duration-150"
        leaveFrom="visible opacity-100 translate-y-0"
        leaveTo="invisible opacity-0 translate-y-1"
      >
        <Component
          {...props}
          ref={ref}
          role="alert"
          className={twMerge([
            "relative border rounded-md px-5 py-4",
            variant == "primary" && primary,
            variant == "secondary" && secondary,
            variant == "success" && success,
            variant == "warning" && warning,
            variant == "pending" && pending,
            variant == "danger" && danger,
            variant == "dark" && dark,
            variant == "outline-primary" && outlinePrimary,
            variant == "outline-secondary" && outlineSecondary,
            variant == "outline-success" && outlineSuccess,
            variant == "outline-warning" && outlineWarning,
            variant == "outline-pending" && outlinePending,
            variant == "outline-danger" && outlineDanger,
            variant == "outline-dark" && outlineDark,
            variant == "soft-primary" && softPrimary,
            variant == "soft-secondary" && softSecondary,
            variant == "soft-success" && softSuccess,
            variant == "soft-warning" && softWarning,
            variant == "soft-pending" && softPending,
            variant == "soft-danger" && softDanger,
            variant == "soft-dark" && softDark,
            dismissible && "pl-5 pr-16",
            props.className,
          ])}
        >
          {typeof props.children === "function"
            ? props.children({
                dismiss: () => {
                  setShow(false);
                },
              })
            : props.children}
        </Component>
      </Transition>
    );
  }
);

type DismissButtonProps<C extends React.ElementType> = PolymorphicComponentProp<
  C,
  {
    as?: C extends string ? "button" | "a" : C;
  }
>;

const DismissButton = <C extends React.ElementType = "button">({
  as,
  children,
  ...props
}: DismissButtonProps<C>) => {
  const Component = as || "button";

  return (
    <Component
      {...props}
      type="button"
      aria-label="Close"
      className={twMerge([
        "text-slate-800 py-2 px-3 absolute right-0 my-auto mr-2",
        props.className,
      ])}
    >
      {children}
    </Component>
  );
};

const AlertComponent = Object.assign({}, Alert, {
  DismissButton: DismissButton,
});

export default AlertComponent;
