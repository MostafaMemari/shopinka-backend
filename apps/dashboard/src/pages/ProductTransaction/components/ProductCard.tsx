import _ from "lodash";
import Button from "../../../base-components/Button";
import { Product } from "../../../features/product/types/type";
import { FormInput } from "../../../base-components/Form";
import { useState } from "react";
import { transactionsProductService } from "../../../services/Axios/Request/transactions";
import { TransactionType } from "../../../features/transaction/types/enym";
import { Toast } from "../../../base-components/Toast";

interface ProductCardProps {
  products: Product[];
  onSuccess: () => void;
  transactionType: TransactionType;
  resetSearch: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ products, onSuccess, transactionType, resetSearch }) => {
  const transactionLabel = transactionType === TransactionType.PURCHASE ? "خرید" : "فروش";

  const [productStates, setProductStates] = useState<Record<number, { inputValue: string; isButtonDisabled: boolean }>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, productId: number, stock: number) => {
    const value = e.target.value;

    setProductStates((prevStates) => ({
      ...prevStates,
      [productId]: {
        inputValue: value,
        isButtonDisabled: !validateInputValue(value, transactionType, stock),
      },
    }));
  };

  const handleButtonClick = (productId: number, productStock: number) => {
    const productState = productStates[productId];

    if (!productState || !validateInputValue(productState.inputValue, transactionType, productStock)) {
      Toast("مقدار وارد شده معتبر نیست یا شرایط فروش رعایت نشده است.", "error");
      return;
    }

    transactionsProductService(productId, transactionType, { quantity: productState.inputValue })
      .then((result) => {
        if (result.status === 201) {
          Toast(`${transactionLabel} محصول با موفقیت انجام شد`);
          onSuccess();
          resetSearch();
        } else {
          Toast("خطایی در انجام تراکنش رخ داده است", "error");
        }
      })
      .catch((err) => {
        console.error("خطا در انجام تراکنش:", err);
        Toast("متأسفانه خطایی رخ داده است، لطفاً دوباره تلاش کنید.", "error");
      });
  };

  const validateInputValue = (value: string | number | undefined, transactionType: TransactionType, stock: number): boolean => {
    if (!value || isNaN(Number(value))) return false;

    const numericValue = Number(value);

    if (transactionType === TransactionType.SALE) {
      return numericValue > 0 && numericValue <= stock;
    }

    return numericValue > 0;
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        {products.map((product) => {
          const productState = productStates[product.id] || { inputValue: "", isButtonDisabled: true };

          return (
            <div key={product.id} className="intro-y col-span-12 sm:col-span-6 lg:col-span-6 xl:col-span-4 2xl:col-span-3 3xl:col-span-2">
              <div className="box">
                <div className="flex items-start px-5 pt-5 relative">
                  <div className="flex flex-col items-center w-full lg:flex-row">
                    <div className="w-36 h-36 lg:w-16 lg:h-16 image-fit flex-shrink-0">
                      <img alt={product.name} className="rounded-md" src={product.image} />
                    </div>
                    <div className="text-center lg:text-start">
                      <a
                        href="#"
                        className="font-medium lg:w-auto w-auto line-clamp-2 overflow-hidden text-ellipsis lg:mr-4 lg:text-right lg:mt-0 break-words"
                      >
                        {product.name}
                      </a>
                      <div className="text-slate-500 px-5 text-xs mt-0.5">{product.categoryId}</div>
                    </div>
                  </div>
                </div>
                <div className="px-5 my-2 text-center text-xs">
                  <div className="flex items-center justify-center text-slate-500">موجودی : {product.stock} عدد</div>
                  <div className="flex justify-between">
                    <div className="flex items-center justify-center mt-1 lg:justify-start text-slate-500">
                      {transactionLabel} کلی : {product.totalQuantity} عدد
                    </div>
                    <div className="flex items-center justify-center mt-1 lg:justify-start text-slate-500">
                      {transactionLabel} ماهانه : {product.lastMonthQuantity} عدد
                    </div>
                  </div>
                </div>
                <div className="p-5 text-center border-t lg:text-right border-slate-200/60 dark:border-darkmode-400">
                  <div className="flex items-center justify-between">
                    <FormInput
                      className="w-1/3 me-2 py-2"
                      id={`regular-form-${product.id}`}
                      type="number"
                      placeholder="تعداد"
                      value={productState.inputValue}
                      onChange={(e) => handleInputChange(e, product.id, Number(product.stock))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleButtonClick(product.id, Number(product.stock));
                        }
                      }}
                    />

                    <div>
                      <Button
                        disabled={productState.isButtonDisabled}
                        variant="primary"
                        className="px-4 py-2 ml-2"
                        onClick={() => handleButtonClick(product.id, Number(product.stock))}
                      >
                        ثبت
                      </Button>

                      <Button variant="outline-secondary" className="px-4 py-2">
                        گزارش
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductCard;
