import Swal, { SweetAlertOptions } from "sweetalert2";

export const toastConfig: SweetAlertOptions = {
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
  width: "auto",
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
};
