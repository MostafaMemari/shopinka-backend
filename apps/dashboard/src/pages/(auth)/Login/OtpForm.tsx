import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../../base-components/Button";
import clsx from "clsx";
import { verifyOtp } from "../../../services/Axios/Request/auth";
import Login from ".";
import { extractTimeFromMessage } from "../../../utils/helper";
import { Toast } from "../../../base-components/Toast";

// Mock dependencies for standalone
// const Toast = (message: string, type: string) => console.log(`${type}: ${message}`);

interface OtpFormProps {
  phone: string;
}

// Component for individual OTP input
interface OtpInputProps {
  value: string;
  index: number;
  onChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: (el: HTMLInputElement | null) => void;
  disabled: boolean;
  errorShake: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({ value, index, onChange, onKeyDown, inputRef, disabled, errorShake }) => (
  <input
    type="text"
    maxLength={1}
    value={value}
    onChange={(e) => onChange(index, e.target.value)}
    onKeyDown={(e) => onKeyDown(index, e)}
    ref={inputRef}
    className={clsx([
      "block px-4 py-3 text-center intro-x w-12 min-w-[50px] xl:min-w-[50px] rounded-md focus:outline-none focus:ring-2",
      errorShake ? "border-red-500 ring-red-500" : "border-slate-300 focus:ring-primary",
    ])}
    disabled={disabled}
  />
);

// Component for the group of OTP inputs
interface OtpInputsContainerProps {
  otp: string[];
  handleChange: (index: number, value: string) => void;
  handleKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  loading: boolean;
  errorShake: boolean;
}

const OtpInputsContainer: React.FC<OtpInputsContainerProps> = ({ otp, handleChange, handleKeyDown, inputRefs, loading, errorShake }) => (
  <div className="mt-8 intro-x flex justify-center gap-2" dir="ltr">
    {otp.map((digit, index) => (
      <OtpInput
        key={5 - index}
        value={otp[5 - index]}
        index={5 - index}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        inputRef={(el) => (inputRefs.current[5 - index] = el)}
        disabled={loading}
        errorShake={errorShake}
      />
    ))}
  </div>
);

// Component for timer display
interface TimerDisplayProps {
  timer: number;
  isExpired: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timer, isExpired }) => {
  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="mt-4 text-center text-sm text-slate-500">
      {isExpired ? <span className="text-red-500">مهلت وارد کردن کد تمام شد!</span> : <>مهلت باقی‌مانده: {formatTime(timer)}</>}
    </div>
  );
};

// Component for action buttons
interface ActionButtonsProps {
  loading: boolean;
  otp: string[];
  onSubmit: () => void;
  onBack: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ loading, otp, onSubmit, onBack }) => (
  <div className="mt-5 text-center intro-x xl:mt-8 xl:text-right">
    <Button
      variant="primary"
      className="w-full px-4 py-3 align-top xl:w-32 xl:ml-3"
      disabled={loading || otp.some((d) => !d)}
      onClick={onSubmit}
    >
      {loading ? "در حال تأیید..." : "تأیید کد"}
    </Button>
    <Button variant="outline-secondary" className="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0" onClick={onBack} disabled={loading}>
      بازگشت
    </Button>
  </div>
);

// Main OtpForm component
const OtpForm: React.FC<OtpFormProps> = ({ phone }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorShake, setErrorShake] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(300);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[5]?.focus();
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      setIsExpired(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index > 0) {
      inputRefs.current[index - 1]?.focus();
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

  const handleSubmit = async () => {
    const otpValue = otp.slice().reverse().join("");
    if (otpValue.length !== 6 || !/^\d{6}$/.test(otpValue)) {
      Toast("کد باید دقیقاً ۶ رقم باشد", "error");
      setErrorShake(true);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[5]?.focus();
      setTimeout(() => setErrorShake(false), 500);
      return;
    }
    setLoading(true);
    try {
      if(timer <= 0) {
        Toast("کداعتبار سنجی شما منقضی شده است", "error");
        setShowLogin(true)
      }
      const response = await verifyOtp(phone, otpValue);

      if (response.status === 201) inputRefs.current[5]?.focus();
      Toast("احراز هویت با موفقیت انجام شد", "success");
      const from = (location.state as any)?.from || "/";
      if (response.isNewUser) {
        navigate("/complete-profile", { state: { phone } });
      } else {
        navigate(from);
      }
    } catch (err: any) {
      setOtp(["", "", "", "", "", ""]);
      if (err.status == 400) Toast("کد اعتبار سنجی وارد شده معتبر نمیباشد", "error");
      else if (err?.status == 403) Toast(`شما به مدت ${extractTimeFromMessage(err?.message)} دقیقه محدود شده اید`, "error");
      else Toast(err.response?.data?.message || "خطا در تأیید کد", "error");
    } finally {
      setErrorShake(true);
      setTimeout(() => {
        inputRefs.current[5]?.focus();
        setErrorShake(false);
      }, 500);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [otp]);

  const handleBackToLogin = () => {
    setShowLogin(true);
  };

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
              <ActionButtons loading={loading} otp={otp} onSubmit={handleSubmit} onBack={handleBackToLogin} />
            </div>
          </div>
          <div className="flex-col hidden min-h-screen xl:flex"></div>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
