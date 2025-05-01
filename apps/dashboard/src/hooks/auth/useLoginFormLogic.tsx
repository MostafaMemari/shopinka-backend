import { useState } from "react";

import { sendOtp } from "../../services/Axios/Request/auth";
import { Toast } from "../../base-components/Toast";
import { extractTimeFromMessage } from "../../utils/helper";

interface LoginLogicProps {
  onShowOtpForm: (show: boolean, phone: string) => void;
}

const useLoginPhoneLogic = ({ onShowOtpForm }: LoginLogicProps) => {
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (values: { phone: string }) => {
    try {
      setLoading(true);
      const res = await sendOtp(values.phone);
      if (res.status === 200 || res.status === 201) {
        Toast("کد تأیید ارسال شد", "success");
        onShowOtpForm(true, values.phone);
      }
    } catch (err: any) {
      if (err?.status == 409) Toast(`شما به مدت ${extractTimeFromMessage(err?.message)} دقیقه محدود شده اید`, "error");
      else if (err?.status == 403) Toast(`شما به مدت ${extractTimeFromMessage(err?.message)} دقیقه محدود شده اید`, "error");
      else Toast(err?.message || "خطا در ارسال کد", "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSendOtp,
  };
};

export default useLoginPhoneLogic;
