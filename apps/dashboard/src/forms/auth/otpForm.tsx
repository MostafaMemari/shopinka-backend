import clsx from "clsx";
import React, { FC } from "react";
import { FormInput } from "../../base-components/Form";

interface OtpInputProps {
  value: string;
  index: number;
  onChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: (el: HTMLInputElement | null) => void;
  disabled: boolean;
  errorShake: boolean;
}

const OtpInput: FC<OtpInputProps> = ({ value, index, onChange, onKeyDown, inputRef, disabled, errorShake }) => (
  <FormInput
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

export default OtpInputsContainer;
