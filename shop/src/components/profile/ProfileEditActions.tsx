'use client';

import { useRef, useState } from 'react';
import ProfileField from './ProfileField';
import MobileDrawer from '../ui/MobileDrawer';
import FullNameForm from './FullNameForm';
import { useChangeFullName } from '@/hooks/reactQuery/user/userUser';
import LoadingSpinner from '../ui/LoadingSpinner';
import Dialog from '../ui/Dialog';
import useIsMdUp from '@/hooks/useIsMdUp';
import { useAuth } from '@/hooks/auth/useAuth';
import ErrorState from './ErrorState';

interface ProfileFieldType {
  label: string;
  value: string;
  status?: 'unverified' | 'not-set' | 'verified';
  onEdit?: () => void;
}

const ProfileEditActions = () => {
  const { user, isLoading, loginUser, error } = useAuth();
  const { changeFullName, isChangeFullNameLoading } = useChangeFullName();
  const isMdUp = useIsMdUp();
  const formRef = useRef<HTMLFormElement>(null);
  const [modalState, setModalState] = useState<{ type: string | null; isOpen: boolean }>({ type: null, isOpen: false });

  const profileData = {
    fullName: user?.full_name || '',
    mobile: user?.mobile || '',
  };

  const fields: ProfileFieldType[] = [
    {
      label: 'نام و نام خانوادگی',
      value: profileData.fullName,
      onEdit: () => setModalState({ type: 'fullName', isOpen: true }),
    },
    {
      label: 'شماره موبایل',
      value: profileData.mobile,
      status: 'verified',
    },
  ];

  const handleFormSubmit = async (values: { fullName: string }) => {
    if (!user) return;
    changeFullName(
      values,
      () => {
        loginUser({ ...user, full_name: values.fullName, mobile: user.mobile || '' });
        setModalState({ type: null, isOpen: false });
        formRef.current?.reset();
      },
      (error) => console.error('خطا در ارسال فرم:', error),
    );
  };
  const handleSubmit = () => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  const renderFormContent = () => (
    <FullNameForm onSubmit={handleFormSubmit} ref={formRef} initialValues={{ fullName: profileData.fullName }} />
  );

  return (
    <>
      <div className="mb-8 space-y-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorState />
        ) : (
          <>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {fields.map((field) => (
                <ProfileField key={field.label} label={field.label} value={field.value} status={field.status} onEdit={field.onEdit} />
              ))}
            </div>

            {isMdUp ? (
              <Dialog
                isOpen={modalState.isOpen && modalState.type === 'fullName'}
                onClose={() => setModalState({ type: null, isOpen: false })}
                title="تغییر نام و نام خانوادگی"
                actions={
                  <button
                    className="btn-primary w-full py-3 text-sm"
                    type="button"
                    onClick={handleSubmit}
                    disabled={isChangeFullNameLoading}
                  >
                    {isChangeFullNameLoading ? 'در حال ثبت' : 'ثبت نام و نام خانوادگی'}
                  </button>
                }
                size="sm"
              >
                {renderFormContent()}
              </Dialog>
            ) : (
              <MobileDrawer
                isOpen={modalState.isOpen}
                onOpen={() => setModalState({ type: 'fullName', isOpen: true })}
                onClose={() => setModalState({ type: null, isOpen: false })}
                title="تغییر نام و نام خانوادگی"
                footerActions={
                  <button
                    className="btn-primary w-full py-3 text-sm"
                    type="button"
                    onClick={handleSubmit}
                    disabled={isChangeFullNameLoading}
                  >
                    {isChangeFullNameLoading ? 'در حال ثبت' : 'ثبت نام و نام خانوادگی'}
                  </button>
                }
              >
                {renderFormContent()}
              </MobileDrawer>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProfileEditActions;
