import { useState } from "react";
import Button from "../../../base-components/Button";
import { Slideover } from "../../../base-components/Headless";
import useProductAttributeLogic from "../../../features/productAttribute/hooks/useCreateProductAttribute";
import ProductAttributeForm from "../../../features/productAttribute/form/productAttributeForm";
import { useProductAttribute } from "../../../features/productAttribute/hooks/useProductAttribute";
import ProductAttributeTable from "./components/ProductAttributeTable";
import Table from "../../../base-components/Table";
import LoadingIcon from "../../../base-components/LoadingIcon";
import { IProductAttribute, IProductAttributeFormValues } from "../../../features/productAttribute/types/type";

const ProductAttribute = () => {
  const [headerFooterSlideoverPreview, setHeaderFooterSlideoverPreview] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState<IProductAttributeFormValues | null>(null);
  const { data, isLoading, isFetching, error, refetch } = useProductAttribute({});

  const { loading, handleSubmitForm, handleUpdateForm } = useProductAttributeLogic({
    refetch,
    closeSlideAttribute: () => setHeaderFooterSlideoverPreview(false),
  });

  const [formValues, setFormValues] = useState<IProductAttributeFormValues>({
    name: "",
    slug: "",
    type: "COLOR",
    description: "",
  });

  const handleFormChange = (values: IProductAttributeFormValues) => {
    setFormValues(values);
  };

  const onSubmit = (values: IProductAttributeFormValues) => {
    if (editingAttribute?.id) {
      handleUpdateForm({ ...values, id: editingAttribute.id });
    } else {
      handleSubmitForm(values);
    }
    setFormValues({ name: "", slug: "", type: "COLOR", description: "" });
    setEditingAttribute(null);
    setHeaderFooterSlideoverPreview(false);
  };

  const handleEdit = (attribute: IProductAttribute) => {
    const formData: IProductAttributeFormValues = {
      id: typeof attribute.id === "string" ? parseInt(attribute.id) : attribute.id,
      name: attribute.name,
      slug: attribute.slug,
      type: attribute.type,
      description: attribute.description || "",
    };
    setEditingAttribute(formData);
    setFormValues(formData);
    setHeaderFooterSlideoverPreview(true);
  };

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">ویژگی‌ها</h2>

      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Button
            variant="primary"
            className="mr-2 shadow-md"
            onClick={(event: React.MouseEvent) => {
              event.preventDefault();
              setEditingAttribute(null);
              setFormValues({ name: "", slug: "", type: "COLOR", description: "" });
              setHeaderFooterSlideoverPreview(true);
            }}
          >
            ثبت ویژگی جدید
          </Button>
        </div>
        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          {isLoading || isFetching ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="flex flex-col items-center">
                <LoadingIcon icon="puff" className="w-12 h-12" />
                <div className="mt-2 text-sm text-center text-gray-500">در حال بارگذاری...</div>
              </div>
            </div>
          ) : data?.items && data.items.length > 0 ? (
            <Table className="border-spacing-y-[10px] border-separate -mt-2">
              <ProductAttributeTable productAttributes={data.items} onSuccess={refetch} onEdit={handleEdit} />
            </Table>
          ) : (
            <div className="flex items-center justify-center h-[300px]">
              <h2 className="text-center text-gray-500">هیچ ویژگی‌ای یافت نشد</h2>
            </div>
          )}
        </div>
      </div>

      <Slideover
        size="md"
        open={headerFooterSlideoverPreview}
        onClose={() => {
          setHeaderFooterSlideoverPreview(false);
          setEditingAttribute(null);
        }}
      >
        <Slideover.Panel>
          <Slideover.Title>
            <h2 className="ml-auto text-base font-medium">{editingAttribute ? "ویرایش ویژگی" : "ثبت ویژگی جدید"}</h2>
          </Slideover.Title>
          <ProductAttributeForm onSubmit={onSubmit} initialValues={editingAttribute || formValues} onChange={handleFormChange} />
        </Slideover.Panel>
      </Slideover>
    </>
  );
};

export default ProductAttribute;
