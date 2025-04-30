import { createRef, useEffect, useRef } from "react";
import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import { init, updateData, CkeditorProps, CkeditorElement } from "../ckeditor";

function Ckeditor<C extends React.ElementType = "div">(
  props: CkeditorProps<C>
) {
  const editorRef = createRef<CkeditorElement>();
  const cacheData = useRef("");
  const initialRender = useRef(true);

  useEffect(() => {
    if (editorRef.current) {
      if (initialRender.current) {
        if (props.getRef) {
          props.getRef(editorRef.current);
        }
        init(editorRef.current, InlineEditor, { props, cacheData });
        initialRender.current = false;
      } else {
        updateData(editorRef.current, { props, cacheData });
      }
    }
  }, [props.value]);

  const {
    as,
    disabled,
    config,
    value,
    onChange,
    onFocus,
    onBlur,
    onReady,
    getRef,
    ...computedProps
  } = props;
  const Component = props.as || "div";

  return (
    <Component
      {...computedProps}
      ref={editorRef}
      value={props.value}
      onChange={props.onChange}
      className={props.className}
    />
  );
}

Ckeditor.defaultProps = {
  disabled: false,
  config: {},
  value: "",
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onReady: () => {},
  getRef: () => {},
};

export default Ckeditor;
