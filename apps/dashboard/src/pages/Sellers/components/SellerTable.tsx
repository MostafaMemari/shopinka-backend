import React, { useRef, useState } from "react";
import Table from "../../../base-components/Table";
import Lucide from "../../../base-components/Lucide";
import _ from "lodash";
import { Dialog } from "../../../base-components/Headless";
import Button from "../../../base-components/Button";
import { Toast } from "../../../base-components/Toast";
import { Seller } from "../../../features/sellers/types/type";
import { removeSellerService } from "../../../services/Axios/Request/sellers";
import CreateAndUpdateSeller from "./CreateAndUpdateSeller";

const SellerTable = ({ sellers, onSuccess }: { sellers: Seller[]; onSuccess: () => void }) => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [sellerToDelete, setSellerToDelete] = useState<number | null>(null);
  const deleteButtonRef = useRef(null);

  const [sellerModal, setSellerModal] = useState<any>();

  const handleDeleteSeller = async (sellerId: number) => {
    try {
      await removeSellerService(sellerId)
        .then((res) => {
          if (res.status === 200) {
            Toast("حذف فروشنده با موفقیت انجام شد", "success");
            onSuccess();
          } else {
            Toast("حذف فروشنده با خطا مواجه شد", "error");
          }
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || "مشکلی در حذف فروشنده رخ داد";
          Toast(errorMessage, "error");
        });

      setDeleteConfirmationModal(false);
    } catch (error) {
      console.error("Error deleting seller:", error);
      Toast("خطای غیرمنتظره‌ای رخ داد", "error");
    }
  };

  return (
    <>
      <Table.Thead>
        <Table.Tr>
          <Table.Th className="text-start w-5 border-b-0 whitespace-nowrap">ردیف</Table.Th>
          <Table.Th className="text-start border-b-0 whitespace-nowrap">نام فروشنده</Table.Th>
          <Table.Th className="text-start border-b-0 whitespace-nowrap">کد فروشنده</Table.Th>
          <Table.Th className="text-start border-b-0 whitespace-nowrap">ایمیل</Table.Th>
          <Table.Th className="text-start border-b-0 whitespace-nowrap">شماره تماس</Table.Th>
          <Table.Th className="text-center border-b-0 whitespace-nowrap">عملیات</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {sellers.map((seller, index) => (
          <Table.Tr key={seller.id} className="intro-x">
            <Table.Td className="py-4 first:rounded-r-md last:rounded-l-md bg-white border-b-0 dark:bg-darkmode-600">
              {index + 1}
            </Table.Td>
            <Table.Td className="first:rounded-r-md last:rounded-l-md bg-white border-b-0 dark:bg-darkmode-600">
              {seller.name}
            </Table.Td>
            <Table.Td className="first:rounded-r-md last:rounded-l-md bg-white border-b-0 dark:bg-darkmode-600">
              {seller.seller_id}
            </Table.Td>
            <Table.Td className="first:rounded-r-md last:rounded-l-md bg-white border-b-0 dark:bg-darkmode-600">
              {seller.email}
            </Table.Td>
            <Table.Td className="first:rounded-r-md last:rounded-l-md bg-white border-b-0 dark:bg-darkmode-600">
              {seller.phone}
            </Table.Td>

            <Table.Td className="first:rounded-r-md last:rounded-l-md w-56 bg-white border-b-0 dark:bg-darkmode-600 py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:right-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
              <div className="flex items-center justify-center">
                <a onClick={() => setSellerModal(seller)} className="flex items-center ml-3" href="#">
                  <Lucide icon="CheckSquare" className="w-4 h-4 ml-1" /> ویرایش
                </a>

                <a
                  className="flex items-center text-danger"
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setSellerToDelete(seller.id);
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
            <div className="mt-2 text-slate-500">بعد از حذف فروشنده دیگه هیچ راه برگشتی نیست</div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="danger"
              type="button"
              ref={deleteButtonRef}
              onClick={() => sellerToDelete && handleDeleteSeller(sellerToDelete)}
              className="w-24"
            >
              حذف
            </Button>
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
                setSellerToDelete(null);
              }}
              className="w-24 mr-1"
            >
              انصراف
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>

      {sellerModal && (
        <CreateAndUpdateSeller onSuccess={onSuccess} seller={sellerModal} onClose={() => setSellerModal(null)} />
      )}
    </>
  );
};

export default SellerTable;
