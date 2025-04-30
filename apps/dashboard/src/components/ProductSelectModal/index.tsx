import { Dialog, Menu } from "../../base-components/Headless";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import { FormCheck, FormInput } from "../../base-components/Form";
import { MouseEvent, useEffect, useRef, useState } from "react";
import Table from "../../base-components/Table";
import _ from "lodash";
import Tippy from "../../base-components/Tippy";
import { useFetchData } from "../../hooks/useFetchData";
import { getProductsService } from "../../services/Axios/Request/products";
import SearchInput from "../../base-components/SearchInput";
import Pagination from "../Pagination/Pagination";
import { Product, RelatedProduct } from "../../features/product/types/type";

interface ProductSelectModalProps {
  previousModal: {
    setData: (selectedProducts: RelatedProduct[]) => RelatedProduct[];
  };
  selectedProductData: RelatedProduct[];
}

const ProductSelectModal: React.FC<ProductSelectModalProps> = ({ previousModal, selectedProductData }) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<RelatedProduct[]>(selectedProductData);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [headerFooterModalPreview, setHeaderFooterModalPreview] = useState<boolean>(false);

  const { data, loading } = useFetchData(getProductsService, page, limit, search);

  useEffect(() => {
    setSelectedProducts(selectedProductData);
  }, [selectedProductData]);

  const sendButtonRef = useRef<HTMLButtonElement>(null);

  const combinedProducts = loading ? [] : data?.data.products || [];

  const toggleProductSelection = (product: Product): void => {
    setSelectedProducts((prevSelected) => {
      const isSelected = prevSelected.some((p) => p.childProductId === product.id);
      if (isSelected) {
        return prevSelected.filter((p) => p.childProductId !== product.id);
      }
      return [...prevSelected, { childProductId: product.id, name: product.name, image: product.image, quantity: 1 }];
    });
  };

  const toggleSelectAll = (): void => {
    setSelectAll((prevSelectAll) => !prevSelectAll);
    setSelectedProducts((selectAll ? [] : data?.data.products) || []);
  };

  const handleSendData = (): void => {
    previousModal.setData(selectedProducts);
    setHeaderFooterModalPreview(false);
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
          setHeaderFooterModalPreview(true);
        }}
      >
        <Lucide icon="Plus" className="w-4 h-4 ml-2" />
        افزودن محصول
      </Button>

      <Dialog
        size="md"
        open={headerFooterModalPreview}
        onClose={() => setHeaderFooterModalPreview(false)}
        initialFocus={sendButtonRef}
      >
        <Dialog.Panel className="overflow-auto">
          <Dialog.Title className="flex justify-between items-center">
            <h2 className="ml-auto text-base font-medium whitespace-nowrap">انتخاب محصول</h2>
            <SearchInput onSearch={(searchValue) => setSearch(searchValue)} />
          </Dialog.Title>

          <Dialog.Description className="flex flex-col items-center justify-center">
            <Table hover className="-mt-2 text-start mb-4">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th className="w-10">
                    <FormCheck.Input type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap">تصویر</Table.Th>
                  <Table.Th className="whitespace-nowrap">نام محصول</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {combinedProducts.map((product: Product) => (
                  <Table.Tr key={product.id} className="intro-x">
                    <Table.Td className="w-10">
                      <FormCheck.Input
                        type="checkbox"
                        checked={selectedProducts.some((p) => p.childProductId === product.id)}
                        onChange={() => toggleProductSelection(product)}
                      />
                    </Table.Td>
                    <Table.Td>
                      <div className="flex">
                        <div className="w-11 h-11 image-fit zoom-in">
                          <Tippy
                            as="img"
                            alt={product.name}
                            className="rounded-full"
                            src={product.image}
                            content={`Uploaded at ${product.updated_at}`}
                          />
                        </div>
                      </div>
                    </Table.Td>
                    <Table.Td className="w-auto">
                      <a href="#" className="font-medium w-60 line-clamp-2 overflow-hidden text-ellipsis">
                        {product.name}
                      </a>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>

            {!loading && data?.data.pagination && (
              <Pagination
                page={page}
                limit={limit}
                pageCount={data.data.pagination.pageCount}
                onPageChange={setPage}
                onLimitChange={setLimit}
              />
            )}
          </Dialog.Description>

          <Dialog.Footer>
            <Button variant="primary" type="button" className="w-20" ref={sendButtonRef} onClick={handleSendData}>
              ارسال
            </Button>
            <Button
              type="button"
              variant="outline-secondary"
              onClick={() => setHeaderFooterModalPreview(false)}
              className="w-20 mr-1"
            >
              انصراف
            </Button>
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};
export default ProductSelectModal;
