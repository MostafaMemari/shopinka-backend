import React, { useEffect, useRef, useState } from "react";
import OtpForm from "./OtpForm";
import clsx from "clsx";
import DarkModeSwitcher from "../../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../../components/MainColorSwitcher";
import LoginForm from "../../../forms/auth/loginPhoneForm";
import useLoginPhoneLogic from "../../../hooks/auth/useLoginFormLogic";

interface LoginProps {
  initialPhone?: string;
}

const Login: React.FC<LoginProps> = ({ initialPhone = "" }) => {
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [phone, setPhone] = useState("");
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const { handleSendOtp } = useLoginPhoneLogic({
    initialPhone,
    onShowOtpForm: (show, phone) => {
      setShowOtpForm(show);
      setPhone(phone);
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (phoneInputRef.current) {
        phoneInputRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (showOtpForm) return <OtpForm phone={phone} />;

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
              <LoginForm initialPhone={initialPhone} phoneInputRef={phoneInputRef} onSubmit={handleSendOtp} />
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
};

export default Login;
