"use client";

import { useState } from "react";
import ProfileField from "./ProfileField";
import GenericModal from "./GenericModal";
import DashboardHeader from "./DashboardHeader";

interface ProfileData {
  fullName: string;
  nationalCode: string;
  phoneNumber: string;
  email: string;
  password: string;
  birthDate: string;
}

interface ProfileEditActionsProps {
  initialData: ProfileData;
}

interface ProfileField {
  label: string;
  value: string;
  status?: "unverified" | "not-set" | "verified";
  isPassword?: boolean;
  onEdit: () => void;
}

const ProfileEditActions: React.FC<ProfileEditActionsProps> = ({ initialData }) => {
  const [profileData, setProfileData] = useState(initialData);
  const [modalState, setModalState] = useState<{
    type: string | null;
    isOpen: boolean;
  }>({ type: null, isOpen: false });

  const fields: ProfileField[] = [
    {
      label: "نام و نام خانوادگی",
      value: profileData.fullName,
      onEdit: () => setModalState({ type: "fullName", isOpen: true }),
    },
    {
      label: "کد ملی",
      value: profileData.nationalCode || "ثبت نشده",
      status: profileData.nationalCode ? "unverified" : "not-set",
      onEdit: () => setModalState({ type: "nationalCode", isOpen: true }),
    },
    {
      label: "شماره موبایل",
      value: profileData.phoneNumber,
      status: "verified",
      onEdit: () => setModalState({ type: "phoneNumber", isOpen: true }),
    },
    {
      label: "ایمیل",
      value: profileData.email,
      status: "verified",
      onEdit: () => setModalState({ type: "email", isOpen: true }),
    },
    {
      label: "کلمه عبور",
      value: profileData.password,
      isPassword: true,
      onEdit: () => setModalState({ type: "password", isOpen: true }),
    },
    {
      label: "تاریخ تولد",
      value: profileData.birthDate,
      onEdit: () => setModalState({ type: "birthDate", isOpen: true }),
    },
  ];

  const handleSubmit = (type: string, formData: Record<string, string>) => {
    switch (type) {
      case "fullName":
        setProfileData({
          ...profileData,
          fullName: `${formData.name} ${formData.family}`,
        });
        break;
      case "nationalCode":
        setProfileData({ ...profileData, nationalCode: formData.nationalCode });
        break;
      case "phoneNumber":
        setProfileData({ ...profileData, phoneNumber: formData.phoneNumber });
        break;
      case "email":
        setProfileData({ ...profileData, email: formData.email });
        break;
      case "password":
        setProfileData({ ...profileData, password: formData.password });
        break;
      case "birthDate":
        setProfileData({ ...profileData, birthDate: formData.birthDate });
        break;
    }
    // اینجا می‌تونی API کال بزنی برای آپدیت اطلاعات
  };

  const passwordForm = (
    <form noValidate>
      <div className="mb-4">
        <label className="relative block rounded-lg border shadow-base">
          <input
            type="password"
            id="currentPassword"
            className="peer w-full rounded-lg border-none bg-transparent px-4 py-3 placeholder-transparent focus:outline-hidden focus:ring-0"
            placeholder="کلمه عبور فعلی"
          />
          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/60 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
            کلمه عبور فعلی
          </span>
        </label>
        <div className="my-2 h-6 text-red-500 dark:text-red-400"></div>
      </div>
      <div className="mb-4">
        <label className="relative block rounded-lg border shadow-base">
          <input
            type="password"
            id="password"
            className="peer w-full rounded-lg border-none bg-transparent px-4 py-3 placeholder-transparent focus:outline-hidden focus:ring-0"
            placeholder="کلمه عبور جدید"
          />
          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/60 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
            کلمه عبور جدید
          </span>
        </label>
        <div className="my-2 h-6 text-red-500 dark:text-red-400"></div>
        <div className="mb-4 flex items-center gap-x-2">
          <div className="h-[3px] w-full rounded-full bg-background dark:bg-zinc-800"></div>
          <div className="h-[3px] w-full rounded-full bg-background dark:bg-zinc-800"></div>
          <div className="h-[3px] w-full rounded-full bg-background dark:bg-zinc-800"></div>
          <div className="h-[3px] w-full rounded-full bg-background dark:bg-zinc-800"></div>
        </div>
        <ul className="select-none list-disc space-y-2 px-4 text-xs text-slate-500 dark:text-slate-400 md:text-sm">
          <li>حداقل 6 حرف</li>
          <li>شامل عدد</li>
          <li>شامل یک حرف بزرگ</li>
          <li>شامل یک حرف کوچک</li>
        </ul>
      </div>
      <div className="mb-4">
        <label className="relative block rounded-lg border shadow-base">
          <input
            type="password"
            id="confirmPassword"
            className="peer w-full rounded-lg border-none bg-transparent px-4 py-3 placeholder-transparent focus:outline-hidden focus:ring-0"
            placeholder="تکرار کلمه عبور جدید"
          />
          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/60 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
            تکرار کلمه عبور جدید
          </span>
        </label>
        <div className="my-2 h-6 text-red-500 dark:text-red-400"></div>
      </div>
    </form>
  );

  return (
    <>
      <DashboardHeader title="اطلاعات حساب کاربری شما" />
      <div className="grid grid-cols-2 gap-4">
        {fields.map((field) => (
          <ProfileField
            key={field.label}
            label={field.label}
            value={field.value}
            status={field.status}
            isPassword={field.isPassword}
            onEdit={field.onEdit}
          />
        ))}
      </div>
      {modalState.type === "fullName" && (
        <GenericModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ type: null, isOpen: false })}
          title="تغییر نام و نام خانوادگی"
          fields={[
            { id: "name", label: "نام", type: "text", placeholder: "نام" },
            {
              id: "family",
              label: "نام خانوادگی",
              type: "text",
              placeholder: "نام خانوادگی",
            },
          ]}
          buttonText="ویرایش"
          onSubmit={(formData) => handleSubmit("fullName", formData)}
        />
      )}
      {modalState.type === "nationalCode" && (
        <GenericModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ type: null, isOpen: false })}
          title="ثبت کد ملی"
          fields={[
            {
              id: "nationalCode",
              label: "کد ملی",
              type: "text",
              placeholder: "کد ملی",
            },
          ]}
          buttonText="ویرایش"
          onSubmit={(formData) => handleSubmit("nationalCode", formData)}
        />
      )}
      {modalState.type === "phoneNumber" && (
        <GenericModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ type: null, isOpen: false })}
          title="تغییر شماره موبایل"
          fields={[
            {
              id: "phoneNumber",
              label: "شماره موبایل",
              type: "text",
              placeholder: "شماره موبایل",
            },
          ]}
          buttonText="ارسال کد تایید"
          onSubmit={(formData) => handleSubmit("phoneNumber", formData)}
        />
      )}
      {modalState.type === "email" && (
        <GenericModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ type: null, isOpen: false })}
          title="تغییر ایمیل"
          fields={[{ id: "email", label: "ایمیل", type: "text", placeholder: "ایمیل" }]}
          buttonText="ارسال کد تایید"
          onSubmit={(formData) => handleSubmit("email", formData)}
        />
      )}
      {modalState.type === "password" && (
        <GenericModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ type: null, isOpen: false })}
          title="تغییر کلمه عبور"
          buttonText="تغییر کلمه عبور"
          customForm={passwordForm}
          onSubmit={(formData) => handleSubmit("password", formData)}
        />
      )}
      {modalState.type === "birthDate" && (
        <GenericModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ type: null, isOpen: false })}
          title="تغییر تاریخ تولد"
          fields={[
            {
              id: "birthDate",
              label: "تاریخ تولد",
              type: "select",
              options: [
                {
                  label: "سال",
                  value: "1380,1381,1382,1383,1384,1385",
                },
                {
                  label: "ماه",
                  value: "شهریور,آذر,دی,خرداد,آبان,مرداد",
                },
                {
                  label: "روز",
                  value: "1,2,3,4,5,6",
                },
              ],
            },
          ]}
          buttonText="ویرایش"
          onSubmit={(formData) => handleSubmit("birthDate", formData)}
        />
      )}
    </>
  );
};

export default ProfileEditActions;
