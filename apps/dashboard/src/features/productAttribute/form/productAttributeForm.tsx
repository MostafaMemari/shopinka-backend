import { Formik, Form, Field, FormikHelpers } from "formik";
import React from "react";
import { productAttributeSchema } from "../schemas/productAttributeSchema";
import { Slideover } from "../../../base-components/Headless";
import { FormInput, FormLabel, FormSelect, FormTextarea } from "../../../base-components/Form";
import { formatSlug } from "../../../utils/helper";
import Button from "../../../base-components/Button";

interface FormValues {
  id?: number; // برای ویرایش
  name: string;
  slug: string;
  type: "COLOR" | "BUTTON";
  description: string;
}

interface ProductAttributeFormProps {
  onSubmit: (values: FormValues) => void;
  initialValues: FormValues;
  onChange?: (values: FormValues) => void;
}

const ProductAttributeForm: React.FC<ProductAttributeFormProps> = ({ onSubmit, initialValues, onChange }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={productAttributeSchema}
    onSubmit={(values, { setSubmitting }: FormikHelpers<FormValues>) => {
      onSubmit(values);
      setSubmitting(false);
    }}
    enableReinitialize
  >
    {({ errors, touched, setFieldValue, values, isSubmitting }) => {
      React.useEffect(() => {
        if (onChange) {
          onChange(values);
        }
      }, [values, onChange]);

      return (
        <Form>
          <Slideover.Description>
            <div>
              <FormLabel htmlFor="name">نام</FormLabel>
              <Field as={FormInput} name="name" id="name" type="text" placeholder="نام ویژگی (برای نمایش به کاربران سایت)" />
              {touched.name && errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>
            <div className="mt-3">
              <FormLabel htmlFor="slug">نامک</FormLabel>
              <Field
                as={FormInput}
                name="slug"
                id="slug"
                type="text"
                placeholder="نامک یکتا برای ویژگی"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const formatted = formatSlug(e.target.value);
                  setFieldValue("slug", formatted);
                }}
              />
              {touched.slug && errors.slug && <div className="text-red-500 text-sm mt-1">{errors.slug}</div>}
            </div>
            <div className="mt-3">
              <FormLabel htmlFor="type">نوع</FormLabel>
              <Field as={FormSelect} name="type" id="type">
                <option value="">انتخاب کنید</option>
                <option value="COLOR">رنگ</option>
                <option value="BUTTON">دکمه</option>
              </Field>
              {touched.type && errors.type && <div className="text-red-500 text-sm mt-1">{errors.type}</div>}
            </div>
            <div className="mt-3">
              <FormLabel htmlFor="description">توضیحات</FormLabel>
              <Field as={FormTextarea} id="description" name="description" placeholder="لطفا توضیحات مربوطه را وارد کنید" />
              {touched.description && errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
            </div>
          </Slideover.Description>

          <Slideover.Footer>
            <Button variant="primary" type="submit" className="w-20" disabled={isSubmitting}>
              {isSubmitting ? "در حال ثبت..." : values.id ? "به‌روزرسانی" : "ثبت"}
            </Button>
            <Button variant="outline-secondary" type="button" onClick={() => {}} className="w-20 mr-1">
              انصراف
            </Button>
          </Slideover.Footer>
        </Form>
      );
    }}
  </Formik>
);

export default ProductAttributeForm;
