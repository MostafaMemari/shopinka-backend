import Table from "../../../base-components/Table";
import Lucide from "../../../base-components/Lucide";
import _ from "lodash";

import { Transaction } from "../../../features/transaction/types/type";
import { TransactionType } from "../../../features/transaction/types/enym";
import clsx from "clsx";
import moment from "moment-jalaali";

const ProductTable = ({ transactions, onSuccess }: { transactions: Transaction[]; onSuccess: () => void }) => {
  moment.locale("fa");
  moment.loadPersian({ usePersianDigits: true, dialect: "persian-modern" });
  return (
    <>
      <Table.Thead>
        <Table.Tr>
          <Table.Th className="border-b-0 whitespace-nowrap">تصویر</Table.Th>
          <Table.Th className="border-b-0 whitespace-nowrap">نام محصول</Table.Th>
          <Table.Th className="text-center border-b-0 whitespace-nowrap">تعداد</Table.Th>
          <Table.Th className="text-center border-b-0 whitespace-nowrap">عملیات</Table.Th>
          <Table.Th className="text-center border-b-0 whitespace-nowrap">ساعت</Table.Th>
          <Table.Th className="text-center border-b-0 whitespace-nowrap">تاریخ</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {transactions.map((transaction) => (
          <Table.Tr key={transaction.id} className="intro-x">
            <Table.Td className="first:rounded-r-md last:rounded-l-md w-10 bg-white border-b-0 dark:bg-darkmode-600">
              <div className="flex">
                <div className="w-11 h-11 image-fit zoom-in">
                  <img
                    alt={transaction.product.name}
                    className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                    src={transaction.product.image}
                  />
                </div>
              </div>
            </Table.Td>
            <Table.Td className="bg-white border-b-0 dark:bg-darkmode-600">
              <a href="" className="font-medium lg:w-auto w-72 line-clamp-2 overflow-hidden text-ellipsis">
                {transaction.product.name}
              </a>
            </Table.Td>
            <Table.Td className="w-6 text-center bg-white border-b-0 dark:bg-darkmode-600">
              {transaction.quantity}
            </Table.Td>
            <Table.Td className="w-28 bg-white border-b-0 dark:bg-darkmode-600">
              <div
                className={clsx(
                  transaction.type === TransactionType.PURCHASE ? "bg-success" : "bg-danger",
                  "py-[5px] flex items-center justify-between rounded-full text-white pr-2 pl-1 font-medium"
                )}
              >
                {transaction.type === TransactionType.PURCHASE ? "خرید" : "فروش"}
                <Lucide
                  icon={transaction.type === TransactionType.PURCHASE ? "ChevronUp" : "ChevronDown"}
                  className="w-4 h-4 ml-0.5"
                />
              </div>
            </Table.Td>
            <Table.Td className="whitespace-nowrap w-20 px-6 bg-white border-b-0 dark:bg-darkmode-600 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:right-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400 text-center">
              {transaction.created_at ? moment(transaction.created_at).locale("fa").format("HH:mm") : "N/A"}
            </Table.Td>
            <Table.Td className="whitespace-nowrap w-20 px-6 first:rounded-r-md last:rounded-l-md bg-white border-b-0 dark:bg-darkmode-600  relative text-center">
              {transaction.created_at ? moment(transaction.created_at).locale("fa").format("jDD jMMMM jYYYY ") : "N/A"}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </>
  );
};

export default ProductTable;
