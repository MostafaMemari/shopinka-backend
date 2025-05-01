import * as Yup from "yup";
import { formatSlug } from "../../../utils/helper";

export const productAttributeSchema = Yup.object({
  name: Yup.string().required("نام ویژگی الزامی است").min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  slug: Yup.string()
    .required("نامک الزامی است")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "نامک فقط میتواند شامل حروف انگلیسی و خط فاصله باشد")
    .transform((value) => formatSlug(value)),
  type: Yup.string().required("نوع ویژگی الزامی است"),
  description: Yup.string().max(500, "توضیحات نمی‌تواند بیش از ۵۰۰ کاراکتر باشد"),
});
