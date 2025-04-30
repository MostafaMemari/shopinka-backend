import { FormInput, FormLabel } from "../../../base-components/Form";
import { Dialog } from "../../../base-components/Headless";
import Button from "../../../base-components/Button";
import { useRef, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createColorsService, updateColorService } from "../../../services/Axios/Request/colors";
import { Toast } from "../../../base-components/Toast";

import * as yup from "yup";
import { createCategoryService, updateCategoryService } from "../../../services/Axios/Request/categories";

interface CategoryFormProps {
  category?: { id?: number; name: string };
  onSuccess: () => void;
  onClose: () => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("نام الزامی است")
    .min(2, "نام باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام نباید بیشتر از ۵۰ کاراکتر باشد"),
});

const CreateAndUpdateColor: React.FC<CategoryFormProps> = ({ onSuccess, category, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const sendButtonRef = useRef(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: category?.name || "" },
  });

  const onSubmit = async (data: { name: string }) => {
    try {
      if (!category) {
        const response = await createCategoryService(data);

        if (response.status === 201) {
          Toast("دسته بندی جدید با موفقیت انجام شد", "success");
          handleModalClose();
          onSuccess();
        } else {
          Toast("خطایی رخ داد، لطفاً دوباره تلاش کنید", "error");
        }
      } else {
        const response = await updateCategoryService(Number(category.id), data);

        if (response.status === 200) {
          Toast("بروزرسانی دسته بندی با موفقیت انجام شد", "success");
          handleModalClose();
          onSuccess();
        } else {
          Toast("خطایی رخ داد، لطفاً دوباره تلاش کنید", "error");
        }
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      Toast("خطایی در ثبت دسته بندی رخ داد", "error");
    }
  };

  const handleModalClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onClose={handleModalClose} initialFocus={sendButtonRef}>
      <Dialog.Panel>
        <Dialog.Title>
          <h2 className="ml-auto text-start font-medium">ثبت دسته بندی</h2>
        </Dialog.Title>
        <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3">
          <div className="col-span-12">
            <FormLabel htmlFor="modal-form-1">نام</FormLabel>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  id="modal-form-1"
                  type="text"
                  placeholder="لطفا نام دسته بندی را وارد کنید"
                  className={errors.name ? "border-red-500" : ""}
                />
              )}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
        </Dialog.Description>
        <Dialog.Footer>
          <Button variant="primary" type="button" className="w-20" ref={sendButtonRef} onClick={handleSubmit(onSubmit)}>
            ثبت
          </Button>
          <Button type="button" variant="outline-secondary" onClick={handleModalClose} className="w-20 mr-1">
            انصراف
          </Button>
        </Dialog.Footer>
      </Dialog.Panel>
    </Dialog>
  );
};

export default CreateAndUpdateColor;
