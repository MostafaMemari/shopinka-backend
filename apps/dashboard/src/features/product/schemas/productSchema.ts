import * as Yup from "yup";

export const productSchema = Yup.object({
  name: Yup.string().trim().required("این فیلد اجباری است").min(2, "حداقل ۲ کاراکتر").max(100, "حداکثر ۱۰۰ کاراکتر"),

  image: Yup.mixed().nullable().required("این فیلد اجباری است"),

  price: Yup.number()
    .typeError("قیمت باید یک عدد باشد")
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .integer("باید عدد صحیح وارد شود")
    .positive("باید بزرگتر از صفر باشد")
    .min(10000, "حداقل قیمت 10000 است")
    .max(1000000, "حداکثر قیمت 1000000 است")
    .nullable(),

  stock: Yup.number()
    .typeError("موجودی باید یک عدد باشد")
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .integer("باید عدد صحیح وارد شود")
    .positive("باید بزرگتر از صفر باشد")
    .min(1, "حداقل مقدار 1 است")
    .max(100, "حداکثر مقدار 100 است")
    .nullable(),

  type: Yup.mixed().oneOf(["single", "combination", "dependent", "multi"], "نوع محصول معتبر نیست").nullable(),

  height: Yup.number()
    .typeError("ارتفاع باید یک عدد باشد")
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .integer("باید عدد صحیح وارد شود")
    .positive("باید بزرگتر از صفر باشد")
    .nullable(),

  width: Yup.number()
    .typeError("عرض باید یک عدد باشد")
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .integer("باید عدد صحیح وارد شود")
    .positive("باید بزرگتر از صفر باشد")
    .nullable(),

  dkp: Yup.number()
    .typeError("کد محصول باید یک عدد باشد")
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .integer("باید عدد صحیح وارد شود")
    .positive("باید بزرگتر از صفر باشد")
    .required("این فیلد اجباری است")
    .nullable(),

  dkpc: Yup.number()
    .typeError("کد تنوع باید یک عدد باشد")
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .integer("باید عدد صحیح وارد شود")
    .positive("باید بزرگتر از صفر باشد")
    .required("این فیلد اجباری است")
    .nullable(),

  sellerId: Yup.string().required("این فیلد اجباری است").nullable(),
  categoryId: Yup.string().nullable(),
  colorId: Yup.string().nullable(),

  status: Yup.boolean().default(false).label("وضعیت"),
  is_robot: Yup.boolean().default(false).label("ربات"),
});
