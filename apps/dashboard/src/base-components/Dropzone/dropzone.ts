import Dropzone from "dropzone";
import { DropzoneElement, DropzoneProps } from "./index";

const init = (el: DropzoneElement, props: DropzoneProps) => {
  Dropzone.autoDiscover = false;
  if (!el.dropzone) {
    el.dropzone = new Dropzone(el, props.options);
  }
};

export { init };
