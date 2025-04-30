import { createRef, useRef, useEffect } from "react";
import { init, reInit } from "./tiny-slider";
import {
  TinySliderInstance,
  TinySliderSettings,
} from "tiny-slider/src/tiny-slider";
import clsx from "clsx";

export interface TinySliderElement extends HTMLDivElement {
  tns: TinySliderInstance;
}

export interface TinySliderProps
  extends React.PropsWithChildren,
    React.ComponentPropsWithoutRef<"div"> {
  getRef: (el: TinySliderElement) => void;
  options: TinySliderSettings;
}

function TinySlider(props: TinySliderProps) {
  const initialRender = useRef(true);
  const sliderRef = createRef<TinySliderElement>();

  useEffect(() => {
    if (sliderRef.current) {
      props.getRef(sliderRef.current);

      if (initialRender.current) {
        init(sliderRef.current, props);
        initialRender.current = false;
      } else {
        reInit(sliderRef.current);
      }
    }
  }, [props.options, props.children]);

  return (
    <div ref={sliderRef} className={clsx(["tiny-slider", props.className])}>
      {props.children}
    </div>
  );
}

TinySlider.defaultProps = {
  options: {},
  getRef: () => {},
  className: "",
};

export default TinySlider;
