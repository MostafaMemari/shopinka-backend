import { useState } from "react";
import { Toast } from "../../../base-components/Toast";
import Swal from "sweetalert2";
import { removeProductAttributeService } from "../../../services/Axios/Request/productAttribute/attribute";

interface Props {
  onSuccess: () => void;
}

const useRemoveProductAttribute = ({ onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteProduct = async (productId: number) => {
    const result = await Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "این ویژگی به‌طور دائم حذف خواهد شد!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بله، حذف کن",
      cancelButtonText: "خیر",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const res = await removeProductAttributeService(productId);
        if (res.status === 200) {
          Toast("حذف ویژگی با موفقیت انجام شد", "success");
          onSuccess();
          Swal.fire("حذف شد!", "ویژگی با موفقیت حذف شد.", "success");
        } else {
          Toast("حذف ویژگی با خطا مواجه شد", "error");
          Swal.fire("خطا!", "حذف ویژگی ناموفق بود.", "error");
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "مشکلی در حذف ویژگی رخ داد";
        Toast(errorMessage, "error");
        Swal.fire("خطا!", errorMessage, "error");
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    loading,
    handleDeleteProduct,
  };
};

export default useRemoveProductAttribute;
