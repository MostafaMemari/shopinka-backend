import Table from "../../../../base-components/Table";
import Lucide from "../../../../base-components/Lucide";
import { IProductAttribute } from "../../../../features/productAttribute/types/type";
import useRemoveProductAttribute from "../../../../features/productAttribute/hooks/useRemoveProductAttribute";

interface Props {
  productAttributes?: IProductAttribute[];
  onSuccess: () => void;
  onEdit: (attribute: IProductAttribute) => void;
}

const ProductAttributeTable = ({ productAttributes = [], onSuccess, onEdit }: Props) => {
  const { handleDeleteProduct } = useRemoveProductAttribute({ onSuccess });

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
                      onEdit(item);
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
