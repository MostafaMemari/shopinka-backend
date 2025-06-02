export const isAllInputFilled = (otpValues: string[]) => {
  return otpValues.every((value) => value);
};

export const getOtpText = (otpValues: string[]) => {
  return otpValues.join('');
};
