import { createRef, useEffect } from "react";
import { setValue, init, updateValue } from "./tom-select";
import { TomSettings, RecursivePartial } from "tom-select/src/types/index";
import TomSelectPlugin from "tom-select";
import { useRef, useMemo } from "react";
import clsx from "clsx";

export interface TomSelectElement extends HTMLSelectElement {
  TomSelect: TomSelectPlugin;
}

export interface TomSelectProps
  extends Omit<React.PropsWithChildren & React.ComponentPropsWithoutRef<"select">, "onChange"> {
  value: string | string[];
  onOptionAdd: (value: string) => void;
  onChange(value: React.SetStateAction<string> | React.SetStateAction<string[]>): void;
  options: RecursivePartial<TomSettings>;
  getRef: (el: TomSelectElement) => void;
}

function TomSelect(props: TomSelectProps) {
  const initialRender = useRef(true);
  const tomSelectRef = createRef<TomSelectElement>();

  // Compute all default options
  const computedOptions = useMemo(() => {
    let options: TomSelectProps["options"] = {
      ...props.options,

      plugins: {
        dropdown_input: {},
        ...props.options.plugins,
      },
    };

    if (Array.isArray(props.value)) {
      options = {
        persist: false,
        create: true,
        onDelete: function (values: string[]) {
          return confirm(
            values.length > 1
              ? "Are you sure you want to remove these " + values.length + " items?"
              : 'Are you sure you want to remove "' + values[0] + '"?'
          );
        },
        ...options,
        plugins: {
          remove_button: {
            title: "Remove this item",
          },
          ...options.plugins,
        },
      };
    }

    return options;
  }, [props.options]);

  useEffect(() => {
    if (tomSelectRef.current) {
      props.getRef(tomSelectRef.current);

      if (initialRender.current) {
        // Unique attribute
        tomSelectRef.current.setAttribute("data-id", "_" + Math.random().toString(36).substr(2, 9));

        // Clone the select element to prevent tom select remove the original element
        const clonedEl = tomSelectRef.current.cloneNode(true) as TomSelectElement;

        // Save initial classnames
        const classNames = tomSelectRef.current?.getAttribute("class");
        classNames && clonedEl.setAttribute("data-initial-class", classNames);

        // Hide original element
        tomSelectRef.current?.parentNode && tomSelectRef.current?.parentNode.appendChild(clonedEl);
        tomSelectRef.current.setAttribute("hidden", "true");

        // Initialize tom select
        setValue(clonedEl, props);
        init(tomSelectRef.current, clonedEl, props, computedOptions);

        initialRender.current = false;
      } else {
        const clonedEl = document.querySelectorAll(
          `[data-id='${tomSelectRef.current.getAttribute("data-id")}'][data-initial-class]`
        )[0] as TomSelectElement;
        const value = props.value;
        updateValue(tomSelectRef.current, clonedEl, value, props, computedOptions);
      }
    }
  }, [tomSelectRef, props.value, props.className]);

  const { options, value, onOptionAdd, onChange, getRef, ...computedProps } = props;
  return (
    <select
      {...computedProps}
      ref={tomSelectRef}
      value={props.value}
      onChange={(event) => {
        props.onChange(event.target.value);
      }}
      className={clsx(["tom-select", props.className])}
    >
      {props.children}
    </select>
  );
}

TomSelect.defaultProps = {
  className: "",
  options: {},
  value: "",
  onOptionAdd: () => {},
  onChange: () => {},
  getRef: () => {},
};

export default TomSelect;
