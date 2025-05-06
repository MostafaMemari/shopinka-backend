import * as yup from 'yup'

export const gallerySchema = yup.object({
  title: yup.string().required('نام الزامی است').min(3, 'نام باید حداقل 3 کاراکتر باشد').max(50, 'نام نمی‌تواند بیشتر از 50 کاراکتر باشد'),
  description: yup.string().nullable().default(null)
})
