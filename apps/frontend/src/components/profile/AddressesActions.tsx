"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import DashboardHeader from "./DashboardHeader";
import AddressItem from "./AddressItem";
import AddressAddModal from "./AddressAddModal";
import AddressEditModal from "./AddressEditModal";
import AddressDeleteModal from "./AddressDeleteModal";

interface Address {
  id: string;
  fullAddress: string;
  receiverName: string;
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

interface AddressesActionsProps {
  addresses: Address[];
}

const AddressesActions: React.FC<AddressesActionsProps> = ({ addresses: initialAddresses }) => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const handleAddAddress = (newAddress: {
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
  }) => {
    const id = `a${addresses.length + 1}`; // در عمل از uuid یا API استفاده کن
    setAddresses([
      ...addresses,
      {
        id,
        fullAddress: `${newAddress.province}، ${newAddress.city}، ${newAddress.address}`,
        receiverName: `${newAddress.name} ${newAddress.family}`,
        ...newAddress,
      },
    ]);
    // می‌تونی اینجا API کال بزنی برای افزودن آدرس
  };

  const handleEditAddress = (
    id: string,
    address: {
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
  ) => {
    setAddresses(
      addresses.map((addr) =>
        addr.id === id
          ? {
              ...addr,
              ...address,
              fullAddress: `${address.province}، ${address.city}، ${address.address}`,
              receiverName: `${address.name} ${address.family}`,
            }
          : addr
      )
    );
  };

  const handleDeleteAddress = () => {
    if (selectedAddressId) {
      setAddresses(addresses.filter((addr) => addr.id !== selectedAddressId));
      // می‌تونی اینجا API کال بزنی برای حذف آدرس
      setSelectedAddressId(null);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <div className="mb-16 flex flex-col items-center justify-between gap-y-8 xs:flex-row">
        <DashboardHeader title="آدرس های شما" />
        <button onClick={() => setIsAddModalOpen(true)} className="btn-primary w-full px-4 py-2 xs:w-fit">
          <FaPlus className="h-6 w-6" />
          ثبت آدرس جدید
        </button>
      </div>
      <div className="space-y-4 divide-y">
        {addresses.map((address) => (
          <AddressItem
            key={address.id}
            address={address}
            onEdit={(id) => {
              setSelectedAddressId(id);
              setIsEditModalOpen(true);
            }}
            onDelete={(id) => {
              setSelectedAddressId(id);
              setIsDeleteModalOpen(true);
            }}
          />
        ))}
      </div>
      <button onClick={() => setIsAddModalOpen(true)} className="w-full mt-6">
        <div className="not-prose relative flex rounded-md border bg-muted transition-all duration-150 hover:bg-background dark:hover:bg-zinc-800">
          <div className="relative flex h-25 w-full select-none items-center justify-center overflow-hidden rounded-sm opacity-75">
            <svg className="absolute inset-0 h-full w-full stroke-zinc-900/10 dark:stroke-white/10" fill="none">
              <defs>
                <pattern id="pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
                </pattern>
              </defs>
              <rect stroke="none" fill="url(#pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e)" width="100%" height="100%" />
            </svg>
            <FaPlus className="h-8 w-8 text-primary" />
          </div>
        </div>
      </button>
      <AddressAddModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddAddress} />
      <AddressEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleEditAddress}
        address={addresses.find((addr) => addr.id === selectedAddressId) || addresses[0]}
      />
      <AddressDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onDelete={handleDeleteAddress} />
    </>
  );
};

export default AddressesActions;
