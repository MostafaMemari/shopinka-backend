import { useState } from "react";
import { Toast } from "../../../base-components/Toast";
import { createdProductAttributeService, updateProductAttributeService } from "../../../services/Axios/Request/productAttribute/attribute";
import { removeEmptyFields } from "../../../utils/helper";
import { IProductAttributeFormValues, IProductAttributeUpdatePayload } from "../types/type";

interface Props {
  refetch: () => void;
  closeSlideAttribute: () => void;
}

const useProductAttributeLogic = ({ refetch, closeSlideAttribute }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (values: IProductAttributeFormValues) => {
    try {
      setLoading(true);
      const res = await createdProductAttributeService(values);
      if (res.status === 200 || res.status === 201) {
        Toast("ویژگی با موفقیت ثبت شد", "success");
        refetch();
        closeSlideAttribute();
      }
    } catch (err: any) {
      if (err.status === 409) {
        Toast("ویژگی قبلا ثبت شده است", "error");
      } else {
        Toast("ثبت ویژگی با خطا مواجه شد", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateForm = async (values: IProductAttributeFormValues & { id: number }) => {
    try {
      setLoading(true);
      const { id, ...updateData } = values;
      const payload: IProductAttributeUpdatePayload = removeEmptyFields(updateData);

      const res = await updateProductAttributeService(id, payload);
      if (res.status === 200) {
        Toast("ویژگی با موفقیت به‌روزرسانی شد", "success");
        refetch();
        closeSlideAttribute();
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
