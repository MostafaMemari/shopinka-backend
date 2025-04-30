import * as yup from "yup";

const sellerSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("نام الزامی است")
    .min(2, "نام باید حداقل ۲ کاراکتر باشد")
    .max(40, "نام نباید بیشتر از ۴۰ کاراکتر باشد"),

  seller_id: yup
    .number()
    .typeError("شناسه فروشنده باید یک عدد باشد")
    .required("شناسه فروشنده الزامی است")
    .positive("شناسه فروشنده باید یک عدد مثبت باشد")
    .integer("شناسه فروشنده باید یک عدد صحیح باشد"),

  email: yup
    .string()
    .email("ایمیل معتبر نیست")
    .test("is-valid-domain", "ایمیل باید در دامنه‌های gmail.com یا yahoo.com باشد", (value) => {
      if (!value) return true;
      const domain = value.split("@")[1];
      return ["gmail.com", "yahoo.com"].includes(domain);
    })
    .nullable(),

  phone: yup
    .string()
    .test("is-iranian-phone", "شماره تلفن معتبر ایران نیست", (value) => {
      if (!value) return true;
      const iranPhoneRegex = /^(?:\+98|0)?9[0-9]{9}$/;
      return iranPhoneRegex.test(value);
    })
    .nullable(),
});

export default sellerSchema;
