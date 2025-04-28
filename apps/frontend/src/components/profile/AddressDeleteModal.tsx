"use client";

import { FaTimes } from "react-icons/fa";

interface AddressDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const AddressDeleteModal: React.FC<AddressDeleteModalProps> = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="main-scroll fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0">
      <div className="relative max-h-full w-full max-w-md mx-auto">
        <div className="divide-y overflow-hidden rounded-lg bg-muted shadow-sm ring-1 ring-gray-100 dark:ring-white/5">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="md:text-lg">حذف آدرس</h3>
              <button onClick={onClose} className="">
                <FaTimes className="h-5 w-5" />
                <span className="sr-only">Close Modal</span>
              </button>
            </div>
          </div>
          <div className="space-y-6 px-4 py-5 sm:p-6">
            <p className="text-text/90">آیا از حذف این آدرس اطمینان دارید؟</p>
            <div className="flex items-center justify-end gap-x-4">
              <button onClick={onClose} className="btn-secondary px-4 py-2 text-sm">
                انصراف
              </button>
              <button onClick={onDelete} className="btn-red px-4 py-2 text-sm">
                حذف آدرس
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressDeleteModal;
