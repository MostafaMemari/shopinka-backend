import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormInput } from "../../../base-components/Form";
import Button from "../../../base-components/Button";
import clsx from "clsx";
import { Toast } from "../../../base-components/Toast";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp } from "../../../services/Axios/Request/auth"; // فرضی

const validationSchema = Yup.object({
  otp: Yup.string()
    .matches(/^\d{6}$/, "کد باید دقیقاً ۶ رقم باشد")
    .required("کد تأیید الزامی است"),
});

interface OtpFormProps {
  phone: string;
}

function OtpForm({ phone }: OtpFormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async (values: { otp: string }) => {
    setLoading(true);
    try {
      const response = await verifyOtp(phone, values.otp);
      Toast("احراز هویت با موفقیت انجام شد", "success");
      const from = (location.state as any)?.from || "/";
      if (response.isNewUser) {
        navigate("/complete-profile", { state: { phone } });
      } else {
        navigate(from);
      }
    } catch (error: any) {
      Toast(error.response?.data?.message || "خطا در تأیید کد", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={clsx([
        "-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600",
        "before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
        "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700",
      ])}
    >
      <div className="container relative z-10 sm:px-10">
        <div className="block grid-cols-2 gap-4 xl:grid">
          <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
            <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
              <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-right">وارد کردن کد تأیید</h2>
              <div className="mt-2 text-center intro-x text-slate-400 xl:hidden">کد ۶ رقمی ارسال‌شده به شماره {phone} را وارد کنید.</div>
              <Formik initialValues={{ otp: "" }} validationSchema={validationSchema} onSubmit={handleVerifyOtp}>
                {({ errors, touched, isSubmitting, setFieldValue }) => (
                  <Form>
                    <div className="mt-8 intro-x">
                      <Field name="otp">
                        {({ field }: any) => (
                          <FormInput
                            {...field}
                            type="text"
                            className="block px-4 py-3 text-right intro-x min-w-full xl:min-w-[350px]"
                            placeholder="کد ۶ رقمی"
                            maxLength={6}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setFieldValue("otp", e.target.value);
                            }}
                          />
                        )}
                      </Field>
                      {errors.otp && touched.otp && <div className="text-red-500 text-right mt-1">{errors.otp}</div>}
                    </div>
                    <div className="mt-5 text-center intro-x xl:mt-8 xl:text-right">
                      <Button
                        variant="primary"
                        className="w-full px-4 py-3 align-top xl:w-32 xl:ml-3"
                        disabled={loading || isSubmitting}
                        type="submit"
                      >
                        {loading || isSubmitting ? "در حال تأیید..." : "تأیید کد"}
                      </Button>
                      <Button
                        variant="outline-secondary"
                        className="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
                        onClick={() => navigate("/login")}
                      >
                        بازگشت
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="flex-col hidden min-h-screen xl:flex"></div>
        </div>
      </div>
    </div>
  );
}

export default OtpForm;
