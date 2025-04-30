import Swal, { SweetAlertIcon, SweetAlertOptions } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toastConfig } from "./toastConfig";

const MySwal = withReactContent(Swal);

type ToastType = "success" | "error" | "warning" | "info" | "question";

export const Toast = (message: string, type: ToastType = "success", customConfig: Partial<SweetAlertOptions> = {}) => {
  return MySwal.fire({
    ...toastConfig,
    icon: type as SweetAlertIcon,
    title: message,
    ...customConfig,
  });
};
