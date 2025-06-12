import Swal, { SweetAlertResult } from 'sweetalert2';

// تایپ برای props تابع
interface ConfirmDialogProps {
  title: string;
  text: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

type ConfirmDialogResult = SweetAlertResult<{ isConfirmed: boolean }>;

const showConfirmDialog = async ({
  title,
  text,
  confirmButtonText = 'بله',
  cancelButtonText = 'خیر',
}: ConfirmDialogProps): Promise<ConfirmDialogResult> => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
  });
};

export default showConfirmDialog;
