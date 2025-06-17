import AddressFormDialog from '@/components/checkout/AddressFormDialog';
import AddressFormDrawer from '@/components/checkout/AddressFormDrawer';
import AddressesActions from '@/components/profile/Address/AddressesActions';
import DashboardHeader from '@/components/profile/DashboardHeader';

export default function Page() {
  return (
    <>
      <div className="mb-10 flex flex-col items-center justify-between gap-y-8 xs:flex-row">
        <DashboardHeader title="آدرس تحویل سفارش" />
        <div className="hidden md:block">
          <AddressFormDialog />
        </div>
        <div className="md:hidden">
          <AddressFormDrawer />
        </div>
      </div>
      <AddressesActions />
    </>
  );
}
