import React, { useState } from "react";
import Login from ".";
import clsx from "clsx";
import useOtpFormLogic from "../../../hooks/auth/useOtpFormLogic";
import Button from "../../../base-components/Button";
import TimerDisplay from "../../../base-components/Timer";
import OtpInputsContainer from "../../../forms/auth/otpForm";
import DarkModeSwitcher from "../../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../../components/MainColorSwitcher";

interface OtpFormProps {
  phone: string;
}

const OtpForm: React.FC<OtpFormProps> = ({ phone }) => {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const { otp, loading, errorShake, timer, isExpired, inputRefs, handleChange, handleKeyDown, handleSubmit, handleBackToLogin } =
    useOtpFormLogic({ phone, onShowLogin: setShowLogin });

  if (showLogin) {
    return <Login initialPhone={phone} />;
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
        <div className="block grid-cols-2 gapOsm-4 xl:grid">
          <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
            <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
              <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-center">وارد کردن کد تأیید</h2>
              <div className="mt-2 text-center intro-x text-slate-400">کد ۶ رقمی ارسال‌شده به شماره {phone} را وارد کنید.</div>
              <TimerDisplay timer={timer} isExpired={isExpired} />
              <OtpInputsContainer
                otp={otp}
                handleChange={handleChange}
                handleKeyDown={handleKeyDown}
                inputRefs={inputRefs}
                loading={loading}
                errorShake={errorShake}
              />
              <div className="mt-5 text-center intro-x xl:mt-8 xl:text-right">
                <Button
                  variant="primary"
                  className="w-full px-4 py-3 align-top xl:w-32 xl:ml-3"
                  disabled={loading || otp.some((d) => !d)}
                  onClick={handleSubmit}
                >
                  {loading ? "در حال تأیید..." : "تأیید کد"}
                </Button>
                <Button
                  variant="outline-secondary"
                  className="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
                  onClick={handleBackToLogin}
                  disabled={loading}
                >
                  بازگشت
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-col hidden min-h-screen xl:flex"></div>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
