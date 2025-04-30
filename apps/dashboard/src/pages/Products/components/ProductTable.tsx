import React, { useRef, useState } from "react";
import Table from "../../../base-components/Table";
import Tippy from "../../../base-components/Tippy";
import Lucide from "../../../base-components/Lucide";
import clsx from "clsx";
import _ from "lodash";
import { Dialog } from "../../../base-components/Headless";
import Button from "../../../base-components/Button";
import { Toast } from "../../../base-components/Toast";
import { removeProductsService } from "../../../services/Axios/Request/products";
import CreateAndUpdateProductModal from "../../../components/ProductFormModal";

const ProductTable = ({ products, onSuccess }: { products: any[]; onSuccess: () => void }) => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const deleteButtonRef = useRef(null);

  const [productModal, setProductModal] = useState<any>();

  const handleDeleteProduct = async (productId: number) => {
    try {
      await removeProductsService(productId)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            Toast("حذف محصول با موفقیت انجام شد", "success");
            onSuccess();
          } else {
            Toast("حذف محصول با خطا مواجه شد", "error");
          }
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || "مشکلی در حذف محصول رخ داد";
          Toast(errorMessage, "error");
        });

      setDeleteConfirmationModal(false);
    } catch (error) {
      console.error("Error deleting product:", error);
      Toast("خطای غیرمنتظره‌ای رخ داد", "error");
    }
  };

  return (
    <>
      <Table.Thead>
        <Table.Tr>
          <Table.Th className="border-b-0 whitespace-nowrap">تصویر</Table.Th>
          <Table.Th className="border-b-0 whitespace-nowrap">نام محصول</Table.Th>
          <Table.Th className="text-center border-b-0 whitespace-nowrap">موجودی</Table.Th>
          <Table.Th className="text-center border-b-0 whitespace-nowrap">وضعیت</Table.Th>
          <Table.Th className="text-center border-b-0 whitespace-nowrap">ربات</Table.Th>
          <Table.Th className="text-center border-b-0 whitespace-nowrap">فعالیت</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {products.map((product, index) => (
          <Table.Tr key={index} className="intro-x">
            <Table.Td className="first:rounded-r-md last:rounded-l-md w-10 bg-white border-b-0 dark:bg-darkmode-600">
              <div className="flex">
                <div className="w-11 h-11 image-fit zoom-in">
                  <Tippy
                    as="img"
                    alt={product.name}
                    className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                    src={product.image}
                    content={`Uploaded at ${product.updated_at}`}
                  />
                </div>
              </div>
            </Table.Td>
            <Table.Td className="first:rounded-r-md last:rounded-l-md bg-white border-b-0 dark:bg-darkmode-600">
              <a href="" className="font-medium lg:w-auto w-72 line-clamp-2 overflow-hidden text-ellipsis">
                {product.name}
              </a>
            </Table.Td>
            <Table.Td className="first:rounded-r-md last:rounded-l-md w-6 text-center bg-white border-b-0 dark:bg-darkmode-600">
              {product.stock}
            </Table.Td>
            <Table.Td className="first:rounded-r-md last:rounded-l-md w-32 bg-white border-b-0 dark:bg-darkmode-600">
              <div
                className={clsx([
                  "flex items-center justify-center",
                  { "text-success": product.status },
                  { "text-danger": !product.status },
                ])}
              >
                <Lucide icon="CheckSquare" className="w-4 h-4 ml-2" />
                {product.status ? "فعال" : "غیر فعال"}
              </div>
            </Table.Td>
            <Table.Td className="first:rounded-r-md last:rounded-l-md w-32 bg-white border-b-0 dark:bg-darkmode-600">
              <div
                className={clsx([
                  "flex items-center justify-center",
                  { "text-success": product.is_robot },
                  { "text-danger": !product.is_robot },
                ])}
              >
                <Lucide icon="CheckSquare" className="w-4 h-4 ml-2" />
                {product.is_robot ? "فعال" : "غیر فعال"}
              </div>
            </Table.Td>
            <Table.Td className="first:rounded-r-md last:rounded-l-md w-56 bg-white border-b-0 dark:bg-darkmode-600 py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:right-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
              <div className="flex items-center justify-center">
                <a onClick={() => setProductModal(product)} className="flex items-center ml-3" href="#">
                  <Lucide icon="CheckSquare" className="w-4 h-4 ml-1" /> ویرایش
                </a>

                <a
                  className="flex items-center text-danger"
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setProductToDelete(product.id);
                    setDeleteConfirmationModal(true);
                  }}
                >
                  <Lucide icon="Trash2" className="w-4 h-4 ml-1" /> حذف
                </a>
              </div>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>

      <Dialog
        open={deleteConfirmationModal}
        onClose={() => {
          setDeleteConfirmationModal(false);
        }}
        initialFocus={deleteButtonRef}
      >
        <Dialog.Panel>
          <div className="p-5 text-center">
            <Lucide icon="XCircle" className="w-16 h-16 mx-auto mt-3 text-danger" />
            <div className="mt-5 text-3xl">آیا اطمینان دارید؟</div>
            <div className="mt-2 text-slate-500">بعد از حذف محصول دیگه هیچ راه برگشتی نیست</div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="danger"
              type="button"
              ref={deleteButtonRef}
              onClick={() => productToDelete && handleDeleteProduct(productToDelete)}
              className="w-24"
            >
              حذف
            </Button>
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
                setProductToDelete(null);
              }}
              className="w-24 mr-1"
            >
              انصراف
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>

      {productModal && (
        <CreateAndUpdateProductModal
          onSuccess={onSuccess}
          product={productModal}
          onClose={() => setProductModal(null)}
        />
      )}
    </>
  );
};

export default ProductTable;
