import { createRef, useEffect } from "react";
import { Draggable as FullCalendarDraggable } from "@fullcalendar/interaction";

export interface DraggableProps
  extends React.PropsWithChildren,
    React.ComponentPropsWithoutRef<"div"> {
  options: FullCalendarDraggable["settings"];
}

const init = (el: HTMLDivElement, props: DraggableProps) => {
  new FullCalendarDraggable(el, props.options);
};

function Draggable(props: DraggableProps) {
  const draggableRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (draggableRef.current) {
      init(draggableRef.current, props);
    }
  }, [props.options]);

  return (
    <div ref={draggableRef} {...props}>
      {props.children}
    </div>
  );
}

Draggable.defaultProps = {
  options: {},
};

export default Draggable;
