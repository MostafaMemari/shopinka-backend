'use client';

import AddressSection from '@/components/checkout/AddressSection';
import AddressesActions from '@/components/profile/Address/AddressesActions';
import CreateAddress from '@/components/profile/Address/CreateAddress';
import DashboardHeader from '@/components/profile/DashboardHeader';
import { MdOutlineAddLocationAlt, MdOutlineEditLocation } from 'react-icons/md';

export default function Page() {
  return (
    <>
      <div className="mb-10 flex flex-col items-center justify-between gap-y-8 xs:flex-row">
        <DashboardHeader title="آدرس تحویل سفارش" />
        <CreateAddress />
      </div>
      <AddressesActions />
    </>
  );
}
