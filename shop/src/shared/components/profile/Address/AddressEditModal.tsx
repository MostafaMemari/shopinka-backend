'use client';

import { FaEdit, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

interface Address {
  id: string;
  name: string;
  family: string;
  phoneNumber: string;
  nationalCode: string;
  address: string;
  city: string;
  province: string;
  buildingNumber: string;
  buildingUnit: string;
  postalCode: string;
}

interface AddressEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (id: string, address: Address) => void;
  address: Address;
}

const AddressEditModal: React.FC<AddressEditModalProps> = ({ isOpen, onClose, onEdit, address }) => {
  const [formData, setFormData] = useState(address);

  const handleSubmit = () => {
    onEdit(address.id, formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="main-scroll fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0">
      <div className="relative max-h-full w-full max-w-2xl mx-auto">
        <div className="divide-y overflow-hidden rounded-lg bg-muted shadow-sm ring-1 ring-gray-100 dark:ring-white/5">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="md:text-lg">ویرایش آدرس</h3>
              <button onClick={onClose} className="">
                <FaTimes className="h-5 w-5" />
                <span className="sr-only">Close Modal</span>
              </button>
            </div>
          </div>
          <div className="space-y-6 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-6">
              <div className="col-span-2 sm:col-span-1">
                <label className="relative block rounded-lg border shadow-base">
                  <input
                    type="text"
                    id="name"
                    className="peer w-full rounded-lg border-none bg-transparent px-4 py-3 placeholder-transparent focus:outline-hidden focus:ring-0"
                    placeholder="نام گیرنده"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/60 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                    نام گیرنده
                  </span>
                </label>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="relative block rounded-lg border shadow-base">
                  <input
                    type="text"
                    id="family"
                    className="peer w-full rounded-lg border-none bg-transparent px-4 py-3 placeholder-transparent focus:outline-hidden focus:ring-0"
                    placeholder="نام خانوادگی گیرنده"
                    value={formData.family}
                    onChange={(e) => setFormData({ ...formData, family: e.target.value })}
                  />
                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/60 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                    نام خانوادگی گیرنده
                  </span>
                </label>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="relative block rounded-lg border shadow-base">
                  <input
                    type="text"
                    id="phoneNumber"
                    className="peer w-full rounded-lg border-none bg-transparent px-4 py-3 placeholder-transparent focus:outline-hidden focus:ring-0"
                    placeholder="شماره تماس گیرنده"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/60 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                    شماره تماس گیرنده
                  </span>
                </label>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="relative block rounded-lg border shadow-base">
                  <input
                    type="text"
                    id="nationalCode"
                    className="peer w-full rounded-lg border-none bg-transparent px-4 py-3 placeholder-transparent focus:outline-hidden focus:ring-0"
                    placeholder="کد ملی گیرنده"
                    value={formData.nationalCode}
                    onChange={(e) => setFormData({ ...formData, nationalCode: e.target.value })}
                  />
                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/60 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                    کد ملی گیرنده
                  </span>
                </label>
              </div>
              <div className="col-span-2">
                <label className="relative block rounded-lg border shadow-base">
                  <textarea
                    id="address"
                    rows={3}
                    className="main-scroll peer w-full rounded-lg border-none bg-transparent px-4 py-3 placeholder-transparent focus:outline-hidden focus:ring-0"
                    placeholder="نشانی گیرنده"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  ></textarea>
                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/60 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                    نشانی گیرنده
                  </span>
                </label>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="relative block rounded-lg border shadow-base">
                  <input
                    type="text"
                    id="city"
                    className="peer w-full rounded-lg border-none bg-transparent px-4 py-3 placeholder-transparent focus:outline-hidden focus:ring-0"
                    placeholder="شهر"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/60 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                    شهر
                  </span>
                </label>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="relative block rounded-lg border shadow-base">
                  <input
                    type="text"
                    id="province"
                    className="peer w-full rounded-lg border-none bg-transparent px-4 py-3 placeholder-transparent focus:outline-hidden focus:ring-0"
                    placeholder="استان"
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  />
                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/60 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                    استان
                  </span>
                </label>
              </div>
              <div className="col-span-2 flex w-full items-center gap-x-4 gap-y-5 sm:col-span-1 sm:gap-6">
                <label className="relative block w-full rounded-lg border shadow-base">
                  <input
                    type="text"
                    id="buildingNumber"
                    className="peer w-full rounded-lg border-none bg-transparent px-4 py-3 placeholder-transparent focus:outline-hidden focus:ring-0"
                    placeholder="پلاک"
                    value={formData.buildingNumber}
                    onChange={(e) => setFormData({ ...formData, buildingNumber: e.target.value })}
                  />
                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/60 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                    پلاک
                  </span>
                </label>
                <label className="relative block w-full rounded-lg border shadow-base">
                  <input
                    type="text"
                    id="buildingUnit"
                    className="peer w-full rounded-lg border-none bg-transparent px-4 py-3 placeholder-transparent focus:outline-hidden focus:ring-0"
                    placeholder="واحد"
                    value={formData.buildingUnit}
                    onChange={(e) => setFormData({ ...formData, buildingUnit: e.target.value })}
                  />
                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/60 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                    واحد
                  </span>
                </label>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="relative block rounded-lg border shadow-base">
                  <input
                    type="text"
                    id="postalCode"
                    className="peer w-full rounded-lg border-none bg-transparent px-4 py-3 placeholder-transparent focus:outline-hidden focus:ring-0"
                    placeholder="کد پستی"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  />
                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/60 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                    کد پستی
                  </span>
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={handleSubmit} className="btn-primary w-full px-4 py-2 md:w-auto">
                <FaEdit className="h-5 w-5" />
                <span>ویرایش آدرس</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressEditModal;
