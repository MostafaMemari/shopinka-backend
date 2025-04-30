import { createRef, useEffect, useRef } from "react";
import { setValue, init, reInit } from "./litepicker";
import LitepickerJs from "litepicker";
import { FormInput } from "../../base-components/Form";
import { ILPConfiguration } from "litepicker/dist/types/interfaces";

export interface LitepickerElement extends HTMLInputElement {
  litePickerInstance: LitepickerJs;
}

type LitepickerConfig = Partial<ILPConfiguration>;

interface MainProps {
  options: {
    format?: string | undefined;
  } & LitepickerConfig;
  value: string;
  onChange: (date: string) => void;
  getRef: (el: LitepickerElement) => void;
}

export type LitepickerProps = MainProps &
  Omit<React.ComponentPropsWithoutRef<"input">, keyof MainProps>;

function Litepicker(props: LitepickerProps) {
  const initialRender = useRef(true);
  const litepickerRef = createRef<LitepickerElement>();
  const tempValue = useRef(props.value);

  useEffect(() => {
    if (litepickerRef.current) {
      props.getRef(litepickerRef.current);
    }

    if (initialRender.current) {
      setValue(props);
      if (litepickerRef.current !== null) {
        init(litepickerRef.current, props);
      }
      initialRender.current = false;
    } else {
      if (tempValue.current !== props.value && litepickerRef.current !== null) {
        reInit(litepickerRef.current, props);
      }
    }

    tempValue.current = props.value;
  }, [props.value]);

  const { options, value, onChange, getRef, ...computedProps } = props;
  return (
    <FormInput
      ref={litepickerRef}
      type="text"
      value={props.value}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
      {...computedProps}
    />
  );
}

Litepicker.defaultProps = {
  options: {},
  value: "",
  onChange: () => {},
  getRef: () => {},
};

export default Litepicker;
