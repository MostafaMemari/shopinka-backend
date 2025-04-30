import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog } from "../../base-components/Headless";
import { FormInput, FormSwitch } from "../../base-components/Form";
import Button from "../../base-components/Button";
import ImageUploader from "../ImageUploader";
import TomSelect from "../../base-components/TomSelect";
import ProductPreviewModal from "../ProductPreviewModal";
import { Toast } from "../../base-components/Toast";
import { createProductService, updateProductService } from "../../services/Axios/Request/products";
import LoadingIcon from "../../base-components/LoadingIcon";
import { getUpdatedPayload } from "./core";
import { Product, RelatedProduct } from "../../features/product/types/type";
import { productSchema } from "../../features/product/schemas/productSchema";
import { ProductType } from "../../features/product/types/enum";

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
  onClose: () => void;
}

const CreateAndUpdateProductModal: React.FC<ProductFormProps> = ({ onSuccess, product, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Product>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      dkp: product?.dkp || "",
      dkpc: product?.dkpc || "",
      price: product?.price || "",
      width: product?.width || "",
      height: product?.height || "",
      stock: product?.stock || "",
      type: product?.type ? product?.type : ProductType.SINGLE,
      sellerId: product?.sellerId ? String(product?.sellerId) : undefined,
      colorId: product?.colorId ? String(product?.colorId) : undefined,
      categoryId: product?.categoryId ? String(product?.categoryId) : undefined,
      image: product?.image || undefined,
      relatedProducts: product?.relatedProducts || [],

      status: product?.status,
      is_robot: product?.is_robot,
    },
  });

  // مشاهده مقادیر فیلدها
  const statusValue = watch("status");
  const isRobotValue = watch("is_robot");

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedType, setSelectedType] = useState<ProductType | undefined>(ProductType.SINGLE);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);

  const [isImageReset, setIsImageReset] = useState<boolean>(false);

  useEffect(() => {
    if (isImageReset) {
      reset();
      setIsImageReset(false);
    }

    if (product) {
      setRelatedProducts(product?.relatedProducts || []);
      setSelectedType(product?.type);
    }

    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isImageReset, product, reset]);

  const handleFormSubmit = async (data: any) => {
    try {
      let payload = { ...data, type: selectedType };

      if (selectedType !== ProductType.SINGLE && (!Array.isArray(relatedProducts) || relatedProducts.length === 0)) {
        Toast("محصولات مرتبط نباید خالی باشد", "error");
        return;
      }

      if (selectedType !== ProductType.SINGLE) {
        payload.relatedProducts = relatedProducts.map((relatedProduct) => ({
          childProductId: relatedProduct.childProductId,
          quantity: relatedProduct.quantity,
        }));
      }

      if (!product) {
        const response = await createProductService(payload);

        if (response.status === 201) {
          Toast("محصول جدید با موفقیت انجام شد", "success");
          handleModalClose();
          onSuccess();
        } else {
          Toast("خطایی رخ داد، لطفاً دوباره تلاش کنید", "error");
        }
      } else {
        const updatedPayload = getUpdatedPayload(payload, product);

        const response = await updateProductService(product.id, updatedPayload);

        if (response.status === 200) {
          Toast("بروزرسانی محصول با موفقیت انجام شد", "success");
          handleModalClose();
          onSuccess();
        } else {
          Toast("خطایی رخ داد، لطفاً دوباره تلاش کنید", "error");
        }
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      Toast("خطایی در ثبت محصول رخ داد", "error");
    }
  };

  const handleModalData = (relatedProductPreview: RelatedProduct[]) => {
    setRelatedProducts(relatedProductPreview);
  };

  const resetFormStates = () => {
    setSelectedType(ProductType.SINGLE);
    setRelatedProducts([]);
    setIsImageReset(true);
  };

  const handleModalClose = () => {
    reset();
    setIsModalOpen(false);
    resetFormStates();
    onClose();
  };

  return (
    <>
      <Dialog size="xl" open={isModalOpen} onClose={handleModalClose}>
        <Dialog.Panel className="p-10 text-center">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
            <div className="flex flex-col items-center w-100">
              <ImageUploader control={control} imageUrl={product?.image} name="image" />
              {errors.image && <div className="text-danger pt-1 text-start">{errors.image.message}</div>}

              <div>
                <FormSwitch className="gap-2 mt-2">
                  <FormSwitch.Input
                    {...register("status")}
                    id="checkbox-switch-status"
                    type="checkbox"
                    onChange={(e) => {
                      const newValue = e.target.checked;
                      setValue("status", newValue);
                    }}
                    checked={statusValue}
                    tabIndex={13}
                  />
                  <FormSwitch.Label htmlFor="checkbox-switch-status">وضعیت</FormSwitch.Label>
                </FormSwitch>

                <FormSwitch className="gap-2 mt-2">
                  <FormSwitch.Input
                    {...register("is_robot")}
                    id="checkbox-switch-robot"
                    type="checkbox"
                    onChange={(e) => {
                      const newValue = e.target.checked;
                      setValue("is_robot", newValue);
                    }}
                    checked={isRobotValue}
                    tabIndex={14}
                  />
                  <FormSwitch.Label htmlFor="checkbox-switch-robot">ربات</FormSwitch.Label>
                </FormSwitch>
              </div>
            </div>
            <div className="lg:col-span-2 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-4">
              <div className="col-span-1 sm:col-span-3">
                <FormInput tabIndex={1} {...register("name")} id="name" type="text" placeholder="نام محصول *" />
                {errors.name && <div className="text-danger pt-1 text-start">{errors.name.message}</div>}
              </div>

              <div>
                <FormInput tabIndex={2} {...register("dkp")} id="dkp" type="text" placeholder="DKP *" />
                {errors.dkp && <div className="text-danger pt-1 text-start">{errors.dkp.message}</div>}
              </div>

              <div>
                <FormInput tabIndex={3} {...register("dkpc")} id="dkpc" type="text" placeholder="DKPC *" />
                {errors.dkpc && <div className="text-danger pt-1 text-start">{errors.dkpc.message}</div>}
              </div>

              <div>
                <FormInput tabIndex={4} {...register("price")} id="price" type="text" placeholder="قیمت" />
                {errors.price && <div className="text-danger pt-1 text-start">{errors.price.message}</div>}
              </div>

              <div>
                <FormInput tabIndex={5} {...register("stock")} id="stock" type="text" placeholder="موجودی" />
                {errors.stock && <div className="text-danger pt-1 text-start">{errors.stock.message}</div>}
              </div>

              <div>
                <FormInput tabIndex={6} {...register("height")} id="height" type="text" placeholder="ارتفاع" />
                {errors.height && <div className="text-danger pt-1 text-start">{errors.height.message}</div>}
              </div>

              <div>
                <FormInput tabIndex={7} {...register("width")} id="width" type="text" placeholder="عرض" />
                {errors.width && <div className="text-danger pt-1 text-start">{errors.width.message}</div>}
              </div>

              <div className="flex flex-col justify-start col-span-1 sm:col-span-3 lg:col-span-3">
                <div className="flex items-center flex-col sm:flex-row gap-3">
                  <div className="flex flex-col">
                    <Controller
                      name="type"
                      control={control}
                      render={({ field }) => (
                        <TomSelect
                          {...field}
                          value={selectedType || field.value}
                          onChange={(value) => {
                            field.onChange(String(value));
                            setSelectedType(value as ProductType);
                          }}
                          name="type"
                          tabIndex={8}
                          options={{
                            placeholder: "نوع محصول",
                          }}
                          className="w-40 order-1"
                        >
                          <option value="single">تکی</option>
                          <option value="dependent">وابسته</option>
                          <option value="combination">ترکیبی</option>
                          <option value="multi">چندگانه</option>
                        </TomSelect>
                      )}
                    />
                  </div>
                  {selectedType !== "single" && (
                    <ProductPreviewModal
                      selectedProducts={relatedProducts}
                      //@ts-ignore
                      previousModal={{ setData: handleModalData }}
                    />
                  )}
                </div>
                <div className="flex">
                  {errors.type && <div className="text-danger text-start pt-1 order-3">{errors.type.message}</div>}
                  {selectedType !== "single" && relatedProducts.length === 0 && (
                    <div className="text-danger text-start pt-1 order-3">لطفا محصولات مرتبط را انتخاب کنید</div>
                  )}
                </div>
              </div>

              <div className="col-span-1 sm:col-span-3 lg:col-span-3">
                <div className="lg:col-span-2 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <Controller
                      name="colorId"
                      control={control}
                      render={({ field }) => (
                        <TomSelect
                          {...field}
                          value={field.value || "0"}
                          onChange={(value) => {
                            field.onChange(String(value));
                          }}
                          tabIndex={9}
                          options={{
                            placeholder: "انتخاب رنگ",
                          }}
                          className="w-full"
                        >
                          <option value="1">سفید</option>
                          <option value="4">طلایی</option>
                          <option value="2">زرد</option>
                          <option value="3">مشکی</option>
                          <option value="6">قرمز</option>
                          <option value="5">چند رنگ</option>
                        </TomSelect>
                      )}
                    />

                    {errors.colorId && <div className="text-danger pt-1 text-start">{errors.colorId.message}</div>}
                  </div>

                  <div className="flex flex-col">
                    <Controller
                      name="categoryId"
                      control={control}
                      render={({ field }) => (
                        <TomSelect
                          {...field}
                          value={field.value || "0"}
                          onChange={(value) => {
                            field.onChange(String(value));
                          }}
                          options={{
                            placeholder: "انتخاب دسته بندی",
                          }}
                          tabIndex={10}
                          className="w-full"
                        >
                          <option value="8431">استیکر و پوستر</option>
                          <option value="10704">آرم و برچسب خودرو</option>
                          <option value="5857">سایر لوازم خودرو</option>
                          <option value="9280">سایر لوازم جانبی موتور سیکلت</option>
                        </TomSelect>
                      )}
                    />
                    {errors.categoryId && (
                      <div className="text-danger pt-1 text-start">{errors.categoryId.message}</div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Controller
                      name="sellerId"
                      control={control}
                      render={({ field }) => (
                        <TomSelect
                          {...field}
                          value={field.value || "0"}
                          onChange={(value) => {
                            field.onChange(String(value));
                          }}
                          options={{
                            placeholder: "انتخاب فروشنده",
                          }}
                          tabIndex={11}
                          className="w-full"
                        >
                          <option value="1">ماتریسیو</option>
                        </TomSelect>
                      )}
                    />
                    {errors.sellerId && <div className="text-danger pt-1 text-start">{errors.sellerId.message}</div>}
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="primary"
              className="mb-2 ml-1"
              onClick={handleSubmit(handleFormSubmit)}
              disabled={isSubmitting}
              tabIndex={15}
            >
              {isSubmitting ? (
                <>
                  <LoadingIcon icon="oval" color="white" className="w-4 h-4 ml-2" />
                  در حال ثبت محصول
                </>
              ) : (
                "ثبت محصول"
              )}
            </Button>
          </form>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default CreateAndUpdateProductModal;
