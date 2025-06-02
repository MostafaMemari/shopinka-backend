export const validateIranPhoneNumber = (phone: string) => {
  const phoneRegex = /^(?:09|\+989|9)\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};
