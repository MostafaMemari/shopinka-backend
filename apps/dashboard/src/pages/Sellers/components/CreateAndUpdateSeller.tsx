import { FormInput, FormLabel } from "../../../base-components/Form";
import { Dialog } from "../../../base-components/Headless";
import Button from "../../../base-components/Button";
import { useRef, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toast } from "../../../base-components/Toast";

import * as yup from "yup";
import { createSellersService, updateSellerService } from "../../../services/Axios/Request/sellers";
import { Seller } from "../../../features/sellers/types/type";
import sellerSchema from "../../../features/sellers/schemas/SellerSchema";

interface SellerFormProps {
  seller?: Seller;
  onSuccess: () => void;
  onClose: () => void;
}

const CreateAndUpdateSeller: React.FC<SellerFormProps> = ({ onSuccess, seller, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const sendButtonRef = useRef(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(sellerSchema),
    defaultValues: {
      name: seller?.name || "",
      seller_id: seller?.seller_id || "",
      email: seller?.email || "",
      phone: seller?.phone || "",
    },
  });

  const onSubmit = async (data: any): Promise<void> => {
    try {
      if (!seller) {
        const response = await createSellersService(data);

        if (response.status === 201) {
          Toast("فروشنده جدید با موفقیت انجام شد", "success");
          handleModalClose();
          onSuccess();
        } else {
          Toast("خطایی رخ داد، لطفاً دوباره تلاش کنید", "error");
        }
      } else {
        const response = await updateSellerService(Number(seller.id), data);

        if (response.status === 200) {
          Toast("بروزرسانی فروشنده با موفقیت انجام شد", "success");
          handleModalClose();
          onSuccess();
        } else {
          Toast("خطایی رخ داد، لطفاً دوباره تلاش کنید", "error");
        }
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      Toast("خطایی در ثبت فروشنده رخ داد", "error");
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
          <h2 className="ml-auto text-start font-medium">ثبت فروشنده</h2>
        </Dialog.Title>
        <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3">
          <div className="col-span-12">
            <FormLabel htmlFor="modal-form-1">نام فروشنده</FormLabel>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  id="modal-form-1"
                  type="text"
                  placeholder="لطفا نام فروشنده را وارد کنید"
                  className={errors.name ? "border-red-500" : ""}
                />
              )}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div className="col-span-12">
            <FormLabel htmlFor="modal-form-1">کد فروشنده</FormLabel>
            <Controller
              name="seller_id"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  id="modal-form-1"
                  type="number"
                  placeholder="لطفا کد فروشنده را وارد کنید"
                  className={errors.seller_id ? "border-red-500" : ""}
                />
              )}
            />
            {errors.seller_id && <p className="text-red-500 text-sm mt-1">{errors.seller_id.message}</p>}
          </div>
          <div className="col-span-12">
            <FormLabel htmlFor="modal-form-1">ایمیل</FormLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  id="modal-form-1"
                  type="email"
                  placeholder="لطفا ایمیل فروشنده را وارد کنید"
                  className={errors.email ? "border-red-500" : ""}
                />
              )}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="col-span-12">
            <FormLabel htmlFor="modal-form-1">شماره</FormLabel>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  id="modal-form-1"
                  type="text"
                  placeholder="لطفا شماره فروشنده را وارد کنید"
                  className={errors.phone ? "border-red-500" : ""}
                />
              )}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
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

export default CreateAndUpdateSeller;
