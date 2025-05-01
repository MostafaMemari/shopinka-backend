import { useState } from "react";
import { Toast } from "../../../base-components/Toast";
import { createdProductAttributeService, updateProductAttributeService } from "../../../services/Axios/Request/productAttribute/attribute";
import { removeEmptyFields } from "../../../utils/helper";

interface FormValues {
  id?: string | number;
  name: string;
  slug: string;
  type: "COLOR" | "BUTTON";
  description: string;
}

interface Props {
  refetch: () => void;
  closeSlideAttribute: () => void;
}

const useProductAttributeLogic = ({ refetch, closeSlideAttribute }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (values: FormValues) => {
    try {
      setLoading(true);

      const validValues = removeEmptyFields(values);

      const res = await createdProductAttributeService(validValues);

      if (res.status == 200 || res.status == 201) {
        Toast("ویژگی با موفقیت ثبت شد", "success");
        refetch();
        closeSlideAttribute();
      }
    } catch (err: any) {
      if (err.status == 409) {
        console.log(err);
        Toast("ویژگی قبلا ثبت شده است", "error");
      } else {
        Toast("ثبت ویژگی با خطا مواجه شد", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateForm = async (values: FormValues & { id: number }) => {
    try {
      setLoading(true);
      const res = await updateProductAttributeService(values.id, values);
      if (res.status === 200) {
        Toast("ویژگی با موفقیت به‌روزرسانی شد", "success");
      } else {
        Toast("به‌روزرسانی ویژگی با خطا مواجه شد", "error");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "خطا در به‌روزرسانی ویژگی";
      Toast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSubmitForm,
    handleUpdateForm,
  };
};

export default useProductAttributeLogic;
