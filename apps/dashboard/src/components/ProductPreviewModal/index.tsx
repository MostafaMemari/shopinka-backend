import { Dialog } from "../../base-components/Headless";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import { FormInput } from "../../base-components/Form";
import { MouseEvent, useEffect, useRef, useState } from "react";
import Table from "../../base-components/Table";
import _, { get } from "lodash";
import Tippy from "../../base-components/Tippy";

import ProductSelectModal from "../ProductSelectModal";
import { useForm } from "react-hook-form";
import { Toast } from "../../base-components/Toast";
import { RelatedProduct } from "../../features/product/types/type";

interface ProductPreviewModalProps {
  previousModal: {
    setData: (selectedProducts: RelatedProduct[]) => RelatedProduct[];
  };
  selectedProducts: RelatedProduct[];
}

const ProductPreviewModal: React.FC<ProductPreviewModalProps> = ({ previousModal, selectedProducts }) => {
  const { register, setValue, getValues } = useForm({ mode: "onChange" });

  const [headerFooterModalPreview, setHeaderFooterModalPreview] = useState<boolean>(false);
  const [previewProducts, setPreviewProducts] = useState<RelatedProduct[]>([]);
  const sendButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setPreviewProducts(selectedProducts);
  }, [selectedProducts]);

  const selectedProductModal = (newSelectedProducts: RelatedProduct[]) => {
    setPreviewProducts(newSelectedProducts);
  };

  const checkQuantitiesValidity = (): boolean => {
    return previewProducts.every((product: RelatedProduct) => {
      const quantity = product.quantity;
      return quantity && !isNaN(Number(quantity)) && Number(quantity) > 0;
    });
  };

  const handleSendData = (): void => {
    if (!checkQuantitiesValidity()) {
      Toast("لطفا تعداد را صحیح وارد کنید.", "error");
      return;
    }

    previousModal.setData(updatedProducts);
    setHeaderFooterModalPreview(false);
  };

  const updatedProducts: any = previewProducts.map((product) => {
    const productKey = `product-${product.childProductId}`;
    const quantity = getValues(productKey);

    if (quantity) {
      return {
        ...product,
        quantity: parseInt(quantity, 10),
      };
    }
    return product;
  });

  const handleRemoveProduct = (productId: number | undefined): void => {
    setPreviewProducts((previewProducts) => previewProducts.filter((product) => product.childProductId !== productId));
  };

  const handleCloseModal = (): void => {
    const isValid = checkQuantitiesValidity();
    if (previewProducts.length !== 0) {
      if (!isValid) {
        Toast("لطفا تعداد را صحیح وارد کنید.", "error");
        return;
      }
    }

    setHeaderFooterModalPreview(false);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, product: RelatedProduct): void => {
    const value = e.target.value;

    setValue(`product-${product.childProductId}`, value);

    setPreviewProducts((prevProducts) => {
      return prevProducts.map((previewProducts) =>
        previewProducts.childProductId === product.childProductId
          ? { ...previewProducts, quantity: Number(value) }
          : previewProducts
      );
    });
  };

  return (
    <>
      <Button
        as="a"
        href="#"
        variant="secondary"
        className="w-34 mr-2 flex items-center order-2"
        onClick={(event: MouseEvent) => {
          event.preventDefault();
          handleCloseModal();
          setHeaderFooterModalPreview(true);
        }}
      >
        <Lucide icon="AlignJustify" className="w-4 h-4 ml-2" />
        لیست محصولات {!!previewProducts.length && `( ${previewProducts.length} )`}
      </Button>

      <Dialog size="lg" open={headerFooterModalPreview} onClose={handleCloseModal} initialFocus={sendButtonRef}>
        <Dialog.Panel className="overflow-auto">
          <Dialog.Title className="flex justify-between items-center">
            <h2 className="ml-auto text-base font-medium whitespace-nowrap">انتخاب محصول</h2>
          </Dialog.Title>

          {!!previewProducts.length && (
            <Dialog.Description className="flex items-center justify-center">
              <div className="overflow-x-auto">
                <Table hover className="-mt-4 text-start">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th className="whitespace-nowrap">تصویر</Table.Th>
                      <Table.Th className="whitespace-nowrap">نام محصول</Table.Th>
                      <Table.Th className="whitespace-nowrap">تعداد</Table.Th>
                      <Table.Th className="whitespace-nowrap">حذف</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {previewProducts.map((product: RelatedProduct) => (
                      <Table.Tr key={product.childProductId} className="intro-x">
                        <Table.Td className="w-10">
                          <div className="flex">
                            <div className="w-11 h-11 image-fit zoom-in">
                              <Tippy
                                as="img"
                                alt={product.name}
                                className="rounded-full"
                                src={product.image}
                                content={`name is ${product.name}`}
                              />
                            </div>
                          </div>
                        </Table.Td>
                        <Table.Td className="w-auto">
                          <a href="#" className="font-medium w-64 line-clamp-2 overflow-hidden text-ellipsis">
                            {product.name}
                          </a>
                        </Table.Td>
                        <Table.Td className="text-center ">
                          <FormInput
                            type="text"
                            className="text-center w-12"
                            defaultValue={product.quantity}
                            {...register(`product-${product.childProductId}`, {
                              required: "تعداد الزامی است.",
                              min: { value: 1, message: "تعداد باید حداقل 1 باشد." },
                            })}
                            onChange={(e) => handleQuantityChange(e, product)}
                          />
                        </Table.Td>
                        <Table.Td className="text-center text-danger">
                          <div onClick={() => handleRemoveProduct(product.childProductId)} className="text-danger">
                            <Lucide icon="Trash2" className="w-auto cursor-pointer" />
                          </div>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
            </Dialog.Description>
          )}

          <div className="m-auto my-3 w-40">
            <ProductSelectModal
              selectedProductData={previewProducts}
              //@ts-ignore
              previousModal={{ setData: selectedProductModal }}
            />
          </div>
          <Dialog.Footer>
            <Button variant="primary" type="button" className="w-20" ref={sendButtonRef} onClick={handleSendData}>
              ثبت
            </Button>
            <Button onClick={handleCloseModal} type="button" variant="outline-secondary" className="w-20 mr-1">
              انصراف
            </Button>
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default ProductPreviewModal;
