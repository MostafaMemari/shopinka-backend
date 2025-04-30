import Table from "../../../base-components/Table";
import Tippy from "../../../base-components/Tippy";
import _ from "lodash";
import Button from "../../../base-components/Button";
import { FormInput, FormSwitch } from "../../../base-components/Form";
import { useState } from "react";
import { updateProductSetting } from "../../../services/Axios/Request/products";
import { Toast } from "../../../base-components/Toast";

interface Product {
  id: number;
  name: string;
  image: string;
  updated_at: string;
  product_settings: {
    reduce_price: string;
    min_price: string;
    is_active: boolean;
    is_buyBox: boolean;
    is_check_price: boolean;
  };
}

interface ProductTableProps {
  products: Product[];
  onSuccess: () => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onSuccess }) => {
  const [productStates, setProductStates] = useState(
    products.map((product) => ({
      id: product.id,
      initial: {
        reducePrice: product?.product_settings?.reduce_price || "",
        minPrice: product?.product_settings?.min_price || "",
        isActive: product?.product_settings?.is_active ?? false,
        isBuyBox: product?.product_settings?.is_buyBox ?? false,
        isCheckPrice: product?.product_settings?.is_check_price ?? false,
      },
      current: {
        reducePrice: product?.product_settings?.reduce_price || "",
        minPrice: product?.product_settings?.min_price || "",
        isActive: product?.product_settings?.is_active ?? false,
        isBuyBox: product?.product_settings?.is_buyBox ?? false,
        isCheckPrice: product?.product_settings?.is_check_price ?? false,
      },
      isChanged: false,
    }))
  );

  const handleInputChange = (id: number, field: keyof (typeof productStates)[0]["current"], value: string) => {
    if (/^\d+$/.test(value) || value === "") {
      setProductStates((prevState) => {
        return prevState.map((state) => {
          if (state.id === id) {
            const updatedCurrent = { ...state.current, [field]: value };
            return {
              ...state,
              current: updatedCurrent,
              isChanged: !isEqual(updatedCurrent, state.initial),
            };
          }
          return state;
        });
      });
    }
  };
  const handleCheckboxChange = (id: number, field: keyof (typeof productStates)[0]["current"], checked: boolean) => {
    setProductStates((prevState) => {
      return prevState.map((state) => {
        if (state.id === id) {
          const updatedCurrent = { ...state.current, [field]: checked };
          return {
            ...state,
            current: updatedCurrent,
            isChanged: !isEqual(updatedCurrent, state.initial),
          };
        }
        return state;
      });
    });
  };

  const isEqual = (current: (typeof productStates)[0]["current"], initial: (typeof productStates)[0]["initial"]) => {
    return (
      current.reducePrice === initial.reducePrice &&
      current.minPrice === initial.minPrice &&
      current.isActive === initial.isActive &&
      current.isBuyBox === initial.isBuyBox &&
      current.isCheckPrice === initial.isCheckPrice
    );
  };

  const handleSubmit = async (productId: number) => {
    const productData = productStates.find((state) => state.id === productId);
    if (productData) {
      try {
        const response = await updateProductSetting(productId, productData.current);

        if (response.status === 200) {
          Toast("تنظیمات با موفقیت انجام شد", "success");
          onSuccess();
        } else {
          Toast("خطایی رخ داد، لطفاً دوباره تلاش کنید", "error");
        }
      } catch (error) {
        Toast("لطفا در وارد کردن مقادیر دقت کنید", "error");
      }
    } else {
      console.warn("Product data not found for ID:", productId);
    }
  };

  return (
    <>
      <Table.Thead>
        <Table.Tr>
          <Table.Th className="border-b-0 whitespace-nowrap">تصویر</Table.Th>
          <Table.Th className="border-b-0 whitespace-nowrap">نام محصول</Table.Th>
          <Table.Th className="text-center border-b-0 whitespace-nowrap">کاهش</Table.Th>
          <Table.Th className="text-center border-b-0 whitespace-nowrap">کمترین</Table.Th>
          <Table.Th className="text-center border-b-0 whitespace-nowrap">فعال</Table.Th>
          <Table.Th className="text-center border-b-0 whitespace-nowrap">بای باکس</Table.Th>
          <Table.Th className="text-center border-b-0 whitespace-nowrap">چک قیمت</Table.Th>
          <Table.Th className="text-center border-b-0 whitespace-nowrap"></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {products.map((product) => {
          const productState = productStates.find((state) => state.id === product.id);
          return (
            <Table.Tr key={product.id} className="intro-x">
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
              <Table.Td className="first:rounded-r-md last:rounded-l-md bg-white border-b-0 dark:bg-darkmode-600 text-center">
                <FormInput
                  name="reduce_price"
                  type="text"
                  className="w-16 text-center"
                  value={productState?.current.reducePrice || ""}
                  onChange={(e) => handleInputChange(product.id, "reducePrice", e.target.value)}
                />
              </Table.Td>

              <Table.Td className="first:rounded-r-md last:rounded-l-md bg-white border-b-0 dark:bg-darkmode-600 text-center">
                <FormInput
                  name="min_price"
                  type="text"
                  className="w-20 text-center"
                  value={productState?.current.minPrice || ""}
                  onChange={(e) => handleInputChange(product.id, "minPrice", e.target.value)}
                />
              </Table.Td>

              <Table.Td className="first:rounded-r-md last:rounded-l-md bg-white border-b-0 dark:bg-darkmode-600 w-12">
                <FormSwitch>
                  <FormSwitch.Input
                    name="is_active"
                    type="checkbox"
                    checked={productState?.current.isActive || false}
                    onChange={(e) => handleCheckboxChange(product.id, "isActive", e.target.checked)}
                  />
                </FormSwitch>
              </Table.Td>
              <Table.Td className="first:rounded-r-md last:rounded-l-md bg-white border-b-0 dark:bg-darkmode-600 w-12">
                <FormSwitch>
                  <FormSwitch.Input
                    name="is_buyBox"
                    type="checkbox"
                    checked={productState?.current.isBuyBox || false}
                    onChange={(e) => handleCheckboxChange(product.id, "isBuyBox", e.target.checked)}
                  />
                </FormSwitch>
              </Table.Td>
              <Table.Td className="first:rounded-r-md last:rounded-l-md bg-white border-b-0 dark:bg-darkmode-600 w-12">
                <FormSwitch>
                  <FormSwitch.Input
                    name="is_check_price"
                    type="checkbox"
                    checked={productState?.current.isCheckPrice || false}
                    onChange={(e) => handleCheckboxChange(product.id, "isCheckPrice", e.target.checked)}
                  />
                </FormSwitch>
              </Table.Td>
              <Table.Td className="first:rounded-r-md last:rounded-l-md bg-white border-b-0 dark:bg-darkmode-600 text-center">
                <Button
                  disabled={!productState?.isChanged}
                  variant="primary"
                  className="w-24 mb-2 ml-1"
                  onClick={() => handleSubmit(product.id)}
                >
                  ثبت
                </Button>
              </Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </>
  );
};

export default ProductTable;
