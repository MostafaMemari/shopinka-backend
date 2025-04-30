import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "../../base-components/Toast";
import { verifyOtp } from "../../services/Axios/Request/auth";
import { extractTimeFromMessage } from "../../utils/helper";

interface OtpFormLogicProps {
  phone: string;
  onShowLogin: (show: boolean) => void;
}

const useOtpFormLogic = ({ phone, onShowLogin }: OtpFormLogicProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorShake, setErrorShake] = useState<boolean>(false);
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
      if (timer <= 0) {
        Toast("کداعتبار سنجی شما منقضی شده است", "error");
        onShowLogin(true);
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
    onShowLogin(true);
  };

  return {
    otp,
    loading,
    errorShake,
    timer,
    isExpired,
    inputRefs,
    handleChange,
    handleKeyDown,
    handleSubmit,
    handleBackToLogin,
  };
};

export default useOtpFormLogic;
