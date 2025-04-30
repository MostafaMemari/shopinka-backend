import React, { useRef, useState } from "react";
import Table from "../../../base-components/Table";
import Lucide from "../../../base-components/Lucide";
import _ from "lodash";
import { Dialog } from "../../../base-components/Headless";
import Button from "../../../base-components/Button";
import { Toast } from "../../../base-components/Toast";
import { removeColorService } from "../../../services/Axios/Request/colors";
import CreateAndUpdateColor from "./CreateAndUpdateColor";

const ColorTable = ({ colors, onSuccess }: { colors: any[]; onSuccess: () => void }) => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [colorToDelete, setColorToDelete] = useState<number | null>(null);
  const deleteButtonRef = useRef(null);

  const [colorModal, setColorModal] = useState<any>();

  const handleDeleteColor = async (colorId: number) => {
    try {
      await removeColorService(colorId)
        .then((res) => {
          if (res.status === 200) {
            Toast("حذف رنگ با موفقیت انجام شد", "success");
            onSuccess();
          } else {
            Toast("حذف رنگ با خطا مواجه شد", "error");
          }
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || "مشکلی در حذف رنگ رخ داد";
          Toast(errorMessage, "error");
        });

      setDeleteConfirmationModal(false);
    } catch (error) {
      console.error("Error deleting color:", error);
      Toast("خطای غیرمنتظره‌ای رخ داد", "error");
    }
  };

  return (
    <>
      <Table.Thead>
        <Table.Tr>
          <Table.Th className="text-start w-5 border-b-0 whitespace-nowrap">ردیف</Table.Th>
          <Table.Th className="text-start border-b-0 whitespace-nowrap">نام رنگ</Table.Th>
          <Table.Th className="text-center border-b-0 whitespace-nowrap">فعالیت</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {colors.map((color, index) => (
          <Table.Tr key={color.id} className="intro-x">
            <Table.Td className="py-4 first:rounded-r-md last:rounded-l-md bg-white border-b-0 dark:bg-darkmode-600">
              {index + 1}
            </Table.Td>
            <Table.Td className="first:rounded-r-md last:rounded-l-md bg-white border-b-0 dark:bg-darkmode-600">
              <a href="" className="font-medium lg:w-auto w-max-72 line-clamp-2 overflow-hidden text-ellipsis">
                {color.name}
              </a>
            </Table.Td>

            <Table.Td className="first:rounded-r-md last:rounded-l-md w-56 bg-white border-b-0 dark:bg-darkmode-600 py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:right-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
              <div className="flex items-center justify-center">
                <a onClick={() => setColorModal(color)} className="flex items-center ml-3" href="#">
                  <Lucide icon="CheckSquare" className="w-4 h-4 ml-1" /> ویرایش
                </a>

                <a
                  className="flex items-center text-danger"
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setColorToDelete(color.id);
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
            <div className="mt-2 text-slate-500">بعد از حذف رنگ دیگه هیچ راه برگشتی نیست</div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="danger"
              type="button"
              ref={deleteButtonRef}
              onClick={() => colorToDelete && handleDeleteColor(colorToDelete)}
              className="w-24"
            >
              حذف
            </Button>
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
                setColorToDelete(null);
              }}
              className="w-24 mr-1"
            >
              انصراف
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>

      {colorModal && (
        <CreateAndUpdateColor onSuccess={onSuccess} color={colorModal} onClose={() => setColorModal(null)} />
      )}
    </>
  );
};

export default ColorTable;
