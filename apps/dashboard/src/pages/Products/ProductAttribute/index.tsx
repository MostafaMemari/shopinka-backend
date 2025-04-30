import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { Highlight, Preview, PreviewComponent, Source } from "../../../base-components/PreviewComponent";
import { FormInput, FormLabel, FormSwitch, FormTextarea } from "../../../base-components/Form";
import Button from "../../../base-components/Button";
import Notification from "../../../base-components/Notification";
import Lucide from "../../../base-components/Lucide";

const ProductAttribute = () => {
  const schema = yup
    .object({
      name: yup.string().required().min(2),
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
      age: yup
        .number()
        .required()
        .test("len", "age must be less than or equal to 3", (val) => (val && val.toString().length <= 3 ? true : false)),
      url: yup.string().url(),
      comment: yup.string().required().min(10),
    })
    .required();

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await trigger();
    if (!result) {
      const failedEl = document.querySelectorAll("#failed-notification-content")[0].cloneNode(true) as HTMLElement;
      failedEl.classList.remove("hidden");
      Toastify({
        node: failedEl,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    } else {
      const successEl = document.querySelectorAll("#success-notification-content")[0].cloneNode(true) as HTMLElement;
      successEl.classList.remove("hidden");
      Toastify({
        node: successEl,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    }
  };

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="ml-auto text-lg font-medium">Form Validation</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Form Validation */}
          <PreviewComponent className="intro-y box">
            <>
              <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                <h2 className="mr-auto text-base font-medium">Implementation</h2>
                <FormSwitch className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0"></FormSwitch>
              </div>
              <div className="p-5">
                <Preview></Preview>
              </div>
            </>
          </PreviewComponent>
          {/* END: Form Validation */}
          {/* BEGIN: Success Notification Content */}

          {/* END: Success Notification Content */}
          {/* BEGIN: Failed Notification Content */}

          {/* END: Failed Notification Content */}
        </div>
      </div>
    </>
  );
};

export default ProductAttribute;
