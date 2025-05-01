import Table from "../../../base-components/Table";
import Lucide from "../../../base-components/Lucide";
import { Toast } from "../../../base-components/Toast";
import { removeProductAttributeService } from "../../../services/Axios/Request/productAttribute/attribute";
import { IProductAttribute } from "../../../features/productAttribute/types/type";
import Swal from "sweetalert2";

interface Props {
  productAttributes?: IProductAttribute[];
  onSuccess: () => void;
  onEdit: (attribute: IProductAttribute) => void; // برای باز کردن فرم ویرایش
}

const ProductAttributeTable = ({ productAttributes = [], onSuccess, onEdit }: Props) => {
  console.log("productAttributes:", productAttributes);

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
      }
    }
  };

  return (
    <Table className="border-separate rounded-lg shadow-sm">
      <Table.Thead className="bg-gray-100 dark:bg-darkmode-800">
        <Table.Tr>
          <Table.Th className="text-right w-1/4 py-3 px-4">نام ویژگی</Table.Th>
          <Table.Th className="text-right w-1/6 py-3 px-4">نوع</Table.Th>
          <Table.Th className="text-right w-2/5 py-3 px-4">مقادیر</Table.Th>
          <Table.Th className="text-right w-1/6 py-3 px-4">فعالیت</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {productAttributes.length > 0 ? (
          productAttributes.map((item, index) => (
            <Table.Tr key={item.id || index} className="intro-x hover:bg-gray-50 dark:hover:bg-darkmode-700">
              <Table.Td className="py-3 px-4 bg-white dark:bg-darkmode-600 text-right">
                <a href="#" className="font-medium truncate block max-w-[200px]" title={item.name} onClick={(e) => e.preventDefault()}>
                  {item.name}
                </a>
              </Table.Td>
              <Table.Td className="py-3 px-4 bg-white dark:bg-darkmode-600 text-right">{item.type === "COLOR" ? "رنگ" : "دکمه"}</Table.Td>
              <Table.Td className="py-3 px-4 bg-white dark:bg-darkmode-600 text-right"></Table.Td>
              <Table.Td className="py-3 px-4 bg-white dark:bg-darkmode-600 text-right">
                <div className="flex items-center justify-end gap-3">
                  <a
                    href="#"
                    className="flex items-center text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      onEdit(item); // باز کردن فرم ویرایش
                    }}
                  >
                    <Lucide icon="CheckSquare" className="w-4 h-4 ml-1" />
                    ویرایش
                  </a>
                  <a
                    href="#"
                    className="flex items-center text-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      if (typeof item.id === "number") {
                        handleDeleteProduct(item.id);
                      }
                    }}
                  >
                    <Lucide icon="Trash2" className="w-4 h-4 ml-1" />
                    حذف
                  </a>
                </div>
              </Table.Td>
            </Table.Tr>
          ))
        ) : (
          <Table.Tr>
            <Table.Td colSpan={4} className="py-3 px-4 text-center bg-white dark:bg-darkmode-600">
              هیچ ویژگی‌ای یافت نشد
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
};

export default ProductAttributeTable;
