import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import React from "react";
import { FormInput } from "../../base-components/Form";
import Button from "../../base-components/Button";

const phoneRegExp = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/;

const validationSchema = Yup.object({
  phone: Yup.string().matches(phoneRegExp, "شماره تلفن معتبر نیست").required("شماره تلفن الزامی است"),
});

interface LoginFormProps {
  initialPhone: string;
  phoneInputRef: React.RefObject<HTMLInputElement>;
  onSubmit: (values: { phone: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ initialPhone, phoneInputRef, onSubmit }) => (
  <Formik initialValues={{ phone: initialPhone }} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
    {({ errors, touched, isSubmitting }) => (
      <Form>
        <div className="mt-8 intro-x">
          <Field name="phone">
            {({ field }: any) => (
              <FormInput
                {...field}
                type="text"
                className="block px-4 py-3 text-right intro-x min-w-full xl:min-w-[350px]"
                placeholder="شماره تلفن (مثال: 09123456789)"
                ref={phoneInputRef}
              />
            )}
          </Field>
          {errors.phone && touched.phone && <div className="text-red-500 text-right mt-1">{errors.phone}</div>}
        </div>
        <div className="mt-5 text-center intro-x xl:mt-8 xl:text-right">
          <Button variant="primary" className="w-full px-4 py-3 align-top xl:w-32 xl:ml-3" disabled={isSubmitting} type="submit">
            {isSubmitting ? "در حال ارسال..." : "ارسال کد"}
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default LoginForm;
