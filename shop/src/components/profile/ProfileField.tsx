'use client';

import { FaEdit, FaPlus } from 'react-icons/fa';

interface ProfileFieldProps {
  label: string;
  value: string;
  status?: 'verified' | 'unverified' | 'not-set';
  isPassword?: boolean;
  onEdit?: () => void;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value, status, isPassword, onEdit }) => {
  return (
    <div className="col-span-2 sm:col-span-1">
      <button className="w-full" type="button" onClick={onEdit}>
        <div className="relative rounded-lg border p-4 hover:border-border/50">
          {status && (
            <div
              className={`absolute inset-x-0 -bottom-2.5 mx-auto w-fit rounded-full bg-muted px-3 text-sm font-medium ${
                status === 'verified' ? 'text-emerald-500' : status === 'unverified' ? 'text-red-500 dark:text-red-400' : 'text-text/60'
              }`}
            >
              {status === 'verified' ? 'تایید شده' : status === 'unverified' ? 'تایید نشده' : 'ثبت نشده'}
            </div>
          )}
          <div className="flex justify-between">
            <div className="flex flex-col items-start gap-y-2">
              <div className="text-text/90">{label}</div>
              {isPassword ? (
                <input type="password" value={value} className="mr-2 select-none bg-transparent text-text/60" disabled />
              ) : (
                <div className="mr-2 text-text/60">{value}</div>
              )}
            </div>
            {status === 'not-set' ? (
              <FaPlus className="h-6 w-6 text-primary" />
            ) : onEdit ? (
              <FaEdit className="h-6 w-6 text-primary" />
            ) : null}
          </div>
        </div>
      </button>
    </div>
  );
};

export default ProfileField;
