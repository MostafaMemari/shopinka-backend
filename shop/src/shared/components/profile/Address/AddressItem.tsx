'use client';

import { useState } from 'react';
import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';

interface Address {
  id: string;
  fullAddress: string;
  receiverName: string;
}

interface AddressItemProps {
  address: Address;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const AddressItem: React.FC<AddressItemProps> = ({ address, onEdit, onDelete }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="block rounded-lg border p-4 shadow-base hover:border-border/50 dark:hover:border-white/10">
      <div className="mb-4 flex items-center justify-between gap-x-2 sm:mb-2">
        <p className="line-clamp-2 h-10 text-sm text-text/90 xs:text-base sm:line-clamp-1 sm:h-6">{address.fullAddress}</p>
        <div className="hidden md:block relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="rounded-full p-1 text-text/90 hover:bg-background">
            <FaEllipsisV className="h-6 w-6" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-50 overflow-hidden rounded-lg border bg-muted z-10">
              <ul className="space-y-2 p-2">
                <li>
                  <button
                    onClick={() => {
                      onEdit(address.id);
                      setIsDropdownOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sky-500 hover:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-400/10"
                  >
                    <div className="flex items-center gap-x-2">
                      <FaEdit className="h-6 w-6" />
                      <span>ویرایش</span>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onDelete(address.id);
                      setIsDropdownOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-red-500 hover:bg-warning/10 dark:text-red-400 dark:hover:bg-red-400/10"
                  >
                    <div className="flex items-center gap-x-2">
                      <FaTrash className="h-6 w-6" />
                      <span>حذف</span>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-x-2">
        <p className="line-clamp-1 text-sm text-text/60">{address.receiverName}</p>
        <div className="flex items-center gap-x-2 md:hidden">
          <button onClick={() => onDelete(address.id)} className="btn-red-nobg px-3 py-1 text-sm xs:px-4 xs:py-2">
            حذف
          </button>
          <button onClick={() => onEdit(address.id)} className="btn-secondary-nobg px-3 py-1 text-sm xs:px-4 xs:py-2">
            ویرایش
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressItem;
