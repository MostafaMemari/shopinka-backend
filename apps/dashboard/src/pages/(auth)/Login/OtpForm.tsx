import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../../base-components/Button";
import clsx from "clsx";
import { verifyOtp } from "../../../services/Axios/Request/auth";
import Login from ".";

// Mock dependencies for standalone
const Toast = (message: string, type: string) => console.log(`${type}: ${message}`);

interface OtpFormProps {
  phone: string;
}

function OtpForm({ phone }: OtpFormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [errorShake, setErrorShake] = useState(false);

  useEffect(() => {
    inputRefs.current[5]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (index === 0 && value) {
      handleSubmit(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleSubmit = async (otpValue: string) => {
    if (otpValue.length !== 6 || !/^\d{6}$/.test(otpValue)) {
      Toast("کد باید دقیقاً ۶ رقم باشد", "error");
      return;
    }
    setLoading(true);
    try {
      console.log(phone, otpValue);
      const response = await verifyOtp(phone, otpValue.toString().split("").reverse().join(""));
      console.log(response);
      if (response.status === 201) inputRefs.current[5]?.focus();
      console.log(response);
      Toast("احراز هویت با موفقیت انجام شد", "success");
      const from = (location.state as any)?.from || "/";
      if (response.isNewUser) {
        navigate("/complete-profile", { state: { phone } });
      } else {
        navigate(from);
      }
    } catch (error: any) {
      setOtp(["", "", "", "", "", ""]);
      setErrorShake(true);

      setTimeout(() => {
        setErrorShake(false);
        inputRefs.current[5]?.focus();
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setShowLogin(true);
  };
  console.log(showLogin);
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
      <div className="container relative z-10 sm:px-10">
        <div className="block grid-cols-2 gap-4 xl:grid">
          <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
            <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
              <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-right">وارد کردن کد تأیید</h2>
              <div className="mt-2 text-center intro-x text-slate-400 xl:hidden">کد ۶ رقمی ارسال‌شده به شماره {phone} را وارد کنید.</div>
              <div className="mt-8 intro-x flex justify-center gap-2" dir="ltr">
                {otp.map((digit, index) => (
                  <input
                    key={5 - index}
                    type="text"
                    maxLength={1}
                    value={otp[5 - index]}
                    onChange={(e) => handleChange(5 - index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(5 - index, e)}
                    ref={(el) => (inputRefs.current[5 - index] = el)}
                    className={clsx([
                      "block px-4 py-3 text-center intro-x w-12 min-w-[50px] xl:min-w-[50px] rounded-md focus:outline-none focus:ring-2",
                      errorShake ? "border-red-500 ring-red-500" : "border-slate-300 focus:ring-primary",
                    ])}
                    disabled={loading}
                  />
                ))}
              </div>
              <div className="mt-5 text-center intro-x xl:mt-8 xl:text-right">
                <Button
                  variant="primary"
                  className="w-full px-4 py-3 align-top xl:w-32 xl:ml-3"
                  disabled={loading || otp.some((d) => !d)}
                  onClick={() => handleSubmit(otp.join(""))}
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
}

export default OtpForm;
