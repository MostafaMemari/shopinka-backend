import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DarkModeSwitcher from "../../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../../components/MainColorSwitcher";
import { FormInput } from "../../../base-components/Form";
import Button from "../../../base-components/Button";
import clsx from "clsx";
import { Toast } from "../../../base-components/Toast";
import { useNavigate } from "react-router-dom";
import OtpForm from "./OtpForm";
import { sendOtp } from "../../../services/Axios/Request/auth"; // فرضی

const phoneRegExp = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/;

const validationSchema = Yup.object({
  phone: Yup.string().matches(phoneRegExp, "شماره تلفن معتبر نیست").required("شماره تلفن الزامی است"),
});

function Main() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [phone, setPhone] = useState("");

  const handleSendOtp = async (values: { phone: string }) => {
    setLoading(true);
    try {
      await sendOtp(values.phone);
      Toast("کد تأیید ارسال شد", "success");
      setPhone(values.phone);
      setShowOtpForm(true);
    } catch (error: any) {
      Toast(error.response?.data?.message || "خطا در ارسال کد", "error");
    } finally {
      setLoading(false);
    }
  };

  if (showOtpForm) {
    return <OtpForm phone={phone} />;
  }

  return (
    <div
      className={clsx([
        "-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600",
        "before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
        "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700",
      ])}
    >
      <DarkModeSwitcher />
      <MainColorSwitcher />
      <div className="container relative z-10 sm:px-10">
        <div className="block grid-cols-2 gap-4 xl:grid">
          <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
            <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
              <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-right">ورود / ثبت‌نام</h2>
              <div className="mt-2 text-center intro-x text-slate-400 xl:hidden">با شماره تلفن خود وارد شوید یا حساب جدیدی بسازید.</div>
              <Formik initialValues={{ phone: "" }} validationSchema={validationSchema} onSubmit={handleSendOtp}>
                {({ errors, touched, isSubmitting, setFieldValue }) => (
                  <Form>
                    <div className="mt-8 intro-x">
                      <Field name="phone">
                        {({ field }: any) => (
                          <FormInput
                            {...field}
                            type="text"
                            className="block px-4 py-3 text-right intro-x min-w-full xl:min-w-[350px]"
                            placeholder="شماره تلفن (مثال: 09123456789)"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setFieldValue("phone", e.target.value);
                            }}
                          />
                        )}
                      </Field>
                      {errors.phone && touched.phone && <div className="text-red-500 text-right mt-1">{errors.phone}</div>}
                    </div>
                    <div className="mt-5 text-center intro-x xl:mt-8 xl:text-right">
                      <Button
                        variant="primary"
                        className="w-full px-4 py-3 align-top xl:w-32 xl:ml-3"
                        disabled={loading || isSubmitting}
                        type="submit"
                      >
                        {loading || isSubmitting ? "در حال ارسال..." : "ارسال کد"}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="mt-10 text-center intro-x xl:mt-24 text-slate-600 dark:text-slate-500 xl:text-right">
                با ورود به سیستم، شما{" "}
                <a className="text-primary dark:text-slate-200" href="">
                  قوانین و مقررات
                </a>{" "}
                و{" "}
                <a className="text-primary dark:text-slate-200" href="">
                  حریم خصوصی
                </a>{" "}
                ما را می‌پذیرید
              </div>
            </div>
          </div>
          <div className="flex-col hidden min-h-screen xl:flex"></div>
        </div>
      </div>
    </div>
  );
}

export default Main;
